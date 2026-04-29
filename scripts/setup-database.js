import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('[/] Starting database setup...')

  // Step 1: Push Prisma schema to Neon database
  console.log('[/] Pushing Prisma schema to database...')
  try {
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
    console.log('[/] ✓ Schema pushed successfully')
  } catch (error) {
    console.error('[/] ✗ Failed to push schema:', error.message)
    throw error
  }

  // Step 2: Import and run seed data
  console.log('[/] Importing seed data...')
  try {
    const { default: seedDatabase } = await import('../prisma/seed-complete.ts')
    await seedDatabase()
    console.log('[/] ✓ Database seeded successfully')
  } catch (error) {
    console.error('[/] ✗ Failed to seed database:', error.message)
    throw error
  }

  console.log('[/] ✓ Database setup complete!')
}

main()
  .catch((error) => {
    console.error('[/] Database setup failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
