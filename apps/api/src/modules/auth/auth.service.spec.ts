import { BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PasswordHashService } from '../../common/security/password-hash.service';
import { AuthService } from './auth.service';

const UserStatus = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON_HOLD',
  SUSPENDED: 'SUSPENDED',
} as const;

const ResetRequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let passwordHashService: PasswordHashService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    passwordResetRequest: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    passwordHistory: {
      create: jest.fn(),
    },
    authActivityLog: {
      create: jest.fn(),
    },
    outboxEvent: {
      create: jest.fn(),
    },
    $transaction: jest.fn((cb) => cb(mockPrisma)),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock_jwt_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PasswordHashService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    passwordHashService = module.get<PasswordHashService>(PasswordHashService);

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw ForbiddenException if user is ON_HOLD', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'usr_1',
        identifier: 'L&L_1001',
        status: UserStatus.ON_HOLD,
      });

      await expect(service.login({ identifier: 'L&L_1001', password: 'Password123!' })).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw UnauthorizedException on invalid password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'usr_1',
        identifier: 'L&L_1001',
        status: UserStatus.ACTIVE,
        passwordHash: '$argon2id$v=19$m=65536,t=3,p=4$dummy',
        failedLoginAttempts: 0,
        lockedUntil: null,
      });

      jest.spyOn(passwordHashService, 'verifyPassword').mockResolvedValue(false);

      await expect(service.login({ identifier: 'L&L_1001', password: 'WrongPassword' })).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return tempToken if mustChangePassword is true', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'usr_1',
        identifier: 'L&L_1001',
        status: UserStatus.ACTIVE,
        passwordHash: 'hashed_pass',
        mustChangePassword: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
      });

      jest.spyOn(passwordHashService, 'verifyPassword').mockResolvedValue(true);

      const result = await service.login({ identifier: 'L&L_1001', password: 'TempPassword123!' });

      expect(result.mustChangePassword).toBe(true);
      expect(result.tempToken).toBe('mock_jwt_token');
    });
  });

  describe('requestReset', () => {
    it('should set User status to ON_HOLD and create reset request', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'usr_1',
        identifier: 'L&L_1001',
        status: UserStatus.ACTIVE,
      });

      mockPrisma.passwordResetRequest.create.mockResolvedValue({ id: 'req_123' });

      const result = await service.requestReset({
        identifier: 'L&L_1001',
        reason: 'Forgot password after vacation',
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'usr_1' },
        data: { status: UserStatus.ON_HOLD },
      });
      expect(result.requestId).toBe('req_123');
    });
  });

  describe('changePassword', () => {
    it('should throw BadRequestException if new password matches password history', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'usr_1',
        identifier: 'L&L_1001',
        passwordHash: 'current_hash',
        passwordHistories: [{ passwordHash: 'old_hash_1' }],
      });

      jest
        .spyOn(passwordHashService, 'verifyPassword')
        .mockImplementation(async (hash, plain) => {
          if (hash === 'current_hash' && plain === 'CurrentPass') return true;
          if (hash === 'old_hash_1' && plain === 'ReusedPass') return true;
          return false;
        });

      await expect(
        service.changePassword('usr_1', {
          currentPassword: 'CurrentPass',
          newPassword: 'ReusedPass',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
