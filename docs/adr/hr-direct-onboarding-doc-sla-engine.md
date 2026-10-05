# Architectural Decision Record (ADR): HR Direct Onboarding & Onboarding Document SLA Engine

**Status:** Accepted  
**Date:** 2026-10-05  
**Decision Makers:** Engineering Team & HR Leadership  

---

## Context & Problem Statement

Enterprise onboarding requires an efficient, HR-gated pipeline to provision employee records and identity credentials while managing document compliance. Candidates may present partial documentation (e.g. Relieving Letter pending, Experience Letter delayed) at joining date. HR requires:
1. Atomic, single-transaction account & employee profile creation.
2. Compliance tracking for missing candidate documentation with strict SLA deadlines (29 days post-joining).
3. Automated warning flags when secondary documents near or exceed due dates.

---

## Decision

We implement **Model 1: HR Direct Entry Onboarding & SLA Document Tracking System**:

### 1. Atomic Transactional Provisioning (`POST /api/v1/employees`)
- Onboarding operates via a single Prisma `$transaction`.
- Automatically generates unique, formatted Employee Code (`LL-XXXXX`).
- Instantiates `User` account and 6 core child domain records (`Personal`, `Communication`, `Financial`, `Document`, `Employment`, `Probation`).
- Configures mandatory initial password and forces password change flag (`mustChangePassword: true`).

### 2. 29-Day Document Fulfillment SLA Engine
- `previousOrgDocStatus` enum (`NOT_APPLICABLE`, `OFFER_LETTER`, `RELIEVING_LETTER`, `EXPERIENCE_LETTER`, `BOTH`).
- If documentation is incomplete at onboarding, calculates `secondDocDueDate` (Joining Date + 29 days).
- Exposes tracking queue `GET /api/v1/employees/onboarding/pending-documents` with automated flag:
  - `isIncompleteFlag`: `true` if `secondDocDueDate` <= 5 days away or already passed.
- Secondary document submission endpoint `POST /api/v1/employees/:id/second-document` automatically completes document tracking status.

---

## Consequences

### Positive
- **Zero Orphan Records**: Transactional guarantee prevents orphaned User or Partial Employee rows.
- **Automated Compliance**: Eliminates manual tracking of delayed employment records.
- **Clear Audit Trail**: Captures creator ID, timestamp, and document submission events.

### Negative
- **Validation Strictness**: Requires all core employee sections in initial onboarding payload.
