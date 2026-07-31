# NHGP — Build Progress & Master Todo List

_Updated: 2026-07-31 | Session 13_

> This file is the single source of truth for what's done, what's in progress, and what
> remains until 100% production-ready. Read it at the start of every session.

---

## Project Vision (from spec)

Build Nigeria's most trusted, transparent, and professional real estate operations platform
for Ndukego Investments & Properties Limited. Three portals: Public Website (customers +
visitors), Admin Portal (staff), API (backend). Eventually: Executive Dashboard, AI
Assistant, Mobile App.

**Brand promise:** Trust · Transparency · Professionalism
**Design feel:** Clean enterprise SaaS (Linear / Stripe Dashboard energy) — not flashy

---

## PHASE 1 — Foundation (MVP) `⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ ~98% done`

Target: Live and usable by company staff and customers.

### 1A. Infrastructure & Foundation ✅ COMPLETE

- [x] Turborepo monorepo — web :3000, admin :3001, api :4000
- [x] Prisma schema — full domain model for all 13 business capabilities
- [x] Database migration — applied to Neon PostgreSQL
- [x] Database seed — 46 permissions, 10 system roles, 8 departments, super-admin user
- [x] Shared packages — `@nhgp/lib`, `@nhgp/types`, `@nhgp/config`, `@nhgp/validation`, `@nhgp/database`
- [x] `@nhgp/assets` — brand logo components using real PNG files (logo.png, logo-icon.png, logo-xicon.png)

### 1B. API — NestJS backend :4000 ✅ COMPLETE (Phase 1 scope)

- [x] AuthModule — JWT login, refresh, logout, RBAC guards, `@Public()` decorator
- [x] AuditModule — immutable audit log service
- [x] StorageModule — local file storage, static `/uploads` serving
- [x] HealthController — `GET /health`
- [x] PropertyModule
  - [x] Full CRUD — create, read, update, delete (soft), status transitions
  - [x] Media upload — cover photo + gallery, sort order
  - [x] Public endpoints: `GET /properties/public`, `GET /properties/public/:id`
  - [x] Inquiry endpoint: `POST /properties/public/inquiry` (creates/updates customer lead)
  - [x] **Wire inquiry confirmation email** — `submitInquiry()` calls `emailService.sendInquiryConfirmation()`
- [x] EstateModule — full CRUD + `GET /estates/public`
- [x] CompanyModule — company info + branch management
- [x] DashboardModule — `GET /dashboard/stats`
- [x] CustomerModule — paginated list with search/filter, create, get, update (staff-only)
- [x] EmailModule — global Nodemailer service, graceful SMTP degradation
  - [x] sendWelcome, sendReservationConfirmation, sendReservationStatusUpdate
  - [x] **sendInquiryConfirmation** — wired in email service, now called from property service
- [x] Auth — customer register/login/profile endpoints (`/auth/customer/*`)
- [x] ReservationModule
  - [x] `POST /reservations/public` — no auth, creates reservation, sends email
  - [x] `GET /reservations` — admin list with search/status/page filters
  - [x] `GET /reservations/mine` — customer's reservations
  - [x] `GET /reservations/:id` — admin detail
  - [x] `PATCH /reservations/:id/status` — admin status update + audit + email
  - [x] Status machine: PENDING → CONFIRMED | CANCELLED; CONFIRMED → CONVERTED_TO_SALE | CANCELLED | EXPIRED
  - [ ] **Missing status: UNDER_NEGOTIATION** — spec defines this; not yet in transitions
- [x] **FavoritesModule** — `POST /properties/:id/favorite` (toggles), `GET /properties/:id/favorite-status`
- [x] **Customer profile update** — `PATCH /auth/customer/profile` (name, phone, city, state)

### 1C. Admin Portal — Next.js 16, :3001 ✅ COMPLETE (Phase 1 scope)

