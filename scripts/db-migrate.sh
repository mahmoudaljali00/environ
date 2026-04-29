#!/bin/bash
set -e

echo "🔄 Pushing Prisma schema to Neon database..."
npx prisma db push --skip-generate

echo "✅ Database schema created successfully!"
echo "📊 Running seed script..."
npx tsx prisma/seed-complete.ts

echo "✅ Database migration and seeding complete!"
