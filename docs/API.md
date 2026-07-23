# API Reference

Base URL: `http://localhost:5000`

All endpoints return JSON. Authentication is optional in the demo environment: if no `Authorization: Bearer <token>` header is sent, the API uses the default seeded user.

## Service endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | API service information and available routes. |
| `GET` | `/api` | API status and version. |
| `GET` | `/api/health` | Health status and database connection state. |

## Authentication

### `POST /api/auth/login`

Returns a JWT token and a user record for the requested role. If the database is unavailable, the API returns the demo user and a mock token.

Request body:

```json
{
  "role": "ADMIN",
  "email": "admin@nexus.local"
}
```

Response:

```json
{
  "token": "<jwt>",
  "user": {
    "id": "...",
    "name": "...",
    "email": "admin@nexus.local",
    "role": "ADMIN"
  }
}
```

## Dashboard and CRM

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/dashboard/stats` | Dashboard KPI summary. |
| `GET` | `/api/customers` | Customer records, newest first. |
| `POST` | `/api/customers` | Create a customer; a temporary record is returned if persistence fails. |

Customer creation payload:

```json
{
  "name": "Acme Industries",
  "email": "contact@acme.example",
  "phone": "+91 90000 00000",
  "company": "Acme Industries",
  "status": "NEW",
  "tags": ["Enterprise"],
  "notes": "Initial enquiry"
}
```

## Inventory and sales

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | Product catalog; uses demo products when the database is unavailable. |
| `GET` | `/api/inventory/logs` | Inventory movement history. |
| `GET` | `/api/challans` | Sales challan list. |
| `POST` | `/api/challans` | Creates a challan response with an ID, challan number, and current date. |
| `GET` | `/api/audit-logs` | Audit event history. |

## Error behaviour

The current demo API prioritizes continuity: several routes fall back to mock data instead of returning a database error. Production deployments should add centralized error responses, request validation, and strict authorization for mutating routes.
