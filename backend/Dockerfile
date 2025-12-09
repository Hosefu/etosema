# Backend Dockerfile
# Builds the API with npm workspaces support and Prisma client generation.

FROM node:20-alpine AS base
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

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy built artefacts and node_modules for backend
COPY --from=base /app/backend/dist ./backend/dist
COPY --from=base /app/backend/node_modules ./backend/node_modules
COPY --from=base /app/backend/package*.json ./backend/
COPY --from=base /app/shared ./shared

EXPOSE 3001
CMD ["node", "backend/dist/index.js"]