- [x] Auth — login page, JWT in httpOnly cookies, route guard (proxy.ts)
- [x] Dashboard home — stat tiles, recent properties, status breakdown, activity feed
- [x] Properties — list, create, detail/edit, status transitions, photo upload + gallery
- [x] Estates — list, create, detail (phases, blocks, infrastructure)
- [x] Customers — list, create, detail
- [x] Reservations — list with search + status filter; detail/manage with status update + notes
- [x] `@nhgp/assets` logo — uses real logo-icon.png in sidebar
- [x] **Employee management** — `/employees` list, `/employees/new` create, `/employees/:id` detail + role assignment
- [x] **Staff password change** — `/settings/password` page with strength meter, uses POST /auth/change-password
- [x] **Company settings page** — company info, branch addresses, contact details (`/settings`)
- [x] **Inquiry management** — `/inquiries` page (shows Website leadSource customers with message preview)
- [x] **Admin portal redesign (Session 11):**
  - [x] `globals.css` — light-only, dark sidebar tokens in `:root`, 3px crimson scrollbar, Fraunces/DM Sans font vars
  - [x] `ThemeProvider` — `forcedTheme="light"`, dark mode removed entirely
  - [x] Sidebar — premium always-dark `#111111`, grouped nav (MAIN/OPERATIONS/ORGANISATION), crimson active dot + bg tint, correct branding "Ndukego Investments & Properties Ltd"
  - [x] Header — ThemeToggle removed, clean minimal white header with notification bell
  - [x] Login — split-screen: dark left brand panel (crimson glow, trust signals) + white right form panel (crimson CTA button, forgot password link)
  - [x] Layout metadata title — "Ndukego Investments & Properties Ltd — Admin"

### 1D. Public Website — Next.js 16, :3000 ✅ MOSTLY COMPLETE

- [x] Setup — Tailwind CSS v4, PostCSS, path aliases, fonts, framer-motion, @react-three/fiber + drei
- [x] Theme — **LIGHT-ONLY** — dark mode removed entirely (`forcedTheme="light"` in ThemeProvider); crimson #C1121F accent on clean white base
- [x] **Global background system** — `nhgp-gradient-bg` (fixed, z-index -2, morphing crimson gradient, 24s `gradient-morph` keyframe, organic all-directional motion) + `nhgp-grid-bg` (fixed, z-index -1, 60px subtle grid, rgba black/4.5%) — shows through all sections
- [x] **Custom scrollbar** — 3px thin, barely-visible crimson, expands to 50% opacity on hover, applied globally
- [x] Navbar — **REBUILT** — 3-column grid: left=User+CalendarCheck icon buttons; center=logo (LogoIcon in crimson square) + brand name stacked; right=hamburger; dropdown panel shows all nav links in grid (Services expands on hover); body scroll-locked when open; `Book Consultation` CTA at bottom of dropdown
- [x] Footer — **REBUILT** — crimson CTA band (with inner grid overlay) + 4-column white/80 section (brand col with contacts, Services, Properties, Company) + dark gray-900 bottom bar
- [x] Homepage — **REBUILT (light theme)** — transparent/semi-transparent sections let global gradient breathe through; hero (-mt-16, video bg at 12% opacity, white text+crimson gradient heading, white search bar, stat strip); 4 service cards (emerald/blue/violet/amber on white); Featured Properties (white/70 card on empty state); Process section (auto-playing Framer Motion, crimson radial pulse + scan beam + ring, 4 step cards white/80 with hover glow); Trust section (checklist + contact card with phone links + CTA)
- [x] Properties listing `/properties` — sticky filters (search + category + state), grid, pagination
- [x] Property detail `/properties/:id` — gallery, specs, description, reserve button + inquiry sidebar
- [x] Inquiry form — success state, creates customer lead
- [x] Reservation modal — full-screen, shows ref number on success
- [x] Estates page `/estates` — grid with plot/property counts
- [x] About page `/about` — company stub
- [x] Contact page `/contact` — contact info + inquiry form
- [x] Customer auth — `/login`, `/register`, route guard (proxy.ts)
- [x] Customer account section `/account/**`
  - [x] `/account` — dashboard with reservation/favorites counts, recent activity
  - [x] `/account/reservations` — full list with status badges, expiry
  - [x] `/account/favorites` — saved properties grid
  - [x] `/account/profile` — editable form (name, phone, city, Nigerian state dropdown)
