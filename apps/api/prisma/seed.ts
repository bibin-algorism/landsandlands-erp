import { PrismaClient, UserRole, UserStatus, StakeholderType } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  const currentEnv = process.env.NODE_ENV?.toLowerCase()
  const allowedEnvs = ['development', 'dev', 'local', 'test', undefined, '']

  if (currentEnv === 'production' || currentEnv === 'staging' || !allowedEnvs.includes(currentEnv)) {
    console.error(`❌ Seeding blocked! Seeding is prohibited in '${process.env.NODE_ENV}' environment. Allowed in local development only.`)
    process.exit(1)
  }

  console.log('\n🌱 Seeding database with initial environment data...\n')

  const adminPassword = 'AdminPassword123!'
  const empPassword = 'Password123!'
  const clientPassword = 'ClientPassword123!'

  const argonOptions = {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  } as const

  const defaultPasswordHash = await argon2.hash(adminPassword, argonOptions)
  const empPasswordHash = await argon2.hash(empPassword, argonOptions)
  const clientPasswordHash = await argon2.hash(clientPassword, argonOptions)

  // 1. Super Admin User & Employee Profile
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

  // 2. HR Admin User
  await prisma.user.upsert({
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

  // 3. Regular Mock Employee User & Profile
  const mockEmpUser = await prisma.user.upsert({
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

  const mockEmployee = await prisma.employee.upsert({
    where: { employeeId: 'LL-48213' },
    update: {},
    create: {
      employeeId: 'LL-48213',
      userId: mockEmpUser.id,
      firstName: 'Rahul',
      lastName: 'Sharma',
      personalDetail: {
        create: {
          dateOfBirth: new Date('1994-06-15'),
          gender: 'MALE',
          bloodGroup: 'B_POSITIVE',
          maritalStatus: 'SINGLE',
          fatherName: 'Ramesh Sharma',
        },
      },
      communicationDetail: {
        create: {
          personalPhone: '+919888877771',
          officialPhone: '+919888877772',
          personalEmail: 'rahul.sharma@example.com',
          officialEmail: 'rahul.sharma@landsandlands.com',
          currentAddress: 'Koramangala, Bangalore, Karnataka - 560034',
          permanentAddress: 'Koramangala, Bangalore, Karnataka - 560034',
        },
      },
      employmentDetail: {
        create: {
          vertical: 'SALES',
          role: 'EXECUTIVE',
          jobType: 'PERMANENT',
          joiningDate: new Date('2022-03-10'),
          reportingAuthorityId: adminEmployee.id,
        },
      },
    },
  })

  // 4. Mock Client User & Client Profile
  await prisma.user.upsert({
    where: { identifier: 'CL_10001' },
    update: {
      role: UserRole.EMPLOYEE,
      status: UserStatus.ACTIVE,
      stakeholderType: StakeholderType.CLIENT,
    },
    create: {
      identifier: 'CL_10001',
      passwordHash: clientPasswordHash,
      role: UserRole.EMPLOYEE,
      status: UserStatus.ACTIVE,
      stakeholderType: StakeholderType.CLIENT,
      mustChangePassword: false,
    },
  })

  const sampleClient = await prisma.client.upsert({
    where: { clientCode: 'CL-10001' },
    update: {},
    create: {
      clientCode: 'CL-10001',
      clientType: 'INDIVIDUAL',
      status: 'ACTIVE',
      acquiredById: mockEmployee.id,
      primaryRMId: mockEmployee.id,
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

  console.log('✅ Seeding completed successfully!\n')
  console.log('====================================================================')
  console.log('🔑 SEEDED DEMO LOGIN CREDENTIALS')
  console.log('====================================================================')
  console.log(' 1️⃣  SUPER ADMIN:')
  console.log('    • Identifier : LL_00001 (or LL-00001)')
  console.log(`    • Password   : ${adminPassword}`)
  console.log('    • Role       : SUPER_ADMIN')
  console.log('--------------------------------------------------------------------')
  console.log(' 2️⃣  MOCK EMPLOYEE:')
  console.log('    • Identifier : LL_48213 (or LL-48213)')
  console.log(`    • Password   : ${empPassword}`)
  console.log('    • Name       : Rahul Sharma (Sales Executive)')
  console.log('--------------------------------------------------------------------')
  console.log(' 3️⃣  MOCK CLIENT:')
  console.log('    • Identifier : CL_10001 (or CL-10001)')
  console.log(`    • Password   : ${clientPassword}`)
  console.log(`    • Name       : Rajesh Kumar (Code: ${sampleClient.clientCode})`)
  console.log('====================================================================\n')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
