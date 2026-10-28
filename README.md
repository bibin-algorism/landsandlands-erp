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

### 2. Database Setup (new machine)

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # first time only
pnpm db:setup
```

`pnpm db:setup` applies every migration, generates the Prisma client and seeds the demo accounts below. It is safe to run again: applied migrations are skipped and the seed uses upserts.

### 3. Changing the Database Schema

Every schema change ships as a migration file, so all machines and environments stay identical.

1. Edit `apps/api/prisma/schema.prisma`.
2. Create and apply the migration (also regenerates the Prisma client):

   ```bash
   pnpm db:migrate --name add_mother_name
   ```

3. Review the generated `apps/api/prisma/migrations/<timestamp>_add_mother_name/migration.sql`, then commit it together with `schema.prisma`.

Teammates pick up your change with `pnpm db:deploy && pnpm db:generate` (or `pnpm db:setup`).

| Command | What it does |
| :--- | :--- |
| `pnpm db:setup` | Fresh or existing DB: apply migrations, generate client, seed |
| `pnpm db:migrate --name <change>` | Create a migration from your schema edits and apply it locally |
| `pnpm db:migrate:create --name <change>` | Create the migration file only, to edit it (e.g. add a data copy) before applying with `pnpm db:migrate` |
| `pnpm db:deploy` | Apply pending migrations; never resets data (use in CI/CD and production) |
| `pnpm db:status` | Show pending migrations and drift |
| `pnpm db:generate` | Regenerate Prisma Client types |
| `pnpm db:seed` | Seed demo accounts |

**Safety notes**

- Read the migration SQL before applying it. `DROP TABLE`, `DROP COLUMN`, renames, or a new required column on a table with rows can lose data or fail; use `pnpm db:migrate:create` and edit the SQL first.
- If `pnpm db:migrate` reports drift and asks to **reset the database, answer no** — a reset deletes all data. Drift means the database was changed outside migrations; ask the team before resolving it.
- Don't change the database by hand or with `prisma db push`; changes made that way have no migration and break other machines.
- Back up before risky migrations:

  ```bash
  docker exec erp_postgres pg_dump -U erp_user -d erp_db --no-owner > apps/api/backups/erp_db_$(date +%Y%m%d_%H%M%S).sql
  ```

### 🔑 Demo Login Credentials

Upon running `pnpm db:seed`, the database is provisioned with default accounts:

| Role | Identifier / User Code | Password | Details |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `LL_00001` (or `LL-00001`) | `AdminPassword123!` | System Managing Director (`SUPER_ADMIN`) |
| **Mock Employee** | `LL_48213` (or `LL-48213`) | `Password123!` | Rahul Sharma (Sales Executive) |
| **Mock Client** | `CL_10001` (or `CL-10001`) | `ClientPassword123!` | Rajesh Kumar (Client Code: `CL-10001`) |

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
