# NEXUS ERP AI Documentation

NEXUS ERP AI is a web-based ERP and CRM workspace for customer management, inventory operations, sales challans, reporting, and AI-oriented business insights.

## Documentation map

| Document | Purpose |
| --- | --- |
| [Architecture](ARCHITECTURE.md) | Application components, request flow, and technology choices. |
| [API reference](API.md) | Available HTTP endpoints and their responses. |
| [Deployment guide](DEPLOYMENT.md) | Local setup, Docker deployment, environment variables, and build steps. |
| [Data model](ERD.md) | Entity relationships represented by Prisma models. |
| [Complete project document](NEXUS-ERP-AI-Documentation.docx) | Word version for submission or sharing. |

## Quick start

```powershell
cd E:\NEXUS
npm install
npm run dev
```

Open `http://localhost:3000`. The API listens on `http://localhost:5000`.

For PostgreSQL-backed development, copy `backend/.env.example` to `backend/.env`, start PostgreSQL with Docker Compose, and apply the Prisma schema as described in the [deployment guide](DEPLOYMENT.md).
