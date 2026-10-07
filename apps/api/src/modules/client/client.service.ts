import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { QueryClientsDto } from './dto/query-clients.dto';
import { UserRole, ClientType, ClientStatus } from '@landsandlands/shared';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper: Generate unique CL-XXXXX code
   */
  private async generateUniqueClientCode(): Promise<string> {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let isUnique = false;
    let code = '';

    while (!isUnique) {
      let randStr = '';
      for (let i = 0; i < 5; i++) {
        randStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      code = `CL-${randStr}`;
      const existing = await this.prisma.client.findUnique({
        where: { clientCode: code },
      });
      if (!existing) isUnique = true;
    }

    return code;
  }

  /**
   * Masking Helper for PII
   */
  private maskPhone(phone?: string | null): string | null {
    if (!phone || phone.length < 4) return phone || null;
    return `${phone.substring(0, 3)}******${phone.slice(-3)}`;
  }

  private maskTaxId(idStr?: string | null): string | null {
    if (!idStr || idStr.length < 4) return idStr || null;
    return `XXXXX${idStr.slice(-4)}`;
  }

  /**
   * 1. Create Client
   */
  async createClient(dto: CreateClientDto, userId: string) {
    // Determine acquiredById (Originator Employee ID)
    let acquiredById = dto.acquiredById;

    if (!acquiredById) {
      const userEmployee = await this.prisma.employee.findUnique({
        where: { userId },
      });
      if (userEmployee) {
        acquiredById = userEmployee.id;
      } else {
        // Fallback: If superadmin user without employee record creates client, use first employee or require acquiredById
        const firstEmp = await this.prisma.employee.findFirst();
        if (!firstEmp) {
          throw new BadRequestException('No employee record found to assign client originator.');
        }
        acquiredById = firstEmp.id;
      }
    }

    const clientCode = await this.generateUniqueClientCode();

    const client = await this.prisma.$transaction(async (tx) => {
      const created = await tx.client.create({
        data: {
          clientCode,
          clientType: dto.clientType,
          status: dto.status || ClientStatus.ACTIVE,
          acquiredById,
          primaryRMId: dto.primaryRMId || acquiredById,
          profile: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              companyName: dto.companyName,
              panNumber: dto.panNumber,
              aadhaarNumber: dto.aadhaarNumber,
              gstNumber: dto.gstNumber,
            },
          },
          contact: {
            create: {
              primaryPhone: dto.primaryPhone,
              secondaryPhone: dto.secondaryPhone,
              email: dto.email,
              currentAddress: dto.currentAddress,
              permanentAddress: dto.permanentAddress,
            },
          },
        },
        include: {
          profile: true,
          contact: true,
          acquiredBy: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
          primaryRM: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      return created;
    });

    return client;
  }

  /**
   * 2. List Clients (with Pagination & Role-based Masking)
   */
  async getClients(query: QueryClientsDto, user: { userId: string; role: string }) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const userEmployee = await this.prisma.employee.findUnique({
      where: { userId: user.userId },
    });
    const requesterEmployeeId = userEmployee?.id;

    const where: any = {};
    if (query.clientType) where.clientType = query.clientType;
    if (query.status) where.status = query.status;
    if (query.acquiredById) where.acquiredById = query.acquiredById;
    if (query.primaryRMId) where.primaryRMId = query.primaryRMId;

    if (query.search) {
      where.OR = [
        { clientCode: { contains: query.search, mode: 'insensitive' } },
        { profile: { firstName: { contains: query.search, mode: 'insensitive' } } },
        { profile: { lastName: { contains: query.search, mode: 'insensitive' } } },
        { profile: { companyName: { contains: query.search, mode: 'insensitive' } } },
        { contact: { primaryPhone: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    const [total, clients] = await Promise.all([
      this.prisma.client.count({ where }),
      this.prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          profile: true,
          contact: true,
          acquiredBy: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
          primaryRM: {
            select: {
              id: true,
              employeeId: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
    ]);

    const isFullAccessRole =
      user.role === UserRole.SUPER_ADMIN ||
      user.role === UserRole.ADMIN ||
      user.role === UserRole.HR_ADMIN;

    const formattedData = clients.map((c) => {
      const isOwnerOrRM =
        requesterEmployeeId &&
        (c.acquiredById === requesterEmployeeId || c.primaryRMId === requesterEmployeeId);

      const canViewFullDetails = isFullAccessRole || isOwnerOrRM;

      return {
        id: c.id,
        clientCode: c.clientCode,
        clientType: c.clientType,
        status: c.status,
        name:
          c.clientType === ClientType.INDIVIDUAL
            ? `${c.profile?.firstName || ''} ${c.profile?.lastName || ''}`.trim()
            : c.profile?.companyName,
        acquiredBy: c.acquiredBy,
        primaryRM: c.primaryRM,
        contact: {
          primaryPhone: canViewFullDetails
            ? c.contact?.primaryPhone
            : this.maskPhone(c.contact?.primaryPhone),
          email: canViewFullDetails ? c.contact?.email : c.contact?.email ? '***@***.com' : null,
        },
        profile: {
          panNumber: canViewFullDetails
            ? c.profile?.panNumber
            : this.maskTaxId(c.profile?.panNumber),
          aadhaarNumber: canViewFullDetails
            ? c.profile?.aadhaarNumber
            : this.maskTaxId(c.profile?.aadhaarNumber),
          gstNumber: c.profile?.gstNumber,
        },
        createdAt: c.createdAt,
      };
    });

    return {
      data: formattedData,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * 3. Get Client By ID
   */
  async getClientById(id: string, user: { userId: string; role: string }) {
    const client = await this.prisma.client.findFirst({
      where: {
        OR: [
          { id },
          { clientCode: id },
        ],
      },
      include: {
        profile: true,
        contact: true,
        acquiredBy: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
          },
        },
        primaryRM: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found.`);
    }

    const userEmployee = await this.prisma.employee.findUnique({
      where: { userId: user.userId },
    });
    const requesterEmployeeId = userEmployee?.id;

    const isFullAccessRole =
      user.role === UserRole.SUPER_ADMIN ||
      user.role === UserRole.ADMIN ||
      user.role === UserRole.HR_ADMIN;

    const isOwnerOrRM =
      requesterEmployeeId &&
      (client.acquiredById === requesterEmployeeId || client.primaryRMId === requesterEmployeeId);

    const canViewFullDetails = isFullAccessRole || isOwnerOrRM;

    if (!canViewFullDetails) {
      if (client.contact) {
        client.contact.primaryPhone = this.maskPhone(client.contact.primaryPhone) || '';
        client.contact.secondaryPhone = this.maskPhone(client.contact.secondaryPhone);
        if (client.contact.email) client.contact.email = '***@***.com';
      }
      if (client.profile) {
        client.profile.panNumber = this.maskTaxId(client.profile.panNumber);
        client.profile.aadhaarNumber = this.maskTaxId(client.profile.aadhaarNumber);
      }
    }

    return client;
  }

  /**
   * 4. Update Client
   */
  async updateClient(id: string, dto: UpdateClientDto, user: { userId: string; role: string }) {
    await this.getClientById(id, user);

    const updated = await this.prisma.client.update({
      where: { id },
      data: {
        clientType: dto.clientType,
        status: dto.status,
        primaryRMId: dto.primaryRMId,
        profile: {
          update: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            companyName: dto.companyName,
            panNumber: dto.panNumber,
            aadhaarNumber: dto.aadhaarNumber,
            gstNumber: dto.gstNumber,
          },
        },
        contact: {
          update: {
            primaryPhone: dto.primaryPhone,
            secondaryPhone: dto.secondaryPhone,
            email: dto.email,
            currentAddress: dto.currentAddress,
            permanentAddress: dto.permanentAddress,
          },
        },
      },
      include: {
        profile: true,
        contact: true,
        acquiredBy: true,
        primaryRM: true,
      },
    });

    return updated;
  }

  /**
   * 5. Assign Primary RM
   */
  async assignPrimaryRM(id: string, primaryRMId: string) {
    const rm = await this.prisma.employee.findUnique({
      where: { id: primaryRMId },
    });
    if (!rm) {
      throw new NotFoundException(`Employee with ID ${primaryRMId} not found.`);
    }

    return this.prisma.client.update({
      where: { id },
      data: { primaryRMId },
      include: {
        primaryRM: {
          select: {
            id: true,
            employeeId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
