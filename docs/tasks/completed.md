# Completed Features

What is built and working in Lands & Lands ERP 5.0. Open work is tracked in [pending.md](pending.md).

**How to update:** when a pending task is finished, move its row here under the right module, keep its ID, and add the date and a short reference (PR, doc or path).

_Last updated: 29 Oct 2026_

---

## Platform & infrastructure

| ID | Feature | Done | Reference |
| :--- | :--- | :--- | :--- |
| PLT-01 | Monorepo (pnpm + Turborepo), NestJS API, React + Vite web, shared package | 26 Sep 2026 | `README.md` |
| PLT-02 | Local PostgreSQL via Docker Compose | 26 Sep 2026 | `docker-compose.yml` |
| PLT-03 | Design system and dashboard layout | 2 Oct 2026 | `/design-system` |
| PLT-04 | API client with JWT interceptor and TanStack Query | 2 Oct 2026 | `docs/adr/api-client-architecture.md` |
| PLT-05 | Reusable `DataTable` component | 7 Oct 2026 | `docs/adr/custom-datatable-component.md` |
| PLT-06 | Single baseline migration; one-command DB setup (`pnpm db:setup`) and schema-change workflow (`pnpm db:migrate --name …`) | 28 Oct 2026 | `README.md` § Database |
| PLT-07 | Session guard: every employee/file route requires a session token; password-change tokens rejected; `@Roles(...)` | 28 Oct 2026 | `apps/api/src/common/guards/session.guard.ts` |

## Authentication

| ID | Feature | Done | Reference |
| :--- | :--- | :--- | :--- |
| AUTH-01 | Login with Employee Code and password; account lock after failed attempts | 3 Oct 2026 | `POST /auth/login` |
| AUTH-02 | Forced password change on first login (temporary password) | 3 Oct 2026 | `POST /auth/change-password` |
| AUTH-03 | Password reset request with reason, status indicator, admin approve/reject | 3 Oct 2026 | `/people/password-reset-requests` |
| AUTH-04 | Password history (no reuse) and auth activity log | 3 Oct 2026 | `auth_activity_logs` |
| AUTH-05 | Activity log and its outbox event written in one transaction | 27 Oct 2026 | `auth.service.ts` |

## Audit & files (cross-cutting)

| ID | Feature | Done | Reference |
| :--- | :--- | :--- | :--- |
| AUD-01 | Central append-only `audit_logs` table and `AuditService` for all modules (auth stays separate) | 27 Oct 2026 | `docs/adr/centralized-audit-log.md` |
| AUD-02 | Field-level change history stored in the audit trail (old → new, source, request, approver) | 28 Oct 2026 | BRD §8.7 #7–12 |
| FIL-01 | Document upload with content-type check (JPG/PNG/WEBP/PDF, 10 MB) on local disk | 28 Oct 2026 | `POST /files/employee-documents` |
| FIL-02 | `stored_files` record per upload (uploaded by/at, SHA-256); uploads attached to one record only | 28 Oct 2026 | BRD §8.7 #13 |

## Employee module

| ID | Feature | BRD | Done | Reference |
| :--- | :--- | :--- | :--- | :--- |
| EMP-01 | HR-only onboarding wizard (6 steps) capturing every Section 8 field | FR-01–FR-06, FR-09, FR-10 | 28 Oct 2026 | `/employees/new` |
| EMP-02 | Employee ID `LL-XXXXX`, generated and immutable | FR-02, BR-01 | 5 Oct 2026 | — |
| EMP-03 | Onboarding rules: 1–3 emergency contacts, front/back images, education docs up to highest qualification, previous-organisation conditions, pay split, reporting authority, duplicate Aadhaar/phone check | BR-03–BR-07, BR-09 | 28 Oct 2026 | `employee.service.ts` |
| EMP-04 | Second previous-organisation document: due date (14–30 days), incomplete flag, pending queue, submission | FR-07, BR-05 | 28 Oct 2026 | `GET /employees/onboarding/pending-documents` |
| EMP-05 | Server-generated temporary password shown once; system role derived from BRD role/vertical | — | 28 Oct 2026 | — |
| EMP-06 | Access rules: self / Vertical Head team (no restricted data) / HR-MD-COO all; terminated list HR + MD only | FR-11–FR-13, BRQ-14, BR-13 | 28 Oct 2026 | `employee-access.service.ts` |
| EMP-07 | Employee list with Active / Incomplete / Terminated tabs; no delete action | BRQ-14, BR-15 | 28 Oct 2026 | `/employees` |
| EMP-08 | Employee details grouped into BRD sections; restricted sections hidden by role | FR-14 | 28 Oct 2026 | `/employees/:id`, `/my-profile` |
| EMP-09 | Document viewing with access check; every view audited | BR-13, BRD §14 | 28 Oct 2026 | `GET /employees/:id/documents/:document` |
| EMP-10 | Created by / last updated by / onboarding completed metadata | BRD §8.7 #1–5 | 28 Oct 2026 | System data tab |
| EMP-11 | HR direct edit of any other employee (not own record), optimistic concurrency | FR-24, BR-14, BR-16 | 28 Oct 2026 | `/employees/:id/edit` |
| EMP-12 | Transfer, promotion, pay-revision and appraisal history entries | BR-08 | 28 Oct 2026 | — |
| EMP-13 | Field and action history drawer, filtered by viewer | BRQ-20, FR-38, FR-39 | 28 Oct 2026 | "View history" |
| EMP-14 | Employee change requests: raise with proof, HR approve / query / reject, reply loop, withdraw | FR-16–FR-21 | 28 Oct 2026 | `/my-profile/change-requests` |
| EMP-15 | HR's own requests routed to the MD; no one decides their own request | FR-18, BR-16 | 28 Oct 2026 | — |
| EMP-16 | 24-hour review/reply windows with overdue flag and filter | FR-22 | 28 Oct 2026 | `/employees/change-requests` |
| EMP-17 | Every change-request step audited and queued as an outbox event | FR-23 (event only), FR-25 | 28 Oct 2026 | `outbox_events` |
| EMP-18 | Details and edit pages in the Figma layout: summary card, "Show:" sections, Documents panel, inline edit with "Changed from", restricted fields locked, confirm / discard dialogs, saved toast with highlighted fields | FR-14, FR-24 | 29 Oct 2026 | `/employees/:id/edit` |
| EMP-19 | Approvals menu (Change requests, Password resets, Pending documents) with live counts; Pending documents screen to submit the missing previous-organisation document; Roles & access moved to Administration | FR-07, FR-18 | 29 Oct 2026 | `/approvals/*` |

## Client module

| ID | Feature | Done | Reference |
| :--- | :--- | :--- | :--- |
| CLI-01 | Create, list (pagination, PII masking by role), view and update clients | 6–7 Oct 2026 | `docs/brd/client-module-v1-brd.md` §5.1 |
| CLI-02 | Reassign primary relationship manager | 6 Oct 2026 | `PATCH /clients/:id/assign` |
| CLI-03 | Client create, update and RM reassignment audited (PAN/Aadhaar redacted) | 27 Oct 2026 | `client.service.ts` |
