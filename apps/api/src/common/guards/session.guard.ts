import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';

/** The authenticated caller, taken from a session (not password-change) token. */
export interface SessionUser {
  userId: string;
  identifier: string;
  role: UserRole;
}

/**
 * Requires a valid session token and, when @Roles(...) is present, one of those roles.
 * Guards run before validation pipes, so unauthorised callers get 401/403, never field errors.
 */
@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers?.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication required');
    }

    let payload: { sub?: string; userId?: string; identifier?: string; role?: UserRole };
    try {
      payload = await this.jwtService.verifyAsync(authHeader.substring(7));
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    // Password-change tokens carry no role and never grant access.
    const userId = payload.sub ?? payload.userId;
    if (!payload.role || !userId) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowedRoles?.length && !allowedRoles.includes(payload.role)) {
      throw new ForbiddenException('You do not have access to this action');
    }

    request.user = { userId, identifier: payload.identifier ?? '', role: payload.role } satisfies SessionUser;
    return true;
  }
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SessionUser => context.switchToHttp().getRequest().user,
);
