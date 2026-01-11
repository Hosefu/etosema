# Backend Dockerfile
# Builds the API with npm workspaces support and Prisma client generation.

FROM node:20-bullseye-slim AS base
WORKDIR /app

# Install dependencies for backend (and shared if needed) without running scripts
COPY package*.json ./
COPY backend/package*.json backend/
COPY shared/package*.json shared/
RUN npm ci --ignore-scripts --workspace backend --workspace shared --install-strategy nested

# Copy source
COPY backend ./backend
COPY shared ./shared

# Generate Prisma client and build (requires dev deps, already installed)
RUN npm run prisma:generate -w backend
RUN npm run build -w backend

FROM node:20-bullseye-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install PostgreSQL client for health checks (optional, but useful)
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy built artefacts and node_modules for backend (including dev deps for tsx and Prisma CLI)
COPY --from=base /app/backend/dist ./backend/dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/backend/node_modules ./backend/node_modules
COPY --from=base /app/backend/package*.json ./backend/
COPY --from=base /app/backend/prisma ./backend/prisma
COPY --from=base /app/shared ./shared

# Copy entrypoint script and wait-for-db script
COPY backend/docker-entrypoint.sh ./backend/docker-entrypoint.sh
COPY backend/wait-for-db.js ./backend/wait-for-db.js

# Make entrypoint executable
RUN chmod +x ./backend/docker-entrypoint.sh

# Set working directory to backend for commands
WORKDIR /app/backend

# Copy Prisma schema location is set via DATABASE_URL environment variable
# Prisma will look for schema.prisma in the prisma/ directory

EXPOSE 3001
ENTRYPOINT ["./docker-entrypoint.sh"]
