import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PasswordHashService } from '../../common/security/password-hash.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UploadDocumentsDto } from './dto/upload-documents.dto';
import { CreateChangeRequestDto } from './dto/create-change-request.dto';
import { ActionChangeRequestDto, ChangeRequestAction } from './dto/action-change-request.dto';
import { DirectEditDto } from './dto/direct-edit.dto';
import {
  UserStatus,
  UserRole,
  ChangeRequestStatus,
  ChangeSource,
  AuditActionType,
  Prisma,
} from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  /**
   * Helper: Generate unique LL-XXXXX Employee ID
   */
  private async generateUniqueEmployeeCode(): Promise<string> {
    let isUnique = false;
    let code = '';
    while (!isUnique) {
      const randomSegment = crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 5);
      code = `LL-${randomSegment}`;
      const existing = await this.prisma.employee.findUnique({
        where: { employeeId: code },
      });
      if (!existing) {
        isUnique = true;
      }
    }
    return code;
  }

  /**
   * Model 1: HR Direct Entry Onboarding (POST /api/v1/employees)
   */
  async createEmployee(dto: CreateEmployeeDto, adminUserId: string) {
    // 1. Generate unique employee code (e.g. LL-7K2Q9)
    const employeeId = await this.generateUniqueEmployeeCode();

    // 2. Hash initial password
    const passwordHash = await this.passwordHashService.hashPassword(dto.initialPassword);

    // 3. Create User & Employee in atomic transaction
    const employee = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          identifier: employeeId, // LL-XXXXX
          passwordHash,
          role: UserRole.EMPLOYEE,
          status: UserStatus.ACTIVE,
          mustChangePassword: true,
        },
      });

      const emp = await tx.employee.create({
        data: {
          userId: user.id,
          employeeId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          onboardingCompletedAt: new Date(),
          personalDetail: {
            create: {
              dateOfBirth: new Date(dto.dateOfBirth),
              gender: dto.gender,
              bloodGroup: dto.bloodGroup,
              maritalStatus: dto.maritalStatus,
              fatherName: dto.fatherName,
            },
          },
          communicationDetail: {
            create: {
              personalPhone: dto.personalPhone,
              secondaryPhone: dto.secondaryPhone || null,
              officialPhone: dto.officialPhone,
              personalEmail: dto.personalEmail,
              officialEmail: dto.officialEmail,
              currentAddress: dto.currentAddress,
              permanentAddress: dto.permanentAddress,
            },
          },
          emergencyContacts: {
            createMany: {
              data: dto.emergencyContacts.map((c) => ({
                name: c.name,
                relationship: c.relationship,
                phone: c.phone,
                isPrimary: c.isPrimary ?? false,
              })),
            },
          },
          documentDetail: {
            create: {
              aadhaarNumber: dto.aadhaarNumber,
              aadhaarFrontUrl: dto.aadhaarFrontUrl || null,
              aadhaarBackUrl: dto.aadhaarBackUrl || null,
              drivingLicenceNumber: dto.drivingLicenceNumber,
              drivingLicenceFrontUrl: dto.drivingLicenceFrontUrl || null,
              drivingLicenceBackUrl: dto.drivingLicenceBackUrl || null,
              highestQualification: dto.highestQualification,
              previousOrgDocStatus: dto.previousOrgDocStatus || null,
              employeeBackground: dto.employeeBackground || null,
              recordOfIncomeUrl: dto.recordOfIncomeUrl || null,
            },
          },
          employmentDetail: {
            create: {
              vertical: dto.vertical,
              role: dto.role,
              jobType: dto.jobType,
              joiningDate: new Date(dto.joiningDate),
              reportingAuthorityId: dto.reportingAuthorityId,
            },
          },
          probationDetail: {
            create: {
              probationPeriod: dto.probationPeriod,
              financialAgreement: dto.financialAgreement,
            },
          },
          financialDetail: {
            create: {
              accountNumber: dto.accountNumber,
              accountHolderName: dto.accountHolderName,
              ifscCode: dto.ifscCode,
              branchName: dto.branchName,
              takeHomePayTotal: new Prisma.Decimal(dto.takeHomePayTotal),
              cashComponent: dto.cashComponent ? new Prisma.Decimal(dto.cashComponent) : null,
              bankComponent: dto.bankComponent ? new Prisma.Decimal(dto.bankComponent) : null,
              nextAppraisalWindow: new Date(dto.nextAppraisalWindow),
            },
          },
        },
        include: {
          personalDetail: true,
          communicationDetail: true,
          emergencyContacts: true,
          documentDetail: true,
          employmentDetail: true,
          probationDetail: true,
          financialDetail: true,
        },
      });

      // Audit entry
      const adminEmployee = await tx.employee.findUnique({ where: { userId: adminUserId } });
      if (adminEmployee) {
        await tx.employeeAuditLog.create({
          data: {
            actionType: AuditActionType.APPROVED,
            performedById: adminEmployee.id,
            employeeId: emp.id,
            reason: 'Model 1 HR Direct Entry Onboarding Completed',
          },
        });
      }

      return emp;
    });

    return employee;
  }

  /**
   * Upload Educational Documents (POST /api/v1/employees/:id/documents)
   */
  async uploadEducationalDocuments(employeeId: string, dto: UploadDocumentsDto) {
    const employee = await this.prisma.employee.findFirst({
      where: { OR: [{ id: employeeId }, { employeeId }] },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    await this.prisma.educationalDocument.createMany({
      data: dto.educationalDocuments.map((doc) => ({
        employeeId: employee.id,
        qualificationLevel: doc.qualificationLevel,
        frontImageUrl: doc.frontImageUrl,
        backImageUrl: doc.backImageUrl,
      })),
    });

    return this.prisma.educationalDocument.findMany({ where: { employeeId: employee.id } });
  }

  /**
   * Get Logged-In User Profile (GET /api/v1/employees/me)
   */
  async getEmployeeByUserId(userId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { userId },
      include: {
        personalDetail: true,
        communicationDetail: true,
        emergencyContacts: true,
        documentDetail: true,
        educationalDocuments: true,
        employmentDetail: true,
        probationDetail: true,
        financialDetail: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee profile not found');
    }

    return employee;
  }

  /**
   * Get Single Employee Profile with Role-Based Masking (GET /api/v1/employees/:id)
   */
  async getEmployeeById(id: string, viewerRole: UserRole) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        OR: [
          { id },
          { employeeId: id },
        ],
      },
      include: {
        personalDetail: true,
        communicationDetail: true,
        emergencyContacts: true,
        documentDetail: true,
        educationalDocuments: true,
        employmentDetail: true,
        probationDetail: true,
        financialDetail: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Role View Logic: HR_ADMIN and SUPER_ADMIN see full profile
    if (viewerRole === UserRole.HR_ADMIN || viewerRole === UserRole.SUPER_ADMIN || viewerRole === UserRole.ADMIN) {
      return employee;
    }

    // Standard Executive / Vertical Head View: Omit Financial Details & Mask ID Numbers
    const { financialDetail, ...basicProfile } = employee;
    if (basicProfile.documentDetail) {
      basicProfile.documentDetail.aadhaarNumber = 'XXXX-XXXX-' + basicProfile.documentDetail.aadhaarNumber.slice(-4);
      basicProfile.documentDetail.drivingLicenceNumber = 'XXXX-XXXX';
    }

    return basicProfile;
  }

  /**
   * List Active Employees (GET /api/v1/employees)
   */
  async listEmployees(vertical?: string) {
    const where: Prisma.EmployeeWhereInput = {};
    if (vertical) {
      where.employmentDetail = { vertical };
    }

    return this.prisma.employee.findMany({
      where,
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        employmentStatus: true,
        communicationDetail: {
          select: {
            officialEmail: true,
            officialPhone: true,
          },
        },
        employmentDetail: {
          select: {
            vertical: true,
            role: true,
            jobType: true,
            joiningDate: true,
          },
        },
      },
    });
  }

  /**
   * Create Profile Change Request (POST /api/v1/employees/change-requests)
   */
  async createChangeRequest(userId: string, dto: CreateChangeRequestDto) {
    const employee = await this.prisma.employee.findUnique({ where: { userId } });
    if (!employee) {
      throw new NotFoundException('Employee record not found');
    }

    // 24-hour SLA deadline
    const reviewDueDate = new Date();
    reviewDueDate.setHours(reviewDueDate.getHours() + 24);

    const changeRequest = await this.prisma.employeeChangeRequest.create({
      data: {
        employeeId: employee.id,
        reviewDueDate,
        requestedFields: {
          createMany: {
            data: dto.fields.map((f) => ({
              fieldName: f.fieldName,
              currentValue: '', // Populated during lookup
              proposedValue: f.proposedValue,
              proofDocumentUrl: f.proofDocumentUrl,
            })),
          },
        },
      },
      include: {
        requestedFields: true,
      },
    });

    return changeRequest;
  }

  /**
   * Action Change Request (POST /api/v1/employees/change-requests/:id/action)
   */
  async actionChangeRequest(requestId: string, dto: ActionChangeRequestDto, hrUserId: string) {
    const request = await this.prisma.employeeChangeRequest.findUnique({
      where: { id: requestId },
      include: { requestedFields: true, employee: true },
    });

    if (!request) {
      throw new NotFoundException(`Change request ${requestId} not found`);
    }

    const hrEmployee = await this.prisma.employee.findUnique({ where: { userId: hrUserId } });

    if (dto.action === ChangeRequestAction.REJECT) {
      return this.prisma.employeeChangeRequest.update({
        where: { id: requestId },
        data: {
          status: ChangeRequestStatus.REJECTED,
          rejectionReason: dto.reason,
          hrReviewerId: hrEmployee?.id,
        },
      });
    }

    if (dto.action === ChangeRequestAction.QUERY) {
      return this.prisma.employeeChangeRequest.update({
        where: { id: requestId },
        data: {
          status: ChangeRequestStatus.QUERY_SENT,
          queryReason: dto.reason,
          hrReviewerId: hrEmployee?.id,
        },
      });
    }

    // APPROVE Action: Write proposed values & log version history
    await this.prisma.$transaction(async (tx) => {
      for (const field of request.requestedFields) {
        // Record field version history
        await tx.employeeFieldHistory.create({
          data: {
            employeeId: request.employeeId,
            fieldName: field.fieldName,
            oldValue: field.currentValue,
            newValue: field.proposedValue,
            changedById: hrEmployee?.id || 'SYSTEM',
            changeSource: ChangeSource.APPROVED_CHANGE_REQUEST,
          },
        });
      }

      await tx.employeeChangeRequest.update({
        where: { id: requestId },
        data: {
          status: ChangeRequestStatus.APPROVED,
          hrReviewerId: hrEmployee?.id,
        },
      });
    });

    return this.prisma.employeeChangeRequest.findUnique({
      where: { id: requestId },
      include: { requestedFields: true },
    });
  }

  /**
   * HR Direct Edit (PUT /api/v1/employees/:id/direct-edit)
   */
  async directEdit(employeeId: string, dto: DirectEditDto, hrUserId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { OR: [{ id: employeeId }, { employeeId }] },
    });
    if (!employee) {
      throw new NotFoundException(`Employee ${employeeId} not found`);
    }

    const hrEmployee = await this.prisma.employee.findUnique({ where: { userId: hrUserId } });

    await this.prisma.$transaction(async (tx) => {
      for (const [key, value] of Object.entries(dto.fieldUpdates)) {
        await tx.employeeFieldHistory.create({
          data: {
            employeeId: employee.id,
            fieldName: key,
            newValue: String(value),
            changedById: hrEmployee?.id || 'SYSTEM',
            changeSource: ChangeSource.DIRECT_HR_EDIT,
          },
        });
      }

      if (hrEmployee) {
        await tx.employeeAuditLog.create({
          data: {
            actionType: AuditActionType.DIRECT_EDIT,
            performedById: hrEmployee.id,
            employeeId: employee.id,
            reason: dto.reason,
          },
        });
      }
    });

    return { success: true, message: 'Direct edit applied successfully' };
  }

  /**
   * Pending Onboarding Document Queue & 29-Day SLA Tracker (GET /api/v1/employees/onboarding/pending-documents)
   */
  async getPendingOnboardingDocuments() {
    const employees = await this.prisma.employee.findMany({
      where: {
        OR: [
          { documentDetail: { isIncompleteFlag: true } },
          { documentDetail: { secondDocDueDate: { not: null } } },
        ],
      },
      include: {
        documentDetail: true,
        employmentDetail: true,
        communicationDetail: true,
      },
    });

    const now = new Date();

    return employees.map((emp) => {
      const joiningDate = emp.employmentDetail?.joiningDate || emp.createdAt;
      const daysSinceJoining = Math.floor((now.getTime() - new Date(joiningDate).getTime()) / (1000 * 60 * 60 * 24));
      const dueDate = emp.documentDetail?.secondDocDueDate;
      const daysRemaining = dueDate
        ? Math.ceil((new Date(dueDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      return {
        employeeId: emp.id,
        employeeCode: emp.employeeId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        officialEmail: emp.communicationDetail?.officialEmail,
        officialPhone: emp.communicationDetail?.officialPhone,
        joiningDate,
        daysSinceJoining,
        secondDocDueDate: dueDate,
        daysRemaining,
        isOverdue: daysRemaining !== null && daysRemaining < 0,
        trigger29DayNotice: daysSinceJoining >= 29 && emp.documentDetail?.isIncompleteFlag,
        documentDetailStatus: emp.documentDetail?.previousOrgDocStatus,
      };
    });
  }

  /**
   * Submit Missing Secondary Document (POST /api/v1/employees/:id/second-document)
   */
  async submitSecondDocument(employeeId: string, dto: any, hrUserId: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { OR: [{ id: employeeId }, { employeeId }] },
      include: { documentDetail: true },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const hrEmployee = await this.prisma.employee.findUnique({ where: { userId: hrUserId } });

    await this.prisma.$transaction(async (tx) => {
      await tx.employeeDocument.update({
        where: { employeeId: employee.id },
        data: {
          previousOrgDocStatus: dto.previousOrgDocStatus,
          recordOfIncomeUrl: dto.recordOfIncomeUrl || employee.documentDetail?.recordOfIncomeUrl,
          isIncompleteFlag: false,
          secondDocDueDate: null,
        },
      });

      if (hrEmployee) {
        await tx.employeeAuditLog.create({
          data: {
            actionType: AuditActionType.APPROVED,
            performedById: hrEmployee.id,
            employeeId: employee.id,
            reason: 'Secondary organisation onboarding document requirement fulfilled',
          },
        });
      }
    });

    return this.prisma.employeeDocument.findUnique({ where: { employeeId: employee.id } });
  }
}
