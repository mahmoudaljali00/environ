#!/bin/bash
# Database migration script for Neon PostgreSQL

echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate dev --name init
echo "✅ Migration complete!"
