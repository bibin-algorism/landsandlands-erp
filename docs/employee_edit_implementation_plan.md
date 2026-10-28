# Employee Edit — Implementation Plan

**Source:** BRD Employee Module v0.1 — §8.7, §9.2–9.3, §9.6, §10.2–10.3, §10.6, BR-01, BR-08, BR-11, BR-13, BR-14, BR-16
**Status:** Implemented · 28 Oct 2026 (phases 0–3)

---

## 1. What the BRD requires

Employee data changes in exactly two ways. Both keep the old value as history and record who did what (BRQ-11, BRQ-20, FR-25, FR-40).

| | HR direct edit | Employee change request |
| :--- | :--- | :--- |
| Who | HR, on any **other** employee (FR-24) | The employee, on **their own** record only (FR-16) |
| Takes effect | Immediately | Only after approval (FR-20) |
| HR's own record | Not allowed — HR raises a request (BR-16) | Approved by the **MD** (FR-18) |
| Proof | — | New value plus proof where the field needs it (FR-17) |
| Workflow | — | HR approves, queries (named fields + reason) or rejects (reason); a query returns to the employee until approved or rejected (FR-19, FR-21) |
| Time limit | — | 24 h for HR's review and for the employee's reply; overdue requests are flagged (FR-22) |
| Notifications | — | Both sides at every step (FR-23) |

**Never editable:** Employee ID (BR-01), System Data and metadata (BR-11), employment status, exit date and exit reason (exit flow).

**Dated history entries, never overwritten (BR-08):** vertical → transfer history; role → promotion history; take-home pay → pay-revision history with effective date; appraisal → appraisal history.

## 2. Decisions

