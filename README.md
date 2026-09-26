# Intelligent Real Estate ERP

A modern, client-centric, and intelligent ERP platform for real estate management. Built as a modular monolith to ensure fast delivery, strong transactional consistency, and easy extraction of modules into independent services as the platform scales.

---

## 🛠 Tech Stack

- **Monorepo Manager**: `pnpm` + `Turborepo`
- **Frontend**: React + Vite + TypeScript (`apps/web`)
- **Backend**: NestJS (Fastify adapter) + TypeScript (`apps/api`)
- **Database**: PostgreSQL 16 (via Prisma ORM)
- **Testing**: Jest + Supertest
- **Infrastructure**: Docker Compose (Local Dev)
- **API Testing**: Bruno Collections (`bruno/`)

---

## 📁 Repository Structure

```text
intelligent-erp/
├── apps/
│   ├── api/          # NestJS backend (modular monolith)
│   └── web/          # React + Vite frontend
├── bruno/            # Bruno API test collections & environments
├── packages/
│   └── shared/       # Shared types, constants, and DTOs
├── docker-compose.yml # Local PostgreSQL container configuration
├── turbo.json         # Turborepo pipeline config
└── package.json       # Root workspace config
```

---

## 🚀 Quick Start Guide

### 1. Start Infrastructure (PostgreSQL)

Start PostgreSQL database in background:

```bash
docker compose up -d
```

### 2. Database Setup & Migrations

Execute database migrations and generate Prisma client:

```bash
# Generate new migration & apply in local dev
pnpm db:migrate --name init

# Apply pending migrations in production (CI/CD pipeline)
pnpm db:deploy

# Push schema directly to database (prototype/development)
pnpm db:push

# Generate Prisma Client TypeScript types
pnpm db:generate
```

---

## 🏃 Running Applications

### Start All Applications (Parallel)

Starts both backend API (`apps/api`) and frontend (`apps/web`):

```bash
pnpm dev
```

### Start Backend API Only (`apps/api`)

```bash
pnpm --filter api dev
```
*API will run on `http://localhost:8088` (or `PORT` defined in `apps/api/.env`).*

### Start Frontend Only (`apps/web`)

```bash
pnpm --filter web dev
```
*Frontend will run on `http://localhost:5173`.*

---

## 🏗️ Build Commands

```bash
# Build all apps & packages
pnpm build

# Build backend API only
pnpm --filter api build

# Build frontend only
pnpm --filter web build
```

---

## 🧪 Testing Commands

```bash
# Run unit tests across workspace via Turborepo
pnpm test

# Run backend API unit tests
pnpm --filter api test

# Run backend API E2E tests
pnpm --filter api test:e2e
```

---

## 🧹 Code Quality & Linting

```bash
# Run linter across all workspace packages
pnpm lint

# Format codebase with Prettier
pnpm format
```

---

## 📬 API Testing (Bruno)

Bruno API collection files are located in `bruno/`.

1. Open **Bruno App**.
2. Select **Open Collection** ➡️ select `bruno/` directory.
3. Select `local` environment (`baseUrl`: `http://localhost:4000`).
