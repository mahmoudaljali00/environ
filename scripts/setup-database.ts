import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function setupDatabase() {
  console.log('🚀 Setting up Neon database...')

  try {
    // Generate Prisma Client
    console.log('📦 Generating Prisma Client...')
    await execAsync('npx prisma generate')
    console.log('✅ Prisma Client generated')

    // Push schema to database
    console.log('🔄 Pushing schema to Neon database...')
    await execAsync('npx prisma db push --skip-generate')
    console.log('✅ Database schema created')

    // Run seed script
    console.log('🌱 Seeding database with data from lib folder...')
    await execAsync('npx tsx prisma/seed-complete.ts')
    console.log('✅ Database seeded successfully')

    console.log('\n✨ Database setup complete! All data migrated to Neon PostgreSQL')
  } catch (error: any) {
    console.error('❌ Error setting up database:', error.message)
    process.exit(1)
  }
}

setupDatabase()
