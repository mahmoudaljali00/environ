const { execSync } = require('child_process');

console.log('🔧 Setting up Prisma...\n');

try {
  // Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully!\n');

  // Push schema to database
  console.log('🗄️  Pushing schema to Neon database...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit' });
  console.log('✅ Schema pushed to database successfully!\n');

  console.log('🎉 Prisma setup complete!');
} catch (error) {
  console.error('❌ Error setting up Prisma:', error.message);
  process.exit(1);
}
