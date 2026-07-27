# NHGP — Project Instructions for Claude Code

This file is read automatically at the start of every Claude Code session in this repo.
It should stay short and durable — conventions and direction, not the business spec itself
(that lives in `docs/spec/`).

## Before doing anything

Read `docs/spec/` for the business specification (EAS + PRD) and
`docs/spec/nhgp-claude-code-kickoff-brief.md` for build philosophy, phasing, and role split.
Read `PROGRESS.md` and `SETUP.md` at the repo root if they exist, to see what's already built
and what's pending from the user.

## Project structure

Existing turborepo layout — build within this structure, don't restructure without a clear
reason:

```
apps/
  admin/     — staff/admin portal
  web/       — public-facing site
  api/       — backend API
packages/
  ...        — shared packages
```

## Design direction

The product is an enterprise real estate platform. The brand promise is **trust,
transparency, and professionalism** — the design should reinforce that, not undercut it.

- **Feel:** clean, confident, modern enterprise SaaS — think Linear, Stripe Dashboard, or
  Notion's admin views. Not a generic bootstrap template, not flashy or overly decorative.
- **Component library:** use shadcn/ui with Tailwind CSS for both the admin and public sites,
  unless the existing repo already has a different library in place — check `package.json`
  first and follow what's already there before introducing a new one.
- **Public website (`apps/web`):** warm but professional — property photography should be the
  visual focus; UI chrome should stay out of the way. Clear typography, generous whitespace,
  strong calls-to-action for inquiries/reservations.
- **Admin portal (`apps/admin`):** dense, functional, fast to scan — tables, filters, status
  badges, clear data hierarchy. Optimize for staff doing repetitive tasks quickly, not for
  visual flourish.
- **Color/status conventions:** property status (Draft, Pending, Approved, Published,
  Reserved, Sold, Archived, Rejected) should have consistent, distinguishable color coding
  used everywhere it appears — badges, filters, timeline views.
- Avoid: stock-photo-style hero sections, generic AI-generated-looking layouts, unnecessary
  animation, inconsistent spacing.

## Coding conventions

- Follow whatever framework/tooling is already established in the existing repo — inspect
  `package.json` and existing code before assuming a stack.
- Keep changes scoped to what was asked. Don't refactor unrelated code in the same pass.
- Every session should end with working, committed code — don't leave the repo in a broken
  state between sessions.
- Update `PROGRESS.md` at the end of each session: what was built, what's stubbed, what's
  next.
- Update `SETUP.md` whenever a new external dependency (API key, service account, etc.) is
  needed — be specific about what the user needs to go do.

## Build order

Follow the phasing in the kickoff brief: full-spec backend/schema design, phased frontend
feature rollout. Finish one working vertical slice (e.g. Property: schema → API → one working
admin page) before starting the next feature. Don't build multiple capabilities in parallel.
