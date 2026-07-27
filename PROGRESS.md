# NHGP — Build Progress

_Updated: 2026-07-27 | Session 2_

---

## What's been built

### Infrastructure & Foundation

- [x] **Turborepo monorepo** — apps/admin, apps/web, apps/api, packages/ layout
- [x] **Prisma schema** (packages/database) — full domain model for all 13 business capabilities:
  - Auth & RBAC (User, Role, Permission, EmployeeRole)
  - Company & HR (Company, CompanyBranch, Department, Employee)
  - Estate & Development (Estate, Phase, Block, Infrastructure, Development, Milestone, Building)
  - Property (Property with all 80+ EAS fields, PropertyMedia, StatusHistory, Favorites)
  - Customer & Transactions (Customer, Inspection, Reservation, Sale, SaleInstallment, Payment)
  - Platform (Document, DocumentVersion, Vendor, Appointment, Notification, AI, AuditLog)
- [x] **Database migration** — initial schema applied to Neon PostgreSQL (`initial_schema`)
- [x] **Database seed** — 46 permissions, 10 system roles, 8 departments, super-admin user
- [x] **Shared packages** — `@nhgp/lib`, `@nhgp/types`, `@nhgp/config`, `@nhgp/validation`, `@nhgp/database` all built and exporting

### API (apps/api) — NestJS, port 4000

- [x] **Bootstrap** — Helmet, CORS, global prefix `/api/v1`, ValidationPipe, rate limiting
- [x] **AuthModule** — JWT login (with brute-force lockout), refresh tokens, logout, change-password, RBAC guards
- [x] **AuditModule** — Immutable audit log, all business operations are logged
- [x] **PropertyModule** — Full CRUD + status transitions, all 4 EAS business rules enforced
- [x] **EstateModule** — Full CRUD + phase/block/infrastructure management
- [x] **CompanyModule** — Company CRUD + branch management
- [x] **StorageModule** — Local file storage (ready to swap to S3)
- [x] **PrismaModule** — Database service with Neon cold-start retry (5 attempts, 3s apart)
- [x] **HealthController** — `/api/v1/health`
- [x] **Stub modules** (empty, wired in, ready to build out):
  - CustomerModule, ReservationModule, SaleModule, PaymentModule
  - InspectionModule, DocumentModule, EmployeeModule, VendorModule
  - AppointmentModule, NotificationModule, AiModule, DashboardModule

### Admin Portal (apps/admin) — Next.js 16, React 19, Tailwind CSS 4

- [x] **shadcn/ui component library** — Button, Input, Label, Badge, Card, Table, Select, Checkbox, Textarea, DropdownMenu, Separator installed (Tailwind v4 compatible)
- [x] **Admin auth** — Login page, `proxy.ts` route guard (Next.js 16 middleware), JWT in httpOnly cookies
- [x] **Dashboard layout** — Dark sidebar with nav, header component
- [x] **Property list page** (`/properties`) — server-rendered, searchable, filterable by status + category, paginated, colour-coded badges (correct enum values)
- [x] **Property create form** (`/properties/new`) — full form: estate, title, category, type, location, pricing, installment flag, bedrooms, bathrooms
- [x] **Property detail/edit page** (`/properties/:id`) — summary card, inline edit form, status transition panel with reason input and confirmation for destructive moves
- [x] **Estate list page** (`/estates`) — server-rendered table with status badges, plot counts, property counts
- [x] **Estate create form** (`/estates/new`) — full form: company picker, name, code, location (Nigerian state list), land size, total plots
- [x] **Estate detail page** (`/estates/:id`) — overview, phases, blocks, infrastructure, recent properties
- [x] **Server actions** (`lib/actions.ts`) — createEstate, createProperty, transitionPropertyStatus, updateProperty
- [x] **Stub pages** — Customers, Documents, Reports, Settings (placeholder, won't 404)

### Public Website (apps/web) — Next.js

- [ ] No real UI built yet — original Turborepo starter placeholder

---

## Currently in progress

_Nothing in progress — session 2 ended cleanly._

---

## Next steps (Phase 1 build order)

1. **Admin: Dashboard home** (`/`) — stats tiles: total properties by status, recent activity
2. **Admin: Customer list + create** — `/customers` — search, filter by type/status
3. **Admin: Company setup** — first-run flow to create a company (required before estates work)
4. **Public property website** — browse/search, property detail pages, inquiry form
5. **Reservation workflow** — customer request → staff view → status updates
6. **Basic email notifications** — registration, inquiry, status changes

---

## What's stubbed (schema exists, module wired, not yet implemented)

- Customer CRUD endpoints
- Reservation CRUD endpoints
- Sale, Payment, Inspection endpoints
- Document upload/management endpoints
- Employee management endpoints
- Vendor, Appointment, Notification endpoints
- AI assistant endpoints
- Executive dashboard endpoints
