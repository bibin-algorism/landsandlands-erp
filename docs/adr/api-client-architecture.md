# Architectural Decision Record (ADR): API Integration Architecture

**Status:** Accepted  
**Date:** 2026-10-02  
**Decision Makers:** Engineering Team  

---

## Context & Problem Statement

The Lands & Lands ERP frontend (`apps/web`) requires a robust, scalable pattern to communicate with the NestJS backend API (`apps/api`). Key requirements include:
- Automatic JWT Bearer token authentication on outgoing HTTP requests.
- Centralized error handling and automatic handling of `401 Unauthorized` token refreshes or logouts.
- Efficient state management, caching, background refetching, and optimistic updates across complex ERP modules.

---

## Decision

We will use **Axios** as our HTTP network client and **TanStack Query (`@tanstack/react-query`)** for async state management and server data fetching.

### 1. HTTP Client Layer: **Axios**
- **Instance Setup**: Centralized client (`apps/web/src/api/client.ts`) configured with `baseURL`, standard timeouts, and JSON headers.
- **Request Interceptor**: Reads authorization token from storage/state and attaches `Authorization: Bearer <token>` automatically.
- **Response Interceptor**: Normalizes backend API response payloads and catches `401/403` errors centrally to handle session expiration or refresh flows.

### 2. Data Fetching & Caching Layer: **TanStack React Query (`@tanstack/react-query`)**
- **Declarative Querying**: Replaces custom `useEffect` fetch loops with type-safe `useQuery` hooks.
- **Mutation Lifecycle**: Uses `useMutation` for form submissions, handling loading states, errors, and invalidating relevant cache keys upon success (`queryClient.invalidateQueries()`).
- **Caching & Stale Time**: Prevents duplicate HTTP requests across multiple rendered UI components.

---

## Recommended Folder Structure

```
apps/web/src/
├── api/
│   ├── client.ts             # Axios instance + interceptors
│   ├── types.ts              # API DTOs and Response envelopes
│   ├── auth.ts               # Auth service calls
│   └── password-reset.ts     # HR Password reset service calls
├── hooks/
│   ├── useAuth.ts            # Auth state & mutation hooks
│   └── usePasswordResets.ts  # TanStack query & mutation hooks
└── main.tsx                  # Wraps app in QueryClientProvider
```

---

## Installation Commands

```bash
pnpm --filter web add axios @tanstack/react-query
```
