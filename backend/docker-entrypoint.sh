#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
node wait-for-db.js

echo "🔄 Running database migrations..."
npm run prisma:migrate:deploy

echo "🌱 Seeding database (optional, can be skipped)..."
if [ -f "node_modules/.bin/tsx" ] || [ -f "../node_modules/.bin/tsx" ]; then
  npm run prisma:seed 2>/dev/null || echo "⚠️  Seeding skipped (database may already be seeded)"
else
  echo "⚠️  Seeding skipped (tsx not available - you can run seed manually later)"
fi

echo "🚀 Starting backend server..."
exec node dist/index.js
