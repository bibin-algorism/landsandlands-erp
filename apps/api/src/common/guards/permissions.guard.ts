import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let user = request.user;

    if (!user) {
      const authHeader = request.headers?.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        try {
          user = await this.jwtService.verifyAsync(token);
          request.user = user;
        } catch {
          throw new UnauthorizedException('Invalid or expired token');
        }
      }
    }

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Super Admin has wildcard access to all endpoints
    if (user.role === UserRole.SUPER_ADMIN || user.permissions?.includes('*')) {
      return true;
    }

    // Role-based shortcuts (e.g. HR Admin or Admin)
    if (
      (user.role === UserRole.ADMIN || user.role === UserRole.HR_ADMIN) &&
      requiredPermissions.some((p) => p.startsWith('password_resets:') || p.startsWith('users:'))
    ) {
      return true;
    }

    // Fine-grained permission string match
    const hasPermission = requiredPermissions.some((permission) =>
      user.permissions?.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Insufficient permissions. Requires: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
