import { PrismaClient, UserRole, UserStatus, StakeholderType } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding initial system users...')

  const defaultPasswordHash = await argon2.hash('AdminPassword123!', {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  })

  const empPasswordHash = await argon2.hash('Password123!', {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  })

  // 1. Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { identifier: 'LL_00001' },
    update: {
      role: UserRole.SUPER_ADMIN,
      permissions: ['*'],
      status: UserStatus.ACTIVE,
    },
    create: {
      identifier: 'LL_00001',
      passwordHash: defaultPasswordHash,
      role: UserRole.SUPER_ADMIN,
      permissions: ['*'],
      status: UserStatus.ACTIVE,
      stakeholderType: StakeholderType.EMPLOYEE,
      mustChangePassword: false,
    },
  })
  console.log(`Super Admin provisioned: ${adminUser.identifier} (${adminUser.role})`)

  // 2. HR Admin User
  const hrAdminUser = await prisma.user.upsert({
    where: { identifier: 'LL_00002' },
    update: {
      role: UserRole.HR_ADMIN,
      permissions: ['password_resets:read', 'password_resets:write', 'users:read', 'users:write'],
      status: UserStatus.ACTIVE,
    },
    create: {
      identifier: 'LL_00002',
      passwordHash: defaultPasswordHash,
      role: UserRole.HR_ADMIN,
      permissions: ['password_resets:read', 'password_resets:write', 'users:read', 'users:write'],
      status: UserStatus.ACTIVE,
      stakeholderType: StakeholderType.EMPLOYEE,
      mustChangePassword: false,
    },
  })
  console.log(`HR Admin provisioned: ${hrAdminUser.identifier} (${hrAdminUser.role})`)

  // 3. Regular Employee User
  const employeeUser = await prisma.user.upsert({
    where: { identifier: 'LL_48213' },
    update: {
      role: UserRole.EMPLOYEE,
      permissions: [],
      status: UserStatus.ACTIVE,
    },
    create: {
      identifier: 'LL_48213',
      passwordHash: empPasswordHash,
      role: UserRole.EMPLOYEE,
      permissions: [],
      status: UserStatus.ACTIVE,
      stakeholderType: StakeholderType.EMPLOYEE,
      mustChangePassword: false,
    },
  })
  console.log(`Employee user provisioned: ${employeeUser.identifier} (${employeeUser.role})`)

  // 4. Ensure super admin employee record for client originator anchoring
  const adminEmployee = await prisma.employee.upsert({
    where: { employeeId: 'LL-00001' },
    update: {},
    create: {
      employeeId: 'LL-00001',
      userId: adminUser.id,
      firstName: 'System',
      lastName: 'Admin',
      personalDetail: {
        create: {
          dateOfBirth: new Date('1985-01-01'),
          gender: 'MALE',
          bloodGroup: 'O_POSITIVE',
          maritalStatus: 'MARRIED',
          fatherName: 'System Admin Sr',
        },
      },
      communicationDetail: {
        create: {
          personalPhone: '+919900000001',
          officialPhone: '+919900000002',
          personalEmail: 'admin.personal@landsandlands.com',
          officialEmail: 'admin@landsandlands.com',
          currentAddress: 'Bangalore HQ',
          permanentAddress: 'Bangalore HQ',
        },
      },
      employmentDetail: {
        create: {
          vertical: 'PRIMARY',
          role: 'MANAGING_DIRECTOR',
          jobType: 'PERMANENT',
          joiningDate: new Date('2020-01-01'),
        },
      },
    },
  })

  // 5. Initial Sample Client
  const sampleClient = await prisma.client.upsert({
    where: { clientCode: 'CL-10001' },
    update: {},
    create: {
      clientCode: 'CL-10001',
      clientType: 'INDIVIDUAL',
      status: 'ACTIVE',
      acquiredById: adminEmployee.id,
      primaryRMId: adminEmployee.id,
      profile: {
        create: {
          firstName: 'Rajesh',
          lastName: 'Kumar',
          panNumber: 'ABCDE1234F',
          aadhaarNumber: '123456789012',
        },
      },
      contact: {
        create: {
          primaryPhone: '+919876543210',
          email: 'rajesh.kumar@example.com',
          currentAddress: 'Indiranagar, Bangalore, Karnataka - 560038',
          permanentAddress: 'Indiranagar, Bangalore, Karnataka - 560038',
        },
      },
    },
  })
  console.log(`Sample client provisioned: ${sampleClient.clientCode} (${sampleClient.clientType})`)

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
