// Trigger Prisma client regeneration
const { execSync } = require('child_process');

console.log('Regenerating Prisma client...');
execSync('npx prisma generate', { stdio: 'inherit' });
console.log('Prisma client regenerated successfully!');
