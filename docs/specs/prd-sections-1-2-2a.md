# NHGP — Product Requirements Document (PRD)
## Version 1.0 — Sections 1, 2, and 2A

> **Status note:** This is a partial PRD. Sections 1 (Vision & Objectives), 2 (User Personas &
> Stakeholders), and 2A (Business Capabilities) are complete and included below. Sections 3–12
> (Functional Requirements, Business Workflows, User Stories, Non-Functional Requirements,
> AI Functional Requirements, Reporting & Analytics, Integration Requirements, MVP vs Roadmap,
> Testing Strategy, Governance) are still being generated and will be added to this docs/spec
> folder as separate files when ready. Do not assume this document is complete.

---

## Section 1 — Product Vision & Business Objectives

### Product Overview

Ndukego Homes Gallery is an enterprise real estate management platform enabling Ndukego
Investment & Properties Limited to manage the complete lifecycle of its real estate
business — from property acquisition through customer ownership — while providing customers
with a trusted, transparent, and professional experience.

The platform consists of: Public Website, Customer Portal, Employee Portal, Administrative
Portal, Executive Dashboard, AI Services, Future Mobile Applications.

Internally it functions as a comprehensive Real Estate Operating System (REOS).

### Vision Statement

To become Nigeria's most trusted, transparent, and technologically advanced real estate
platform by combining exceptional customer experience with enterprise-grade operational
excellence.

### Mission Statement

Simplify property discovery. Improve transparency. Digitize internal operations. Protect
customer trust. Increase operational efficiency. Support long-term business growth.
Establish a scalable digital foundation for Ndukego Investment & Properties.

### Product Goals

1. **Customer Trust** — every advertised property verified, accurate information,
   professional communication, transparent transactions.
2. **Operational Efficiency** — faster, more consistent, better documented, easier-to-audit
   internal processes; reduce manual/paper work.
3. **Centralized Information** — one shared source of truth across departments; no
   duplication across spreadsheets, messaging apps, paper records.
4. **Scalability** — support growth in employees, customers, properties, estates,
   developments, regions, subsidiaries without major redesign.
5. **Decision Support** — real-time operational and financial data for executives; evolve
   into an operational intelligence system.

### Target Users (summary — full detail in Section 2)

Public Visitors, Prospective Customers, Existing Customers, Sales Team, Property Managers,
Executives, Administrators.

### Business Value Proposition

Verified Property Listings, Transparent Business Processes, Enterprise Operations
(integrated business functions in one system), AI-Augmented Productivity (assists without
replacing human decision-making), Long-Term Customer Relationships.

### Business Scope

**Included in Initial Scope (MVP):** Public property website, customer registration, property
catalog, estate management, development management, reservation management, employee
management, administrative portal, executive dashboard, document management, AI knowledge
assistant, search, notifications, reporting, role-based access.

**Deferred to Future Releases:** Mobile applications, online payments, GIS analytics, VR
property tours, IoT smart estate integration, advanced forecasting, AI property valuation,
government API integrations, partner portals, vendor portals, multi-company management.

### Product Principles

Every feature should satisfy at least one of: increase trust, improve transparency, reduce
manual work, improve data quality, increase operational visibility, improve customer
experience, support scalability. Features without measurable value should not be implemented.

### Success Metrics

- **Customer:** satisfaction, inquiry response time, reservation completion rate
- **Sales:** lead conversion rate, sales growth, reservation approval time
- **Operations:** property publication time, inspection completion rate, employee
  productivity
- **Executive:** revenue growth, inventory utilization, development progress, business
  expansion
- **Technical:** system uptime, page load speed, error rate, security incidents, backup
  success rate

### Product Constraints

Prioritize security. Maintain data integrity. Protect confidential information. Operate
reliably. Support future expansion. Avoid unnecessary complexity in the MVP.

### Risks

Poor data quality, incomplete property verification, scope expansion without prioritization,
security threats, adoption resistance, infrastructure failures.

### Product Roadmap

- **Phase 1 — Foundation:** Public website, admin platform, authentication, property
  management, customer management
- **Phase 2 — Business Operations:** Reservations, sales, documents, employee workflows,
  reporting
- **Phase 3 — Intelligence:** Executive dashboards, AI assistants, advanced analytics,
  automation
- **Phase 4 — Expansion:** Mobile apps, GIS, smart estates, partner ecosystem, multi-company
  support