| # | Question (BRD §16) | Decision |
| :--- | :--- | :--- |
| 1 | Which fields need proof? | Identity (name, date of birth, father's name, Aadhaar, driving licence), address and bank details. No proof for phone numbers, emails, gender, blood group, marital status or emergency contacts. Document images and education documents are their own proof. |
| 2 | What happens when the 24-hour limit is missed? | Overdue requests are flagged in the queue and an outbox event is written for a reminder. Escalation or auto-closing is not implemented until decided. |
| 3 | Who can view field history? | HR, MD and COO: all fields. Employee: all of their own fields. Vertical Head: non-restricted fields of their team. |
| 4 | Is a reason required for an HR direct edit? | Optional. |
| 5 | Who approves HR's own change requests? | The MD in the ERP; System Admin approval stays manual. |
| 6 | Restricted values (pay, Aadhaar) in history? | Stored in full and protected by access rules: only viewers allowed to see restricted data can see their history. |

## 3. Design

### 3.1 Editable-field catalogue

One catalogue (`apps/api/src/modules/employee/fields/employee-fields.ts`) defines for every editable field: key, label, BRD group, sensitivity, who may change it (HR direct edit and/or change request), whether proof is required, value type, validation, how it is read and written, and which history entry it adds. The API validates and applies every change through it, and serves it to the web app (`GET /employees/:id/editable-fields`), which renders editors by type — so the rules exist in one place.

Collections are single fields with structured values: emergency contacts, education (highest qualification + documents), Aadhaar images, driving-licence images, probation, take-home pay (with effective date) and appraisal.

### 3.2 Field history

Every change writes one `audit_logs` row: `changes` holds `[{ field, old, new }]`; `metadata` holds `changeSource` (`DIRECT_HR_EDIT` / `APPROVED_CHANGE_REQUEST`), `changeRequestId` and `approvedBy` (BRD §8.7 #7–12). A field's history is a filtered read of the audit trail; restricted fields are filtered out for viewers without restricted access.

### 3.3 Concurrency

- Direct edit sends the record's `updatedAt`; a stale save returns 409.
- A change request stores each field's current value when raised; approval is blocked (409) if any value has changed since.

### 3.4 Access rules (prerequisite)

| Viewer | Own record | Team below them | All active | Restricted data | Terminated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Employee | ✓ | — | — | own only | — |
| Vertical Head | ✓ | ✓ (whole reporting line) | — | own only | — |
| HR / COO / MD | ✓ | ✓ | ✓ | ✓ | HR and MD only |

Restricted (BR-13): Aadhaar, driving licence, bank account, pay and appraisal.

## 4. Data model changes

- `Employee`: `createdById`, `lastUpdatedById` (BRD §8.7 #2, #5).
- `StoredFile`: one row per upload — key, file name, type, size, SHA-256, uploaded by/at, `PENDING` → `ATTACHED` (BRD §8.7 #13).
- `EmployeeChangeRequest`: `routedTo` (`HR` / `MD`), `requestedById`, `employeeReplyDueDate`, `submittedAt`, `resolvedAt`, `resolvedById`; status adds `CANCELLED`.
- `ChangeRequestField`: values stored as JSON, `isQueried`, `proofFileKey`.

## 5. API

| Endpoint | Who | Purpose |
| :--- | :--- | :--- |
| `GET /employees` | any (scoped) | List by access rules; `status=TERMINATED` for HR/MD |
| `GET /employees/:id` | any (scoped) | Detail, restricted data removed where not allowed |
| `GET /employees/:id/documents/:document` | scoped | Stream a document image; every view is audited |
| `GET /employees/:id/editable-fields` | HR, self | Catalogue + current values for the edit/request screens |
| `PATCH /employees/:id` | HR, not self | Direct edit `{ changes, reason?, expectedUpdatedAt }` |
| `GET /employees/:id/history?field=` | scoped | Field and action history |
| `POST /employees/me/change-requests` | employee | Raise a request |
| `GET /employees/me/change-requests` | employee | Own requests |
| `PUT /employees/me/change-requests/:id` | employee | Reply to a query (queried fields only) |
| `POST /employees/me/change-requests/:id/cancel` | employee | Withdraw an open request |
| `GET /employees/change-requests?status=&overdue=` | HR; MD for HR-own | Review queue |
| `GET /employees/change-requests/:id` | approver | Request detail |
| `POST /employees/change-requests/:id/{approve,query,reject}` | approver | Decide; query and reject need a reason |

Every step writes an audit row and an outbox event (`employee.updated`, `employee.change_request.*`) in the same transaction; notifications are delivered once the Notification module and outbox relay exist.

## 6. Screens

1. **Employee details** — reads the real API shape, six BRD groups, restricted sections only when returned, document viewer, history drawer.
2. **HR edit** (`/employees/:employeeId/edit`) — grouped editors for changed fields only, review dialog (old → new, optional reason, pay effective date), 409 handling. HR opening their own record is redirected to Request a change.
3. **Request a change** (`/my-profile/change-requests/new`) — pick fields, see current value, enter new value, attach proof where required.
4. **My requests** (`/my-profile/change-requests`) — status, query reason, reply and resubmit, withdraw.
5. **Change-request queue** (`/employees/change-requests`) — overdue badges; detail with current vs proposed vs proof; approve / query / reject.

## 7. Phases

| Phase | Scope |
| :--- | :--- |
| 0. Prerequisites | Session guard and access rules on all employee reads; list scoping and terminated list; `files` table and audited document download; details page fixed |
| 1. HR direct edit | Field catalogue, `PATCH /employees/:id`, BR-08 history entries, system-role recalculation, history endpoint and drawer, edit page |
| 2. Change requests | Raise, review, query loop, approve/reject/cancel, MD routing, employee and HR screens |
| 3. Time limits and notifications | Overdue flags and filter, outbox events at every step |

## 8. Not in scope

Scheduled reminders and escalation (decision 2), Google Cloud Storage driver, cleanup of unattached uploads, the exit flow (resignation/termination), and the Notification module itself.

## 9. Where it lives

| Concern | Location |
| :--- | :--- |
| Session guard and `@Roles` | `apps/api/src/common/guards/session.guard.ts`, `roles.decorator.ts` |
| Access rules | `apps/api/src/modules/employee/access/employee-access.service.ts` |
| Detail view and redaction | `apps/api/src/modules/employee/employee-view.ts` |
| Field catalogue and value rules | `apps/api/src/modules/employee/fields/` |
| Direct edit, apply engine, history | `apps/api/src/modules/employee/edit/employee-edit.service.ts` |
| Change requests | `apps/api/src/modules/employee/change-requests/` |
| Uploads (`stored_files`) | `apps/api/src/modules/files/files.service.ts` |
| Migration | `apps/api/prisma/migrations/20261028080000_employee_edit` |
| Screens | `apps/web/src/pages/employees/EmployeeDetailsPage.tsx`, `EmployeeEditPage.tsx`, `change-requests/` |
| Shared editors | `apps/web/src/components/employees/fields/`, `HistoryDrawer.tsx` |
| API requests | `bruno/Employee/`, `bruno/Files/` |

Adding an editable field means adding one entry to the catalogue; the API, the edit screen and the change-request screens pick it up from `GET /employees/:id/editable-fields`.

