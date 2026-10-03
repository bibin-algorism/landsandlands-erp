import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../../common/guards/permissions.decorator';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { AuthService } from './auth.service';
import { AdminActionResetDto } from './dto/admin-action-reset.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RequestResetDto } from './dto/request-reset.dto';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user with Employee Code & Password' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials or account locked' })
  @ApiResponse({ status: 403, description: 'Account ON_HOLD pending password reset' })
  async login(@Body() dto: LoginDto, @Req() req: any) {
    const ipAddress = req.ip || req.headers?.['x-forwarded-for'];
    const userAgent = req.headers?.['user-agent'];
    return this.authService.login(dto, ipAddress, userAgent);
  }

  @Post('request-reset')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Request password reset with mandatory reason' })
  @ApiResponse({ status: 201, description: 'Reset request queued & account placed ON_HOLD' })
  async requestReset(@Body() dto: RequestResetDto, @Req() req: any) {
    const ipAddress = req.ip || req.headers?.['x-forwarded-for'];
    const userAgent = req.headers?.['user-agent'];
    return this.authService.requestReset(dto, ipAddress, userAgent);
  }

  @Get('reset-status/:identifier')
  @ApiOperation({ summary: 'Get password reset status indicator for login screen' })
  @ApiResponse({ status: 200, description: 'Returns AWAITING_RESET or NONE' })
  async getResetStatus(@Param('identifier') identifier: string) {
    return this.authService.getResetStatus(identifier);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password with identity verification & no password reuse' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid current password or authentication token' })
  @ApiResponse({ status: 403, description: 'Identity mismatch or account restricted' })
  @ApiResponse({ status: 400, description: 'Password reuse prohibited or invalid format' })
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: any) {
    const ipAddress = req.ip || req.headers?.['x-forwarded-for'];
    const userAgent = req.headers?.['user-agent'];

    let authenticatedUserId: string | null = null;
    let authenticatedIdentifier: string | null = null;

    // Extract Bearer token if provided
    const authHeader = req.headers?.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const payload = await this.jwtService.verifyAsync(token);
        authenticatedUserId = payload.sub || payload.id;
        authenticatedIdentifier = payload.identifier;
      } catch {
        throw new UnauthorizedException('Authentication token expired or invalid');
      }
    }

    // Security check: If both token and dto.identifier exist, ensure they match
    if (
      authenticatedIdentifier &&
      dto.identifier &&
      authenticatedIdentifier !== dto.identifier
    ) {
      throw new ForbiddenException(
        'Identity mismatch: Cannot change password for another employee account',
      );
    }

    // Resolve target identity
    const targetIdentity = authenticatedUserId || authenticatedIdentifier || dto.identifier;

    if (!targetIdentity) {
      throw new UnauthorizedException(
        'Authentication required: Provide a valid Bearer token or Employee Code identifier',
      );
    }

    return this.authService.changePassword(targetIdentity, dto, ipAddress, userAgent);
  }

  @Get('admin/reset-requests')
  @UseGuards(PermissionsGuard)
  @Permissions('password_resets:read')
  @ApiOperation({ summary: 'List pending password reset requests for Password-Reset Admin' })
  async getPendingResetRequests() {
    return this.authService.getPendingResetRequests();
  }

  @Post('admin/reset-password')
  @UseGuards(PermissionsGuard)
  @Permissions('password_resets:write')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve/Reject reset request and generate temporary password' })
  @ApiResponse({ status: 200, description: 'Request actioned successfully' })
  async adminActionReset(@Body() dto: AdminActionResetDto, @Req() req: any) {
    const adminUserId = req.user?.sub || 'admin_user_id';
    return this.authService.adminActionReset(adminUserId, dto);
  }

  @Post('admin/users')
  @UseGuards(PermissionsGuard)
  @Permissions('users:write')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Provision new user account with initial credentials & profile from Admin console' })
  @ApiResponse({ status: 201, description: 'User account created successfully' })
  @ApiResponse({ status: 409, description: 'User with identifier already exists' })
  async createAdminUser(@Body() dto: CreateUserDto, @Req() req: any) {
    const adminUserId = req.user?.sub || 'admin_user_id';
    return this.authService.createAdminUser(adminUserId, dto);
  }
}
