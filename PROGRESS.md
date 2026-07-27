# NHGP — Build Progress

_Updated: 2026-07-27 | Session 1_

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
- [x] **PrismaModule** — Database service
- [x] **HealthController** — `/api/v1/health`
- [x] **Stub modules** (empty, wired in, ready to build out):
  - CustomerModule, ReservationModule, SaleModule, PaymentModule
  - InspectionModule, DocumentModule, EmployeeModule, VendorModule
  - AppointmentModule, NotificationModule, AiModule, DashboardModule

### Admin Portal (apps/admin) — Next.js 16, React 19, Tailwind CSS 4

- [ ] No real UI built yet — default Next.js placeholder

### Public Website (apps/web) — Next.js

- [ ] No real UI built yet — original Turborepo starter placeholder

---

## Currently in progress

_Nothing in progress — session 1 ended cleanly._

---

## Next steps (Phase 1 build order)

1. **Admin: Property list page** — `/admin/properties` — table of all properties with status badges, search, filters. Uses `GET /api/v1/properties`. Install shadcn/ui first.
2. **Admin: Create property form** — `/admin/properties/new` — full form matching the EAS fields needed to create a property (title, category, type, state, estate/development link, price, etc.)
3. **Admin: Property detail/edit page** — `/admin/properties/:id` — view + edit + status transition buttons
4. **Admin: Estate list + create** — needed before properties (properties must belong to an estate)
5. **Admin: Auth** — login page, protect all admin routes, session management
6. **Customer registration + login** — public-facing registration, email verification
7. **Public property website** — browse/search, property detail pages
8. **Reservation workflow** — customer request → staff view → status updates
9. **Basic email notifications** — registration, inquiry, status changes

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
