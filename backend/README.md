# NexusERP AI ⚡
> **Smart Business Operations Platform (ERP + CRM)**

![NexusERP AI](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-cyan.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-00D4FF.svg)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

---

## 🌟 Executive Overview

**NexusERP AI** is an enterprise-grade, SaaS-level Business Operations Portal inspired by modern design standards from Linear, Notion, Stripe Dashboard, Vercel, and Framer. It seamlessly fuses Customer Relationship Management (CRM), Warehouse Inventory Management, Sales Challan Invoicing, and Machine Learning Predictive Intelligence into a unified glassmorphism dashboard.

---

## ✨ Key Features & Modules

### 1. 🎨 SaaS Design System & UI/UX
- **Modern Glassmorphism & Soft Neomorphism**: Midnight background (`#0B1020`) with vibrant violet (`#5B5FFF`), cyan (`#00D4FF`), and purple (`#7C3AED`) floating glowing gradient orbs.
- **Framer Motion Animations**: Micro-interactions, smooth route transitions, backdrop-blur modals, and staggered lists.
- **Dark/Light Mode**: One-click theme switching with persistence.

### 2. ⚡ Command Palette (`Ctrl + K`)
- Instant fuzzy search across Customers, Products, Sales Challans, and System views.
- Natural language **AI Copilot Query Assistant** built right into the command bar.

### 3. 📊 Executive Dashboard & Telemetry
- **Live KPI Stat Cards**: Today's Revenue, Active Orders, CRM Customers, Low Stock Alerts.
- **Interactive Recharts**: Revenue & Sales Trend smoothed area charts, Category inventory split pie charts.
- **Operations Activity Feed**: Real-time event stream.

### 4. 👥 Customer CRM & Pipeline Management
- **Lead Pipeline Badges**: NEW, QUALIFIED, PROPOSAL, WON, LOST.
- **Customer Profiles**: Search, tag filters, churn risk scoring, pinned favorites, and follow-up timeline drawer.

### 5. 📦 Product Catalog & Warehouse Visualization
- **Stock Meters**: Dynamic progress bars with threshold alerts (In Stock, Low Stock, Out of Stock).
- **Rack & Bin Allocation**: Physical location mapping (e.g. `Rack A - Bin 04`).
- **Warehouse Audit History Log**: Track stock movements (IN, OUT, ADJUSTMENT).

### 6. 📄 Interactive Sales Challan Builder
- **Order Invoicing**: Select customer, search products, adjust quantities with live price calculation and 18% tax breakdown.
- **Negative Stock Prevention**: Automatically validates inventory before confirming orders and auto-depletes stock.
- **Print-ready PDF Preview**: SaaS invoice modal complete with QR code verification hash and company branding.

### 7. 🤖 AI Predictive Intelligence Unit
- **Churn Risk Scorecard**: Identifies high-risk customer accounts with mitigation recommendations.
- **Restock Velocity Advisor**: Predicts stock depletion timelines and calculates suggested reorders.
- **Revenue Sales Forecast**: Compares actual historical revenue against AI projected trajectory curves.

### 8. 🛡️ Admin & Audit Shield
- **User Role Management**: Role-Based Access Control (RBAC) supporting `ADMIN`, `SALES`, `WAREHOUSE`, `ACCOUNTS`.
- **Live Security Audit Trail**: Captures IP addresses, timestamps, and action logs.

---

## 📐 System Architecture

```
                                  +---------------------------------------+
                                  |         NexusERP AI Client            |
                                  |  React 18 + Vite + Tailwind + Framer |
                                  +-------------------+-------------------+
                                                      |
                                          REST APIs / JSON / JWT
                                                      |
                                  +-------------------v-------------------+
                                  |         Express TypeScript API        |
                                  |   Controllers + RBAC Middleware       |
                                  +-------------------+-------------------+
                                                      |
                                                Prisma ORM
                                                      |
                                  +-------------------v-------------------+
                                  |         PostgreSQL Database           |
                                  | Users, Customers, Products, Challans  |
                                  +---------------------------------------+
```

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### 1. Installation
```bash
git clone https://github.com/your-username/nexus-erp-ai.git
cd nexus-erp-ai
npm install
```

### 2. Run Local Development Server
Launch both the Vite Frontend and Express Backend concurrently:
```bash
npm run dev
```
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🐳 Docker Deployment

To launch the application using Docker Compose with a dedicated PostgreSQL database container:

```bash
docker-compose up --build -d
```
Access the application at `http://localhost:3000`.

---

## 🔑 Role Switcher Presets (Demo Authentication)

In the bottom-left sidebar user profile card, click the role badge to instantaneously switch user roles:
- 👑 **ADMIN**: Full access including user role editing and audit logs.
- 🚀 **SALES**: Access to CRM, lead pipelines, and sales challans.
- 📦 **WAREHOUSE**: Access to inventory stock meters and warehouse rack allocation.
- 📊 **ACCOUNTS**: Access to financial challans, tax statements, and export reports.

---

## 📄 Postman API Collection

Import the included file [`NexusERP_API.postman_collection.json`](file:///c:/Users/vgand/Downloads/CASE%20STUDY/NexusERP_API.postman_collection.json) into Postman to test endpoints including `/api/auth/login`, `/api/customers`, `/api/products`, `/api/challans`, and `/api/ai/predictions`.

---

## 🛠️ Tech Stack Table

| Component | Technology Used |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Theme** | TailwindCSS, Vanilla CSS Glassmorphism |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Backend API** | Node.js, Express.js, TypeScript |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **Auth** | JWT Authentication, RBAC Middleware |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

© 2026 NexusERP AI. Designed & Built for Enterprise Business Operations.
