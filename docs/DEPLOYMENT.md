# Deployment Guide

## Prerequisites

- Node.js 20 LTS or later (recommended)
- npm 9 or later
- Docker Desktop, when running PostgreSQL locally

## Local development

From the repository root:

```powershell
npm install
npm run dev
```

This starts both services:

| Service | Address | Command |
| --- | --- | --- |
| Frontend | `http://localhost:3000` | Vite development server |
| Backend | `http://localhost:5000` | Express + `tsx` |

The root `npm start` command is an alias for `npm run dev`.

## Environment configuration

Create a local backend environment file:

```powershell
Copy-Item backend\.env.example backend\.env
```

Configuration values:

| Variable | Purpose |
| --- | --- |
| `PORT` | Express listening port. Defaults to `5000`. |
| `DATABASE_URL` | Prisma PostgreSQL connection string. |
| `JWT_SECRET` | Secret used to sign authentication tokens. Replace before any production deployment. |
| `VITE_API_BASE_URL` | API base URL for frontend builds when required. |

## PostgreSQL with Docker

The backend Docker Compose configuration starts the API and PostgreSQL:

```powershell
cd backend
docker compose up --build -d
```

The PostgreSQL service is exposed on `localhost:5432`; the API is exposed on `localhost:5000`. The default development database credentials are declared in `backend/docker-compose.yml`.

After PostgreSQL is available, generate the Prisma client and apply the schema:

```powershell
cd backend
npm run build
npx prisma db push
npm run db:seed
```

## Production build

Build the frontend bundle from the repository root:

```powershell
npm run build
```

The command creates the frontend build and runs the repository copy script. Host the generated static site behind HTTPS and deploy the API with a managed PostgreSQL database. Use secure, environment-specific values for `DATABASE_URL` and `JWT_SECRET`.

## Operational checks

```powershell
Invoke-WebRequest http://localhost:5000/api/health
```

Expected response fields include `status`, `database`, `timestamp`, and `uptime`.