- [x] Real logo images used (logo.png, logo-icon.png, logo-xicon.png)
- [x] **Favorites** — heart button on property cards + detail page; toggle with login prompt
- [x] **Terms of Service** `/terms` — NDPA-compliant
- [x] **Privacy Policy** `/privacy` — NDPA/NDPR compliant; linked in footer
- [x] **About page** — fully built with story, values (Trust/Transparency/Professionalism), mission/vision, stats
- [ ] **React key prop warning** — homepage has a list element missing `key` (source unidentified)

### 1E. Phase 1 Final Checklist (before going live)

- [ ] **Run full pnpm install** — to install nodemailer, link @nhgp/assets ✅ DONE this session
- [ ] **Wire inquiry email** — property.service.ts → emailService.sendInquiryConfirmation()
- [ ] **SMTP env vars** — add to apps/api/.env (see SETUP.md for options)
- [ ] **Change super admin password** — currently `ChangeMeNow123!`
- [ ] **Enter real company data** — at least 1 estate, 3-5 properties with photos, staff accounts
- [ ] **Terms & Privacy pages** — required before any public launch
- [ ] **Test full flows end-to-end:**
  - [ ] Visitor searches → views property → submits inquiry → gets email
  - [ ] Visitor → reserves property → gets confirmation email → admin sees reservation
  - [ ] Admin confirms reservation → customer gets status update email
  - [ ] Customer registers → logs in → views reservations → views saved properties

---

## PHASE 2 — Business Operations `⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% done`

Build these after Phase 1 is live and stable.

### 2A. Employee & Workforce Management

- [ ] Admin: Employee list, create, edit, deactivate
- [ ] Admin: Department management
- [ ] Admin: Role assignment to employees
- [ ] Admin: Employee profile page (personal info, role, department)
- [ ] Admin: Staff can change own password
- [ ] Public: Staff login uses Employee.staffId for display

### 2B. Document & Records Management

- [ ] Document upload (Survey Plans, C of O, Deeds, Allocation Letters, etc.)
- [ ] Document versioning — every upload creates a new version, old ones archived
- [ ] Document categories and classification
- [ ] Admin: Document list per property, per customer, per estate
- [ ] Admin: Document approval workflow (upload → review → approve)
- [ ] Customer portal: Approved documents visible to relevant customer
- [ ] Storage: Move from local filesystem to cloud storage (Cloudflare R2 / AWS S3)
  - See SETUP.md for R2 configuration details

### 2C. Inspection & Site Visit Management

- [ ] API: Inspection model endpoints (create, list, update, complete)
- [ ] Admin: Schedule inspection (property → assign inspector → date)
- [ ] Admin: Inspection report upload (photos, findings, recommendation)
- [ ] Admin: Mark property as inspection-complete (unblocks publication)
- [ ] Customer: Book a site visit request from property detail page
- [ ] Admin: Manage appointment requests, confirm/reschedule

### 2D. Sales Tracking & Full Reservation Lifecycle

- [ ] Extend reservation status: add UNDER_NEGOTIATION, UNDER_CONTRACT
- [ ] Admin: Reservation timeline view — show all status changes with timestamps/notes
- [ ] Admin: Convert reservation → Sale record (when contract is signed)
- [ ] Sale model: record sale date, agreed price, payment terms
- [ ] Admin: Sale list page

### 2E. Financial Recording

- [ ] Payment record model endpoints
- [ ] Admin: Record a payment (linked to Sale or Reservation)
- [ ] Admin: Generate receipt PDF (printable)
- [ ] Admin: Payment history per customer, per property
- [ ] Admin: Outstanding balance tracker
- [ ] Note: NO online payment processing — all payments physical at company office

