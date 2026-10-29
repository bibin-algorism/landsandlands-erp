# Pending Features

Work not yet done in Lands & Lands ERP 5.0. Completed work is tracked in [completed.md](completed.md).

**How to use**
- Pick a task: put your name in **Owner** and set **Status** to `In progress`.
- Finished: move the row to `completed.md` (keep the ID) with the date and a reference.
- New work: add a row with the next ID for that area.
- **Status:** `Not started` · `In progress` · `Blocked` · `Decision needed` (cannot start until the question in Notes is answered).
- **Priority:** `P1` needed for the 1 March launch or fixes a security/data risk · `P2` launch scope, lower risk · `P3` after launch or nice to have.

_Last updated: 29 Oct 2026_

---

## Decisions needed (unblock other tasks)

| ID | Question | Blocks | Source |
| :--- | :--- | :--- | :--- |
| DEC-01 | What happens when a change request misses its 24-hour window: reminder only, escalation to the MD, or auto-close? | EMP-P05 | BRD §16, FR-22 |
| DEC-02 | After HR approves a resignation or a Vertical Head's termination request, is MD approval still needed? Can HR reject them, with a reason? | EMP-P01, EMP-P02 | BRD §16 Exit |
| DEC-03 | Does a resignation start a notice period? How long? | EMP-P01 | BRD §16 Exit |
| DEC-04 | Can a Vertical Head request termination only for their reporting line, or anyone in their vertical? | EMP-P02 | BRD §16 Exit |
| DEC-05 | Is every access by another module to employee data logged in the audit trail? | EMP-P07 | BRD §16 |
| DEC-06 | Notification channels: in-app only, or also email / SMS / WhatsApp? | NTF-P01 | BRD §16 |
| DEC-07 | Driving licence is mandatory: what for employees without one? Does everyone get an official phone and email? | — | BRD §16 Onboarding |
| DEC-08 | Employee ID characters: random or sequential, upper case only? (currently random hex) | — | BRD §16 |
| DEC-09 | What can the Management (Administration) team and team leads without a VH role see? | — | BRD §16 Access |
| DEC-10 | Should UIDAI rules require storing a masked Aadhaar copy? (confirm with compliance) | FIL-P01 | DPDP Act / UIDAI |

## Employee module

| ID | Task | BRD | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| EMP-P01 | Resignation request by employee with mandatory reason, sent to HR | FR-35, BRQ-18 | P1 | Decision needed | | DEC-02, DEC-03 |
| EMP-P02 | Termination request by Vertical Head for their team, HR approval, employee notified | FR-36, FR-37, BRQ-19 | P1 | Decision needed | | DEC-02, DEC-04 |
| EMP-P03 | HR marks termination (exit date + reason), MD approves; status Terminated, moves to Terminated list, ERP access disabled permanently | FR-29–FR-33, BR-15 | P1 | Not started | | Exit date/reason fields exist; `statusChangedOn` must be set |
| EMP-P04 | Reactivate a returning employee, keeping previous exit date and reason as history | FR-34, BRQ-17 | P2 | Not started | | |
| EMP-P05 | Scheduled job for overdue change requests (reminder / escalation) | FR-22 | P2 | Decision needed | | DEC-01. Overdue flag already exists |
| EMP-P06 | Notify HR on day 29 when the previous-organisation document is still missing | FR-08 | P1 | Not started | | Needs a scheduler + NTF-P01 |
| EMP-P07 | Share employee data with other modules via an exported interface (live, no copies) | FR-26–FR-28, BR-18 | P1 | Not started | | Needed by Ticket, Property, Finance. DEC-05 |
| EMP-P08 | System Data: password reset requests, tickets handled, properties handled, referrals | FR-15, BRD §8.6 | P2 | Not started | | Needs interfaces from Auth, Ticket, Property, People |
| EMP-P09 | Employee list: server-side search, pagination, Vertical / Role / Job type filters, Export | — | P2 | Not started | | Filter and Export buttons are placeholders today |
| EMP-P10 | Store pay as whole paise (Int) instead of Decimal, per project money convention | — | P3 | Not started | | Needs a data migration |
| EMP-P11 | Database unique constraint on Aadhaar number (today checked in code only) | BRD §14 | P2 | Not started | | |
| EMP-P12 | Browser QA pass of onboarding, edit, change-request and review screens with HR, VH, employee and MD logins | — | P1 | Not started | | Backend covered by API tests; screens not yet clicked through |
| EMP-P13 | Existing employees created before 28 Oct: recalculate login role from vertical/role; backfill created-by where known | — | P3 | Not started | | One-off data fix |
| EMP-P14 | Warn about unsaved edits when leaving the edit page through the sidebar or browser Back (needs the data router, `createBrowserRouter`) | — | P3 | Not started | | Cancel button and tab close/reload already warn |
| EMP-P15 | Document verification ("Checked against original") — record who verified each document and when | — | P3 | Decision needed | | Shown in Figma; not in the BRD data model |
| EMP-P16 | Restyle "Request a change" (employee) to match the new edit layout | — | P3 | Not started | | |
| EMP-P17 | How HR changes restricted data (pay revision, bank details, Aadhaar/licence) now that the edit page locks it | BR-08, BR-13 | P2 | Decision needed | | API supports it; no screen does |

