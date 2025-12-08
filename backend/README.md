# Etosema Portfolio - Backend

Backend API server for Sema's portfolio website. Built with Express.js, Prisma, and PostgreSQL.

## 🏗 Architecture

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Admin Panel**: AdminJS
- **Authentication**: JWT-based PIN sessions for NDA content
- **Security**: Rate limiting, bcrypt password hashing

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data for development
├── src/
│   ├── admin/
│   │   └── admin.ts           # AdminJS configuration
│   ├── config/
│   │   └── env.ts             # Environment configuration
│   ├── db/
│   │   └── prisma.ts          # Prisma client singleton
│   ├── modules/
│   │   ├── cases/             # Cases module
│   │   ├── pin/               # PIN authentication module
│   │   ├── profile/           # Profile module
│   │   └── security/          # Security middleware
│   ├── types/
│   │   └── api.ts             # TypeScript type definitions
│   └── index.ts               # Main server file
├── package.json
├── tsconfig.json
└── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database
- npm or pnpm

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your settings:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD`: Admin panel credentials
   - `PIN_SESSION_SECRET`, `JWT_SECRET`, `SESSION_SECRET`: Generate random secrets

3. **Set up database**:

   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # Seed with sample data (optional)
   npm run prisma:seed
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

   Server will start at `http://localhost:3001`

### Production Build

```bash
npm run build
npm start
```

## 📡 API Endpoints

All API endpoints return JSON in the format:

```json
{
  "data": { ... },
  "error": { "code": "...", "message": "..." }
}
```

### Public API (`/api/public`)

#### Cases

- **GET `/api/public/cases`**
  - Get all cases for grid display
  - Returns cases with `isLocked` computed from PIN session

- **GET `/api/public/cases/:slug`**
  - Get full case details with blocks and media
  - Returns 403 with `pin_required` error if NDA case without access

#### PIN Authentication

- **POST `/api/public/pin/apply`**
  - Apply a PIN code to unlock NDA content
  - Body: `{ "pin": "1234" }`
  - Sets `pinSession` httpOnly cookie
  - Rate limited: max 8 failed attempts per hour per IP

- **GET `/api/public/pin/status`**
  - Check current PIN session status
  - Returns accessible case slugs

#### Profile

- **GET `/api/public/profile`**
  - Get "About Me" page content

### Admin Panel

Access at `/admin` with credentials from `.env`:

- Manage cases, blocks, and media
- Create and manage PIN codes
- View PIN usage analytics
- Edit profile content

## 🔐 Security Features

### PIN Code System

- PIN codes stored as bcrypt hashes (never plain text)
- JWT-signed session cookies (httpOnly, secure in production)
- Configurable expiration dates
- Two access modes:
  - **Specific cases**: PIN grants access to selected cases
  - **All access**: PIN grants access to all NDA content

### Rate Limiting

- Automatically blocks IPs after 8 failed PIN attempts in 1 hour
- Prevents brute-force attacks
- Configurable in `src/config/env.ts`

### Usage Tracking

All PIN attempts are logged with:

- IP address
- User agent
- Success/failure status
- Timestamp

View analytics in Admin Panel under "Analytics" → "Pin Usages"

## 🗄 Database Schema

### Main Models

- **Case**: Portfolio projects/cases
- **CaseBlock**: Content blocks within cases (FULL or HALF layout)
- **CaseBlockMedia**: Images/videos in blocks
- **PinCode**: PIN codes for NDA access
- **PinCodeCase**: Many-to-many relationship between PINs and cases
- **PinUsage**: Analytics for PIN attempts
- **Profile**: "About Me" page content

### LexoRank Ordering

Cases and blocks use `orderRank` field for custom ordering:

- String-based ranking system
- Allows inserting items between existing items
- No need to reorder all items when inserting

## 🛠 Development

### Prisma Commands

```bash
# Generate Prisma client after schema changes
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database and re-seed
npx prisma migrate reset
```

### Sample PIN Codes (from seed)

- **1234**: Access to "Проект под NDA" case
- **9999**: Admin PIN with access to all NDA cases

## 🌐 Environment Variables

| Variable             | Description                          | Default               |
| -------------------- | ------------------------------------ | --------------------- |
| `DATABASE_URL`       | PostgreSQL connection string         | -                     |
| `PORT`               | Server port                          | 3001                  |
| `NODE_ENV`           | Environment (development/production) | development           |
| `ADMIN_EMAIL`        | Admin panel email                    | admin@etosema.ru      |
| `ADMIN_PASSWORD`     | Admin panel password                 | -                     |
| `PIN_SESSION_SECRET` | Secret for PIN session JWT           | -                     |
| `JWT_SECRET`         | General JWT secret                   | -                     |
| `SESSION_SECRET`     | Express session secret               | -                     |
| `FRONTEND_URL`       | Frontend URL for CORS                | http://localhost:3000 |

## 📝 Notes

- Only one Profile record should exist (id = 1)
- Admin panel prevents creating multiple profiles
- PinUsage is read-only in admin panel
- For production, ensure all secrets are properly randomized
- Consider using environment-specific `.env` files

## 🔗 Related

- [Frontend Documentation](../frontend/README.md)
- [API Type Definitions](./src/types/api.ts)
- [Prisma Schema](./prisma/schema.prisma)