### 2F. CRM — Inquiry & Lead Management

- [ ] Admin: Inquiry list (all inquiries from website + direct)
- [ ] Admin: Inquiry detail — view message, customer info, property, date
- [ ] Admin: Respond to inquiry (logged response)
- [ ] Admin: Convert inquiry → Lead → Reservation pipeline
- [ ] Admin: Lead status tracking (New → Contacted → Interested → Converted → Lost)
- [ ] Admin: Customer communication history per customer

### 2G. Notifications (Enhanced)

- [ ] In-app notifications for staff (new reservation, new inquiry, status change)
- [ ] Email: Inquiry received → notify assigned Sales Executive
- [ ] Email: Reservation approved → notify customer
- [ ] Email: Document approved → notify customer
- [ ] Email: Appointment confirmed → notify customer
- [ ] SMS notifications (future — needs SMS provider, e.g. Termii for Nigeria)

### 2H. Company & Platform Settings

- [ ] Admin: Company settings page (name, logo, contact info, social links)
- [ ] Admin: Branch management (add/edit/deactivate branches)
- [ ] Admin: System configuration (reservation expiry days, currencies, etc.)

---

## PHASE 3 — Business Intelligence `⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% done`

Build after Phase 2 is stable.

### 3A. Executive Dashboard

- [ ] KPI overview: total properties, active reservations, sales this month/year, leads
- [ ] Revenue trend chart (monthly/quarterly)
- [ ] Inventory utilization: Published vs Reserved vs Sold
- [ ] Estate/Development progress overview
- [ ] Top-performing sales staff
- [ ] Customer acquisition funnel
- [ ] Configurable date ranges

### 3B. Advanced Reporting

- [ ] Property performance report (views, favorites, inquiries, reservations per property)
- [ ] Sales performance report (per staff, per period)
- [ ] Customer lifecycle report
- [ ] Payment status report (outstanding, received, overdue)
- [ ] Export to PDF / Excel

### 3C. AI & Knowledge Services

- [ ] AI Knowledge Base — import property data, company FAQs
- [ ] Customer assistant — answer questions about properties, estates, pricing
- [ ] Employee assistant — help draft communications, summarize customer history
- [ ] Property recommendations — suggest suitable properties to customers based on inquiry history
- [ ] Auto-generate marketing descriptions from property attributes
- [ ] Flag incomplete listings before publication
- [ ] **Rule: AI may recommend/assist but never execute irreversible actions without human approval**
- [ ] Integration: Claude API or OpenAI (model TBD based on performance + cost)

---

## PHASE 4 — Growth & Expansion `⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% done`

Build after Phase 3 demonstrates ROI.

- [ ] Mobile applications (iOS + Android) — React Native likely, reusing API
- [ ] GIS / Interactive Map — search properties on a map, plot boundaries
- [ ] Smart estate integrations — construction progress updates, sensor data
- [ ] Government API integrations — title verification, planning approvals
- [ ] Partner/Vendor portal — external contractors, surveyors, legal advisors
- [ ] Multi-company support — if Ndukego expands into subsidiaries or related businesses
- [ ] Predictive analytics — AI-driven market forecasting, demand prediction

---

## PRODUCTION DEPLOYMENT CHECKLIST `⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 0% done`

Must be complete before any live traffic.

### Infrastructure

- [ ] **Domain name** — register (ndukegohomes.com or ndukegoproperties.com)
- [ ] **API hosting** — Railway or Render.com (deploy from GitHub)
- [ ] **Web + Admin hosting** — Vercel (connects to GitHub, auto-deploys)
- [ ] **Database** — already on Neon PostgreSQL; no change needed for launch
- [ ] **File storage** — migrate from local filesystem to Cloudflare R2 / AWS S3
- [ ] **Email SMTP** — configure Resend, SendGrid, or Gmail App Password (see SETUP.md)

### Environment Variables (production)