### Non-Functional Requirements (high-level — detailed spec pending in Section 6)

Secure, reliable, responsive, maintainable, accessible, scalable, auditable, performant.

### Product Governance

Changes evaluated on: business value, technical feasibility, user impact, security
implications, maintenance cost, alignment with company strategy.

---

## Section 2 — User Personas & Stakeholders

### Stakeholder Categories

Customers → Employees → Management → External Partners

### User Classification

Public Visitors, Customers, Employees, Management, Administrators, External Stakeholders

### Persona 1 — Public Visitor
Not yet registered. Can: browse listings, search, view developments, read company info,
submit inquiries, request callbacks. Cannot: view private info, reserve, access customer
portal, download restricted documents.

### Persona 2 — Registered Customer
Authenticated account. Can: manage profile, view owned properties, view reservation status,
access approved documents, view appointment history, receive notifications. Cannot: modify
company records, approve sales, publish properties, manage employees.

### Persona 3 — Sales Executive
Responsible for customer acquisition/conversion: manage leads, contact prospects, schedule
inspections, create reservations, update CRM, recommend properties. Dashboard focus: today's
appointments, new leads, active reservations, conversion pipeline, sales targets.

### Persona 4 — Property Manager
Maintains property inventory: create property records, update availability, upload media,
verify listing completeness, archive sold properties, coordinate inspections. Dashboard
focus: available inventory, draft listings, missing documentation, media quality, publication
status.

### Persona 5 — Development Manager
Monitors estate/development progress: track construction, monitor infrastructure, coordinate
inspections, manage milestones, record progress.

### Persona 6 — Customer Service Officer
Maintains post-contact customer relationships: respond to inquiries, resolve issues, schedule
appointments, manage communications, follow up.

### Persona 7 — Human Resources Officer
Employee administration: onboarding, attendance, performance records, leave management,
internal communications.

### Persona 8 — Finance Officer
**Note:** Online payment processing is intentionally outside the MVP — transactions occur
physically at company offices for legal, regulatory, and trust reasons. This role focuses on
recording/auditing, not processing online payments. Responsibilities: record confirmed office
payments, generate receipts, maintain payment history, track outstanding balances, produce
financial reports, reconcile transactions.

### Persona 9 — Executive Leadership
Managing Director, CEO, Executive Directors. Responsibilities: strategic oversight, revenue
monitoring, business growth, investment planning, operational performance, risk management.
Should rarely need operational screens.

### Persona 10 — System Administrator
Platform maintenance: user management, roles, permissions, security, configuration, audit
logs, system monitoring.

### Persona 11 — Company Auditor
Compliance/accountability: review audit logs, inspect approval history, verify document
changes, investigate incidents, produce compliance reports. Broad visibility, very limited
editing.

### Persona 12 — Marketing Manager
Homepage content, campaigns, blog articles, SEO, testimonials, social media assets.

### Persona 13 — AI Assistant (system actor)
Answering customer questions, assisting employees, searching knowledge, recommending
properties, drafting communications, summarizing reports. **The AI never performs
irreversible business actions without human approval.**

### Future Personas (reserved, not yet built)
Contractors, Surveyors, Legal advisors, Architects, Government officials, Partner agencies,
Investors, Estate managers, Facility managers, Vendors.

### Stakeholder Responsibility Matrix

| Persona | Reads | Creates | Updates | Approves | Administers |
|---|---|---|---|---|---|
| Visitor | ✅ | Inquiry | ❌ | ❌ | ❌ |
| Customer | ✅ Own Data | Requests | Own Profile | ❌ | ❌ |
| Sales Executive | ✅ | Leads, Reservations | CRM | ❌ | ❌ |
| Property Manager | ✅ | Properties | Listings | Publish Workflow | ❌ |
| Development Manager | ✅ | Milestones | Progress | ❌ | ❌ |
| Customer Service | ✅ | Support Cases | Communications | ❌ | ❌ |
| Finance Officer | ✅ | Payment Records | Financial Data | Receipt Confirmation | ❌ |
| Executive | ✅ | Strategic Notes | Executive Decisions | Business Decisions | ❌ |
| System Administrator | ✅ | Users | Configuration | Security Changes | ✅ |
| Auditor | ✅ | Audit Reports | Findings | Compliance Reports | ❌ |
| Marketing Manager | ✅ | Campaigns | Content | Publication | ❌ |
| AI Assistant | Contextual | Drafts | Suggestions | ❌ | ❌ |

