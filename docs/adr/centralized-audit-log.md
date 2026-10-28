# Architectural Decision Record (ADR): Centralized Business Audit Log

**Status:** Accepted  
**Date:** 2026-10-27  
**Decision Makers:** Engineering Team

---

## Context & Problem Statement

Audit data was being written to per-module tables:

- `employee_audit_logs` (`EmployeeAuditLog`) — workflow actions, with a `performedById` FK to `Employee` and a Postgres `AuditActionType` enum.
- `employee_field_histories` (`EmployeeFieldHistory`) — per-field old/new values.
- The Client module wrote no audit trail at all.

With Property, Ticket, Task and Finance on the roadmap, this pattern would create one audit table per module, each with its own schema and enum. It also blocks the core people-centric views ("everything that happened to this client", "everything this user did today") without a UNION across N tables, and the `Employee` FK makes it impossible to record actions by the system or by non-employee users.

---

## Decision

All **business** audit events from every module are stored in a single append-only table, `audit_logs` (`AuditLog`), owned by the **Audit module** (`apps/api/src/modules/audit`).

| Column                    | Purpose                                                                  |
| :------------------------ | :----------------------------------------------------------------------- |
| `occurredAt`              | When the action happened                                                 |
| `actorType`               | `USER` or `SYSTEM`                                                       |
| `actorUserId`             | FK to `User` (not `Employee`); null for system actions                   |
| `action`                  | String, `<module>.<subject>.<verb>`, e.g. `client.primary_rm.reassigned` |
| `entityType` / `entityId` | The record the action is about (`EMPLOYEE`, `CLIENT`, ...)               |
| `reason`                  | Optional human-entered justification                                     |
| `changes`                 | `[{ field, old, new }]` — replaces the separate field-history table      |
| `metadata`                | Free-form context (e.g. `changeRequestId`)                               |

### Writing audit entries

Modules import `AuditModule` and call `AuditService.record(tx, entry)` **inside their own Prisma transaction**, so the audit row commits or rolls back together with the business change. Modules never write to `audit_logs` directly.

```ts
await this.prisma.$transaction(async (tx) => {
  const updated = await tx.client.update({ ... });
  await this.auditService.record(tx, {
    actorUserId: user.userId,
    action: AuditAction.CLIENT_UPDATED,
    entityType: AuditEntityType.CLIENT,
    entityId: updated.id,
    changes: this.auditService.diff(before, fields, ['panNumber', 'aadhaarNumber']),
  });
});
```

### Conventions

- **Action names** live in `packages/shared/src/audit.ts` (`AuditAction`, `AuditEntityType`), not in a database enum, so adding an action needs no migration.
- **PII** (PAN, Aadhaar, etc.) must be redacted in `changes` using the `redactFields` argument of `AuditService.diff`.
- **Append-only:** `AuditService` exposes no update/delete. The `actorUserId` FK is `ON DELETE RESTRICT` so audit history cannot be silently lost.

### Out of scope

- **Auth/security events** stay in `auth_activity_logs`. They have a different shape (IP, user agent, unknown identifiers on failed login), much higher volume and a different retention policy.
- **`outbox_events`** is a delivery queue for async processing, not an audit trail.

---

## Alternatives Considered

1. **One audit table per module** — rejected for the reasons above.
2. **NestJS interceptor that audits every write** — rejected: an interceptor cannot see the Prisma transaction or before/after values, so it can only produce low-value "endpoint X was called" rows.
3. **Write audit rows from an outbox consumer** — equally durable, but requires the outbox relay (not yet built) and makes the audit timeline eventually consistent. Can be revisited later.

---

## Consequences

- One query/index serves entity timelines (`entityType, entityId, occurredAt`) and per-user activity (`actorUserId, occurredAt`).
- New modules get auditing by importing `AuditModule` and adding actions to the shared catalogue.
- If the table grows to tens of millions of rows, it can be range-partitioned on `occurredAt` without application changes.
- Existing `employee_audit_logs` and `employee_field_histories` rows were copied into `audit_logs` (field-history rows from the same transaction merged into one `changes` array) before the legacy tables were dropped. That one-off migration was later folded into the `20261028000000_baseline` migration; it remains in git history.