- [ ] `DATABASE_URL` — Neon connection string (already exists, keep secret)
- [ ] `JWT_SECRET` / `JWT_REFRESH_SECRET` — strong random strings
- [ ] `SUPER_ADMIN_PASSWORD` — change from default `ChangeMeNow123!`
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- [ ] `WEB_URL` — production URL (e.g. https://ndukegohomes.com)
- [ ] `NEXT_PUBLIC_API_URL` — production API URL
- [ ] `NEXT_PUBLIC_API_BASE` — production API base (for media)
- [ ] Storage env vars when R2/S3 is set up

### Security Hardening

- [ ] HTTPS enforced (Vercel handles this automatically)
- [ ] Rate limiting on API — especially auth endpoints (prevent brute force)
- [ ] CORS configuration — restrict to known origins only
- [ ] Helmet.js headers — already partially configured in NestJS
- [ ] Input sanitization audit — check all public API endpoints
- [ ] JWT secret rotation plan
- [ ] Super admin 2FA (future)

### Performance

- [ ] Next.js Image optimization configured for production media
- [ ] API response caching for public endpoints (properties list, estates list)
- [ ] Database connection pooling (Neon handles this, but verify)
- [ ] Remove all `console.log` debug statements from production API

### Data & Legal

- [ ] **Real company data entered** — estate records, property listings with photos, staff accounts
- [ ] **Terms of Service page** — `/terms` on public website
- [ ] **Privacy Policy page** — `/privacy` on public website
- [ ] **Cookie notice** — required for GDPR/NDPA compliance (Nigeria Data Protection Act)
- [ ] **About page content** — real company description, mission, team
- [ ] **Contact info** — real phone, email, address in footer and contact page

### Testing Before Launch

- [ ] Full end-to-end test of all customer flows (browse → reserve → receive email)
- [ ] Full end-to-end test of all admin flows (create property → publish → manage reservation)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test with slow 3G connection
- [ ] Load test API endpoints
- [ ] Security scan (check for exposed .env, open admin routes, etc.)

### Go-Live Steps

1. [ ] Set all production env vars in Vercel + Railway/Render
2. [ ] Deploy API to Railway/Render, verify health endpoint
3. [ ] Deploy web + admin to Vercel, verify both load
4. [ ] Connect domain name to Vercel
5. [ ] Update `NEXT_PUBLIC_API_URL` to point to deployed API
6. [ ] Run database migration on production (if any pending)
7. [ ] Create real staff accounts (not the seeded test accounts)
8. [ ] Enter real property and estate data
9. [ ] Test all flows on live domain
10. [ ] Announce to company

---

## What's Stubbed (schema exists, no UI yet)

These exist in the Prisma schema and will be built in their respective phases:

| Model | Schema | API | Admin UI | Customer UI |
|---|---|---|---|---|
| Employee | ✅ | ❌ | ❌ | n/a |
| Inspection | ✅ | ❌ | ❌ | Request only |
| Appointment | ✅ | ❌ | ❌ | ❌ |
| Document | ✅ | ❌ | ❌ | View only |
| Sale | ✅ | ❌ | ❌ | n/a |
| Payment | ✅ | ❌ | ❌ | View only |
| PropertyFavorite | ✅ | ❌ | n/a | View only |
| Notification | ✅ | ❌ | ❌ | ❌ |
| AuditLog | ✅ | Partial | View only | n/a |

---

## Known Issues / Bugs

| ID | Location | Description | Priority |
|---|---|---|---|
| BUG-01 | apps/web | React `key` prop warning — some list on homepage | Low |
| ~~BUG-02~~ | ~~apps/api~~ | ~~Inquiry submission doesn't send confirmation email~~ | ~~FIXED~~ |
| ~~BUG-03~~ | ~~apps/web~~ | ~~Favorites — customer can view saved properties but cannot add/remove~~ | ~~FIXED~~ |
| ~~BUG-04~~ | ~~apps/web~~ | ~~Profile page is read-only — no edit form~~ | ~~FIXED~~ |

---

## Session Log

| Session | Date | What was built |
|---|---|---|
| 1 | 2026-07-27 | Prisma schema, DB migration, seed, AuthModule, shared packages |
| 2 | 2026-07-27 | PropertyModule, EstateModule, CompanyModule, DashboardModule, StorageModule |
| 3 | 2026-07-27 | Admin portal — auth, dashboard, properties, estates, customers |
| 4 | 2026-07-27 | Public website — homepage, properties, property detail, inquiry, estates, about, contact |
| 5 | 2026-07-27 | @nhgp/assets logo (real PNGs), EmailModule, Customer auth, ReservationModule, Admin reservations, Customer account section |
| 6 | 2026-07-27 | Favorites API + toggle button, Profile editing, Employee management (API + admin UI), Inquiries page, Terms & Privacy pages, logo fix, inquiry email wired |
| 7 | 2026-07-27 | Branding fix (Ndukego Homes Gallery everywhere), design system (dark theme #050505 + crimson #C1121F), font system (Fraunces/DM Sans/JetBrains Mono) |
| 8 | 2026-07-27 | Theme toggle (light/dark/system) on web + admin, CSS variable token system, ThemeProvider + ThemeToggle components, Company settings page built |
| 9 | 2026-07-27 | Admin sidebar CSS variable tokens (light/dark), Staff password change page, Reports page (stats + pipeline + geographic breakdown), Documents placeholder, About page built, dark-mode badge fixes across all pages, property/estates/properties page theme fixes |
| 10 | 2026-07-30 | API crash fix (employee.service.ts calculatePagination), web login/register logo fix, company identity realignment (Ndukego Investments & Properties Ltd), premium navbar rebuild (glassmorphism + corporate links + Services dropdown), corporate footer rebuild (4-col, correct contacts), homepage rebuild (premium dark hero + Framer Motion + 4 service cards + process steps + trust section), framer-motion + @react-three/fiber + drei + three installed |
| 10b | 2026-07-30 | Full light-theme overhaul of public web: removed dark mode entirely (forcedTheme="light"), global morphing crimson gradient (position:fixed, gradient-morph 24s keyframe), global 60px grid overlay, 3px thin crimson scrollbar, navbar centered-logo+hamburger redesign, footer crimson CTA band + 4-col section, homepage all sections converted to transparent/semi-transparent backgrounds |
| 11 | 2026-07-30 | Admin portal redesign: globals.css (light-only, always-dark sidebar tokens, crimson scrollbar), ThemeProvider (forcedTheme="light"), sidebar (premium dark, grouped nav, correct branding, crimson active states), header (ThemeToggle removed, clean minimal), login (split-screen dark brand panel + white form), metadata title updated; all 7 web service/project/insight pages created with AnimateIn, full content, crimson design system |
| 12 | 2026-07-30 | Stage 1: Hard delete for properties + estates (API + admin confirmation modal with name-typing), Stage 2: Estate badge on property cards (indigo chip), Stage 3: Per-estate site plan management in admin (site plan upload, building type editor with color picker + image upload), API proxy route (/api/proxy/[...path]/route.ts), EstateSitePlan component now accepts sitePlanUrl+buildingTypes props, Contact page rebuild (Google Maps embed + updated contact details + no CTA), FooterCtaBand extracted as client component (hidden on /contact), Prisma schema + db push for buildingTypesConfig JSON field on Estate |
| 13 | 2026-07-31 | Amenities toggle system (Property + Estate): comprehensive list (5 categories, 30+ items) stored as String[] in DB — admin toggles, web display as emoji grid; Default sales agent card on property detail pages (profile photo /default-prop-profile.jpg, contact details); Per-property/estate Google Maps URL field in admin (coordinates auto-extracted from URL, stored to latitude/longitude, map embed shown on detail pages); Properties listing Map View (Leaflet + OpenStreetMap, red marker pins, click popup with property info, navigate to detail page); Schema updated (amenities + mapUrl on Property + Estate), db push completed, ArrowRight import fix in footer.tsx |
