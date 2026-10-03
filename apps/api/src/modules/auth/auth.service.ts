import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthActivityType, Prisma, ResetRequestStatus, UserStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PasswordHashService } from '../../common/security/password-hash.service';
import { AdminActionResetDto } from './dto/admin-action-reset.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHashService: PasswordHashService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { identifier: dto.identifier },
    });

    if (!user) {
      await this.logActivity(null, dto.identifier, AuthActivityType.LOGIN_FAILED, ipAddress, userAgent, {
        reason: 'User not found',
      });
      throw new UnauthorizedException('Invalid employee code or password');
    }

    // FR-AUTH-08: Check if account is ON_HOLD due to pending reset
    if (user.status === UserStatus.ON_HOLD) {
      throw new ForbiddenException(
        'Account is currently on hold due to a pending password reset request. Please contact your Password-Reset Admin.',
      );
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenException('Account has been suspended. Please contact administrator.');
    }

    // Check brute-force lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      throw new UnauthorizedException(
        `Account is locked due to multiple failed login attempts. Try again in ${minutesLeft} minute(s).`,
      );
    }

    const isPasswordValid = await this.passwordHashService.verifyPassword(
      user.passwordHash,
      dto.password,
    );

    if (!isPasswordValid) {
      const failedAttempts = user.failedLoginAttempts + 1;
      let lockedUntil: Date | null = null;

      if (failedAttempts >= 5) {
        lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: failedAttempts,
          lockedUntil,
        },
      });

      await this.logActivity(user.id, user.identifier, AuthActivityType.LOGIN_FAILED, ipAddress, userAgent, {
        failedAttempts,
        locked: !!lockedUntil,
      });

      throw new UnauthorizedException('Invalid employee code or password');
    }

    // Reset lockout counters on success
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
      },
    });

    await this.logActivity(user.id, user.identifier, AuthActivityType.LOGIN_SUCCESS, ipAddress, userAgent);

    // FR-AUTH-05: Force password change on next login if mustChangePassword is set
    if (user.mustChangePassword) {
      const tempToken = this.jwtService.sign(
        { sub: user.id, identifier: user.identifier, mustChangePassword: true },
        { expiresIn: '1h' },
      );

      return {
        mustChangePassword: true,
        tempToken,
        message: 'Password change required before accessing the ERP.',
      };
    }

    // 24h session token (FR-AUTH-03)
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        identifier: user.identifier,
        stakeholderType: user.stakeholderType,
        role: user.role,
        permissions: user.permissions,
      },
      { expiresIn: '24h' },
    );

    return {
      accessToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      user: {
        id: user.id,
        identifier: user.identifier,
        stakeholderType: user.stakeholderType,
        role: user.role,
        permissions: user.permissions,
      },
    };
  }

  // FR-AUTH-04 & FR-AUTH-08 & FR-AUTH-11: Request password reset
  async requestReset(dto: RequestResetDto, ipAddress?: string, userAgent?: string) {
    const existingPending = await this.prisma.passwordResetRequest.findFirst({
      where: {
        identifier: dto.identifier,
        status: ResetRequestStatus.PENDING,
      },
    });

    if (existingPending) {
      throw new BadRequestException(
        'A password reset request is already pending for this account. Please wait for administrative approval.'
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { identifier: dto.identifier },
    });

    let userId: string | null = null;

    if (user) {
      userId = user.id;

      const existingUserPending = await this.prisma.passwordResetRequest.findFirst({
        where: {
          userId: user.id,
          status: ResetRequestStatus.PENDING,
        },
      });

      if (existingUserPending) {
        throw new BadRequestException(
          'A password reset request is already pending for this account. Please wait for administrative approval.'
        );
      }

      // FR-AUTH-08: Put account ON_HOLD
      await this.prisma.user.update({
        where: { id: user.id },
        data: { status: UserStatus.ON_HOLD },
      });
    }

    const resetRequest = await this.prisma.passwordResetRequest.create({
      data: {
        identifier: dto.identifier,
        userId,
        reason: dto.reason,
        status: ResetRequestStatus.PENDING,
      },
    });

    await this.logActivity(userId, dto.identifier, AuthActivityType.RESET_REQUESTED, ipAddress, userAgent, {
      requestId: resetRequest.id,
      reason: dto.reason,
    });

    return {
      message:
        'Password reset request submitted successfully. Account placed on hold pending admin action.',
      requestId: resetRequest.id,
    };
  }

  // FR-AUTH-09: Reset status indicator
  async getResetStatus(identifier: string) {
    const pendingRequest = await this.prisma.passwordResetRequest.findFirst({
      where: {
        identifier,
        status: ResetRequestStatus.PENDING,
      },
    });

    return {
      identifier,
      status: pendingRequest ? 'AWAITING_RESET' : 'NONE',
    };
  }

  // FR-AUTH-10: Password-reset admin console list
  async getPendingResetRequests() {
    return this.prisma.passwordResetRequest.findMany({
      where: { status: ResetRequestStatus.PENDING },
      orderBy: { requestedAt: 'asc' },
      select: {
        id: true,
        identifier: true,
        reason: true,
        requestedAt: true,
        status: true,
        user: {
          select: {
            id: true,
            status: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
              },
            },
            employee: {
              select: {
                designation: true,
                department: true,
              },
            },
          },
        },
      },
    });
  }

  // FR-AUTH-05 & FR-AUTH-10: Admin approve or reject reset request
  async adminActionReset(adminUserId: string, dto: AdminActionResetDto) {
    const request = await this.prisma.passwordResetRequest.findUnique({
      where: { id: dto.requestId },
      include: { user: true },
    });

    if (!request) {
      throw new NotFoundException('Password reset request not found');
    }

    if (request.status !== ResetRequestStatus.PENDING) {
      throw new BadRequestException('This reset request has already been actioned');
    }

    if (dto.action === ResetRequestStatus.REJECTED) {
      await this.prisma.passwordResetRequest.update({
        where: { id: request.id },
        data: {
          status: ResetRequestStatus.REJECTED,
          actionedById: adminUserId,
          actionNote: dto.note,
          actionedAt: new Date(),
        },
      });

      if (request.user) {
        await this.prisma.user.update({
          where: { id: request.user.id },
          data: { status: UserStatus.ACTIVE },
        });
      }

      return { success: true, message: 'Reset request rejected. User account reactivated.' };
    }

    // Generate random 10-char password (FR-AUTH-05)
    const tempPassword = this.passwordHashService.generateTempPassword(10);
    const passwordHash = await this.passwordHashService.hashPassword(tempPassword);

    await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (request.userId) {
        await tx.user.update({
          where: { id: request.userId },
          data: {
            passwordHash,
            status: UserStatus.ACTIVE,
            mustChangePassword: true, // Force change on next login
            failedLoginAttempts: 0,
            lockedUntil: null,
          },
        });
      }

      await tx.passwordResetRequest.update({
        where: { id: request.id },
        data: {
          status: ResetRequestStatus.APPROVED,
          actionedById: adminUserId,
          actionNote: dto.note,
          tempPassword,
          actionedAt: new Date(),
        },
      });

      await tx.outboxEvent.create({
        data: {
          eventType: 'AUTH_RESET_APPROVED',
          aggregateType: 'USER',
          aggregateId: request.userId || request.identifier,
          payload: {
            identifier: request.identifier,
            actionedBy: adminUserId,
            timestamp: new Date().toISOString(),
          },
        },
      });
    });

    return {
      success: true,
      identifier: request.identifier,
      tempPassword,
      temporaryPassword: tempPassword,
      message:
        'Password reset approved. Provide this one-time temporary password to the user. User will be forced to change it on next login.',
    };
  }

  // Admin User Provisioning API
  async createAdminUser(adminUserId: string, dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { identifier: dto.identifier },
    });

    if (existingUser) {
      throw new ConflictException(`User with identifier '${dto.identifier}' already exists`);
    }

    const isAutoPassword = !dto.password;
    const initialPassword = dto.password || this.passwordHashService.generateTempPassword(10);
    const passwordHash = await this.passwordHashService.hashPassword(initialPassword);
    const mustChangePassword = dto.mustChangePassword ?? isAutoPassword;

    const hasProfileData = dto.firstName || dto.lastName || dto.email || dto.phone;

    const createdUser = await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const user = await tx.user.create({
        data: {
          identifier: dto.identifier,
          passwordHash,
          stakeholderType: dto.stakeholderType,
          mustChangePassword,
          profile: hasProfileData
            ? {
                create: {
                  firstName: dto.firstName,
                  lastName: dto.lastName,
                  email: dto.email,
                  phone: dto.phone,
                },
              }
            : undefined,
        },
        include: {
          profile: true,
        },
      });

      await tx.authActivityLog.create({
        data: {
          userId: user.id,
          identifier: user.identifier,
          action: AuthActivityType.USER_CREATED,
          metadata: { createdBy: adminUserId, isAutoPassword },
        },
      });

      await tx.outboxEvent.create({
        data: {
          eventType: 'AUTH_USER_CREATED',
          aggregateType: 'USER',
          aggregateId: user.id,
          payload: {
            identifier: user.identifier,
            createdBy: adminUserId,
            timestamp: new Date().toISOString(),
          },
        },
      });

      return user;
    });

    return {
      success: true,
      message: 'User created successfully',
      user: {
        id: createdUser.id,
        identifier: createdUser.identifier,
        stakeholderType: createdUser.stakeholderType,
        status: createdUser.status,
        mustChangePassword: createdUser.mustChangePassword,
        profile: createdUser.profile,
        createdAt: createdUser.createdAt,
      },
      temporaryPassword: isAutoPassword ? initialPassword : undefined,
    };
  }

  // FR-AUTH-07: Change password (with identity lookup & strict no password reuse validation)
  async changePassword(userKey: string, dto: ChangePasswordDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: userKey }, { identifier: userKey }],
      },
      include: { passwordHistories: true },
    });

    if (!user) {
      throw new NotFoundException('User account not found');
    }

    if (user.status === UserStatus.SUSPENDED) {
      throw new ForbiddenException('Account has been suspended. Please contact administrator.');
    }

    const isCurrentValid = await this.passwordHashService.verifyPassword(
      user.passwordHash,
      dto.currentPassword,
    );

    if (!isCurrentValid) {
      await this.logActivity(user.id, user.identifier, AuthActivityType.LOGIN_FAILED, ipAddress, userAgent, {
        action: 'CHANGE_PASSWORD_FAILED',
        reason: 'Invalid current/temporary password',
      });
      throw new UnauthorizedException('Current or temporary password is incorrect');
    }

    // Verify new password complexity: minimum 8 characters, at least 1 letter and 1 number
    if (
      dto.newPassword.length < 8 ||
      !/[A-Za-z]/.test(dto.newPassword) ||
      !/\d/.test(dto.newPassword)
    ) {
      throw new BadRequestException(
        'New password must be at least 8 characters long and contain at least one letter and one number',
      );
    }

    // Check if new password matches current password
    if (await this.passwordHashService.verifyPassword(user.passwordHash, dto.newPassword)) {
      throw new BadRequestException('New password cannot be the same as your current/temporary password');
    }

    // FR-AUTH-07: Check against password histories (no reuse allowed)
    for (const history of user.passwordHistories) {
      const matchesHistory = await this.passwordHashService.verifyPassword(
        history.passwordHash,
        dto.newPassword,
      );

      if (matchesHistory) {
        throw new BadRequestException(
          'Password reuse is not allowed. Please choose a password you have not used previously.',
        );
      }
    }

    const newHash = await this.passwordHashService.hashPassword(dto.newPassword);

    await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Record current password into history before replacing
      await tx.passwordHistory.create({
        data: {
          userId: user.id,
          passwordHash: user.passwordHash,
        },
      });

      // Reactivate account if ON_HOLD and clear password change flags
      await tx.user.update({
        where: { id: user.id },
        data: {
          passwordHash: newHash,
          mustChangePassword: false,
          status: UserStatus.ACTIVE,
          failedLoginAttempts: 0,
          lockedUntil: null,
          lastPasswordChangeAt: new Date(),
        },
      });

      await tx.outboxEvent.create({
        data: {
          eventType: 'AUTH_PASSWORD_CHANGED',
          aggregateType: 'USER',
          aggregateId: user.id,
          payload: {
            identifier: user.identifier,
            timestamp: new Date().toISOString(),
          },
        },
      });
    });

    await this.logActivity(user.id, user.identifier, AuthActivityType.PASSWORD_CHANGED, ipAddress, userAgent);

    return { success: true, message: 'Password changed successfully. You can now log in with your new password.' };
  }

  // Helper method for seeding / admin user creation
  async createUser(identifier: string, pass: string, mustChangePassword = false) {
    const hash = await this.passwordHashService.hashPassword(pass);
    return this.prisma.user.create({
      data: {
        identifier,
        passwordHash: hash,
        mustChangePassword,
      },
    });
  }

  private async logActivity(
    userId: string | null,
    identifier: string,
    action: AuthActivityType,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, any>,
  ) {
    await this.prisma.authActivityLog.create({
      data: {
        userId,
        identifier,
        action,
        ipAddress,
        userAgent,
        metadata,
      },
    });

    await this.prisma.outboxEvent.create({
      data: {
        eventType: `AUTH_${action}`,
        aggregateType: 'USER',
        aggregateId: userId || identifier,
        payload: {
          identifier,
          action,
          ipAddress,
          userAgent,
          metadata,
          timestamp: new Date().toISOString(),
        },
      },
    });
  }
}
