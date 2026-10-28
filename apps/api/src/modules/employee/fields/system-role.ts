import { EmployeeRole, UserRole } from '@prisma/client';
import { HR_VERTICAL } from '@landsandlands/shared';

/** Map the BRD employment role/vertical onto the system access role. */
export function systemRoleFor(vertical: string, role: EmployeeRole): UserRole {
  if (vertical === HR_VERTICAL) return UserRole.HR_ADMIN;
  if (role === EmployeeRole.MANAGING_DIRECTOR || role === EmployeeRole.COO) return UserRole.ADMIN;
  if (role === EmployeeRole.VERTICAL_HEAD) return UserRole.VERTICAL_HEAD;
  return UserRole.EMPLOYEE;
}