### Design Implications

Every persona influences: navigation, dashboard layout, permission model, notifications, AI
interactions, reporting, workflows, mobile experience. No feature should exist without a
clearly identified primary persona.

---

## Section 2A — Business Capabilities

### Capability Map (13 primary capabilities)

1. Property Portfolio Management
2. Customer Relationship Management (CRM)
3. Sales & Reservation Management
4. Estate & Development Management
5. Document & Records Management
6. Employee & Workforce Management
7. Inspection & Site Visit Management
8. Financial Recording & Receipts
9. Communication & Notifications
10. Executive Intelligence & Analytics
11. AI & Knowledge Services
12. Security, Identity & Compliance
13. Platform Administration

### Capability 1 — Property Portfolio Management
Registration, categorization, availability, media, pricing, publishing, status tracking,
search, archival. Users: Property Managers, Sales Team, Executives, Customers, AI Assistant.
Domains: Property, Plot, Building, Unit, Property Media.

### Capability 2 — CRM
Customer registration, profiles, inquiry management, lead management, communication history,
lifecycle, relationship tracking. Users: Sales Executives, Customer Service, Executives.
Domains: Customer, Inquiry, Lead, Communication.

### Capability 3 — Sales & Reservation Management
Reservations, approvals, sales tracking, purchase workflow, payment recording, receipts,
expiration. Users: Sales Team, Finance, Customers. Domains: Reservation, Sale, Payment
Record, Receipt.

### Capability 4 — Estate & Development Management
Estate registration, development phases, infrastructure tracking, construction progress,
amenities, mapping. Domains: Estate, Development, Infrastructure, Phase.

### Capability 5 — Document & Records Management
Storage, version control, classification, approval, retrieval, audit history. Domains:
Document, Folder, Category, Version. Supported documents: Survey Plans, C of O, Deeds,
Allocation Letters, Inspection Reports, Valuation Reports, Receipts, Contracts.

### Capability 6 — Employee & Workforce Management
Employee profiles, departments, roles, attendance (future), performance (future),
organizational hierarchy. Domains: Employee, Department, Position, Role.

### Capability 7 — Inspection & Site Visit Management
Site visit scheduling, inspector assignments, reports, photographs, findings, customer
appointments. Domains: Inspection, Appointment, Inspector, Inspection Report.

### Capability 8 — Financial Recording & Receipts
**Note:** does not process online payments — payments completed physically at company
offices; platform records/manages transactions after confirmation. Domains: Payment Record,
Receipt, Ledger Entry.

### Capability 9 — Communication & Notifications
Email, SMS, in-app notifications, appointment reminders, reservation updates, internal
announcements. Domains: Notification, Message, Template, Campaign.

### Capability 10 — Executive Intelligence & Analytics
KPI dashboards, reports, forecasting (future), operational metrics, executive summaries.
Domains: Dashboard, Report, KPI, Metric.

### Capability 11 — AI & Knowledge Services
Customer assistant, employee assistant, knowledge search, report summarization, property
recommendations, draft generation. **Guiding principle: AI may recommend and assist but must
never execute irreversible business actions without human approval.** Domains: Knowledge
Base, AI Conversation, AI Prompt, AI Recommendation.

### Capability 12 — Security, Identity & Compliance
Authentication, authorization, MFA, RBAC, audit logging, encryption, session management,
compliance monitoring. Domains: User, Session, Permission, Role, Audit Log.

### Capability 13 — Platform Administration
User administration, system configuration, feature flags, backup management, monitoring,
maintenance, platform health. Domains: Configuration, Feature Flag, Backup, System Health.

### MVP Capability Prioritization

- **Phase 1 (Core MVP):** Property Portfolio Management, CRM, Sales & Reservation
  Management, Estate & Development Management, Security/Identity/Compliance, Platform
  Administration
- **Phase 2 (Operational Maturity):** Employee & Workforce Management, Document & Records
  Management, Inspection & Site Visit Management, Financial Recording & Receipts,
  Communication & Notifications
- **Phase 3 (Business Intelligence):** Executive Intelligence & Analytics, AI & Knowledge
  Services
- **Phase 4 (Future Growth):** Mobile Applications, GIS & Interactive Mapping, Smart Estate
  Integrations, Government API Integrations, Vendor & Partner Portals, Multi-company Support,
  Predictive Analytics