## Notifications & outbox

| ID | Task | BRD | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| NTF-P01 | Notification module: templates, in-app notifications, delivery from domain events | FR-23, FR-42, BRQ-22 | P1 | Decision needed | | DEC-06 |
| NTF-P02 | Outbox relay: poll `outbox_events`, dispatch, mark processed, retry | — | P1 | Not started | | Events are written today but never processed |

## Files & storage

| ID | Task | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FIL-P01 | Google Cloud Storage driver (private bucket, asia-south1, versioning), selected by `STORAGE_DRIVER` | P1 | Not started | | Local disk does not survive Cloud Run restarts |
| FIL-P02 | Daily cleanup of uploads never attached to a record (`PENDING` > 24 h) | P3 | Not started | | |
| FIL-P03 | GCS emulator in `docker-compose.yml` so local matches production | P3 | Not started | | |

## Client module

| ID | Task | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| CLI-P01 | Review the Client module against `docs/brd/client-module-v1-brd.md` | P2 | Not started | | Not yet audited the way the Employee module was |
| CLI-P02 | Move client controller to `SessionGuard` (currently accepts password-change tokens) | P1 | Not started | | Security |
| CLI-P03 | Stop reading the `employee` table directly; use an Employee module interface | P2 | Not started | | Modular-monolith rule; see EMP-P07 |
| CLI-P04 | `GET /clients/:id/properties` contract for the Property module | P2 | Blocked | | Waits for the Property module |

## Platform & infrastructure

| ID | Task | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PLT-P01 | Move auth admin routes and remaining controllers to `SessionGuard` / `@Roles` | P1 | Not started | | Remove per-controller token parsing |
| PLT-P02 | Fix Jest: test suites fail on ESM imports before running any test | P1 | Not started | | No automated tests run today |
| PLT-P03 | Automated API tests in the repo for employee access, edit and change requests | P2 | Not started | | Depends on PLT-P02; current checks were run ad hoc |
| PLT-P04 | Consistent API response envelope `{ data, meta, errors }` | P2 | Not started | | Project convention, not applied yet |
| PLT-P05 | Decide Express vs Fastify (context doc says Fastify; app runs Express) and align docs or code | P3 | Not started | | |
| PLT-P06 | Update GCP deployment plan: region asia-south1, Cloud Run migrations job using `pnpm db:deploy` | P2 | Not started | | `docs/deployment_plan_gcp.md` uses us-central1 |
| PLT-P07 | Stop tracking generated Prisma client in `apps/api/prisma/generated/` | P3 | Not started | | Stale build output in git |
| PLT-P08 | Code-split the web bundle (build warns about chunks > 500 kB) | P3 | Not started | | |

## ERP modules not started

| ID | Module | Priority | Status | Owner | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| MOD-P01 | People (master data, relationships, referrals) | P1 | Not started | | Relationship with Employee and Client needs an ADR |
| MOD-P02 | Property (JSONB attributes, people-property links) | P1 | Not started | | Needs Metadata |
| MOD-P03 | Metadata (field definitions, form schemas, validation) | P1 | Not started | | |
| MOD-P04 | Ticket (eight verticals) | P1 | Not started | | Which verticals raise tickets is an open BRD question |
| MOD-P05 | Task management (polymorphic `related_type` / `related_id`) | P1 | Not started | | |
| MOD-P06 | Finance (invoices, payments, append-only) | P1 | Not started | | |
| MOD-P07 | Human Resource module (outputs from Employee master data) | P2 | Not started | | Which outputs is an open BRD question |
| MOD-P08 | Scoring engine (outbox-triggered) | P3 | Not started | | |
| MOD-P09 | AI document extraction with human review (drafts only) | P3 | Not started | | |

## Employee module — future scope (BRD §15, after launch)

Attendance · KPI/KRA · review mapping · health records · PF and statutory calculations · insurance and benefits · employee score · incentives · family details · asset list · enhanced system data · PAN and profile photo · profile progress indicator.
