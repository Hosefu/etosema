# Frontend Dockerfile (Next.js)
# Builds only the frontend workspace and shared package.

FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies for frontend + shared
COPY package*.json ./
COPY frontend/package*.json frontend/
COPY shared/package*.json shared/
# Skip workspace postinstall scripts (shared runs prisma generate pointing to backend)
RUN npm ci --ignore-scripts --workspace frontend --workspace shared

# Copy source
COPY frontend ./frontend
COPY shared ./shared

# Build Next.js
RUN npm run build -w frontend

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built artifacts and runtime deps
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/package*.json ./frontend/
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=deps /app/frontend/.next ./frontend/.next
COPY --from=deps /app/frontend/public ./frontend/public
COPY --from=deps /app/shared ./shared

EXPOSE 3000
CMD ["npm", "run", "start", "-w", "frontend"]
