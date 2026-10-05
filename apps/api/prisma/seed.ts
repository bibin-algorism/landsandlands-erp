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
