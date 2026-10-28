import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRole, EmploymentStatus, Prisma, UserRole } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import type { SessionUser } from '../../../common/guards/session.guard';

/**
 * FULL: every field including restricted data (HR, MD, COO, the employee themself).
 * TEAM: everything except restricted data (a Vertical Head viewing their reporting line).
 */
export type AccessLevel = 'FULL' | 'TEAM';

export interface Viewer extends SessionUser {
  /** The viewer's own employee record, if they have one. */
  employeeId: string | null;
  isManagingDirector: boolean;
}

const FULL_ACCESS_ROLES: UserRole[] = [UserRole.HR_ADMIN, UserRole.ADMIN, UserRole.SUPER_ADMIN];

/** Access rules for employee data (BRQ-04, BRQ-05, BRQ-14, FR-11 to FR-13, BR-13). */
@Injectable()
export class EmployeeAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async viewer(user: SessionUser): Promise<Viewer> {
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.userId },
      select: { id: true, employmentDetail: { select: { role: true } } },
    });
    return {
      ...user,
      employeeId: employee?.id ?? null,
      isManagingDirector: employee?.employmentDetail?.role === EmployeeRole.MANAGING_DIRECTOR,
    };
  }

  /** BRQ-14: former employees are visible to HR and the MD only. */
  canSeeTerminated(viewer: Viewer): boolean {
    return (
      viewer.role === UserRole.HR_ADMIN || viewer.role === UserRole.SUPER_ADMIN || viewer.isManagingDirector
    );
  }

  /** Access to one employee, or null when the viewer may not see them at all. */
  async levelFor(
    viewer: Viewer,
    target: { id: string; employmentStatus: EmploymentStatus },
  ): Promise<AccessLevel | null> {
    if (target.id === viewer.employeeId) return 'FULL';
    if (target.employmentStatus === EmploymentStatus.TERMINATED) {
      return this.canSeeTerminated(viewer) ? 'FULL' : null;
    }
    if (FULL_ACCESS_ROLES.includes(viewer.role)) return 'FULL';
    if (viewer.role === UserRole.VERTICAL_HEAD && viewer.employeeId) {
      const team = await this.teamIds(viewer.employeeId);
      if (team.includes(target.id)) return 'TEAM';
    }
    return null;
  }

  /** Throws 404 rather than 403 so callers cannot probe which employees exist. */
  async requireLevel(
    viewer: Viewer,
    target: { id: string; employmentStatus: EmploymentStatus },
  ): Promise<AccessLevel> {
    const level = await this.levelFor(viewer, target);
    if (!level) throw new NotFoundException('Employee not found');
    return level;
  }

  /** Which employees a list may contain for this viewer. */
  async listScope(viewer: Viewer, status: EmploymentStatus): Promise<Prisma.EmployeeWhereInput> {
    if (status === EmploymentStatus.TERMINATED) {
      if (!this.canSeeTerminated(viewer)) {
        throw new ForbiddenException('Former employees are visible to HR and the MD only');
      }
      return { employmentStatus: status };
    }
    if (FULL_ACCESS_ROLES.includes(viewer.role)) return { employmentStatus: status };
    const ids = [viewer.employeeId, ...(viewer.role === UserRole.VERTICAL_HEAD && viewer.employeeId ? await this.teamIds(viewer.employeeId) : [])];
    return { employmentStatus: status, id: { in: ids.filter((id): id is string => !!id) } };
  }

  /** Everyone below a manager in the reporting line, not only direct reports (BRD §16). */
  async teamIds(managerId: string): Promise<string[]> {
    const team: string[] = [];
    let frontier = [managerId];
    while (frontier.length && team.length < 10000) {
      const reports = await this.prisma.employeeEmploymentDetail.findMany({
        where: { reportingAuthorityId: { in: frontier } },
        select: { employeeId: true },
      });
      frontier = reports.map((r) => r.employeeId).filter((id) => id !== managerId && !team.includes(id));
      team.push(...frontier);
    }
    return team;
  }
}
