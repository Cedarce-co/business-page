# Backend Guide (Folder Terminology + Conventions)

This document defines backend terminology and where code should live in this project.
Use this as the source of truth when adding new backend features.

## Quick Terminology

- **Route Handler**: HTTP endpoint in `src/app/api/**/route.ts`. Public network entrypoint.
- **Middleware**: Request interception layer before route/page execution. In Next.js this is a root file (`middleware.ts`), not a dedicated folder by default.
- **Server Service**: Backend business logic in `src/server/services/**`. No UI code.
- **Database Layer**: Prisma schema + server client (`prisma/schema.prisma`, `src/server/database/prisma.ts`).
- **Auth Layer**: Server auth config + guards (`src/server/auth/config.ts`, `src/server/auth/guards.ts`).
- **Feature Contract**: Shared schema/types for a domain feature in `src/features/**/types.ts`.
- **Client Adapter**: Frontend wrapper around API calls in `src/features/**/client.ts`.

---

## Folder Responsibilities

### Backend folder map
```
src/
  server/
    auth/
      config.ts
      guards.ts
      password.ts
    database/
      prisma.ts
    middleware/
      admin.ts
      protect-routes.ts
    services/
      *.ts
  app/api/
    **/route.ts
middleware.ts
  features/
    <feature>/
      types.ts
      client.ts
```

### `src/server/middleware/`
- Reusable middleware helpers/policies.
- `middleware.ts` (root) should stay thin and delegate to this folder.

Rule: keep middleware rules centralized here, not duplicated in `middleware.ts`.

### `prisma/`
- `schema.prisma`: database models and enums.
- Migrations folder: source-of-truth schema history.
- `prisma.config.ts`: Prisma v7 config (datasource/migrations path).

Rule: only model/data changes go here.

### `src/lib/`
- Cross-cutting utilities and compatibility re-exports:
 - `http-client.ts` (shared frontend request helper)
 - optional re-export shims while migrating imports to `src/server/*`

Rule: backend source of truth should live under `src/server/*`.

### `src/server/services/`
- Domain business logic used by API routes and server components.
- Example:
 - `users.ts`, `profile.ts`, `kyc.ts`, `service-requests.ts`, `admin.ts`

Rule: business decisions live here (approval rules, status transitions, ownership checks).

### `src/features/<feature>/`
- `types.ts`: shared zod schema + TS types for the feature.
- `client.ts`: frontend adapter functions that call `/api/*`.

Rule: this is the feature contract boundary between frontend and backend.

### `src/app/api/`
- Thin transport layer:
 - parse request
 - auth check
 - call service
 - map response/status

Rule: avoid embedding business logic directly in route handlers.

### `src/app/(pages...)` and `src/components/`
- UI and interaction only.
- Components call `features/*/client.ts` adapters, not raw `fetch` in many places.

Rule: no direct Prisma usage in client components.

---

## Where New Code Should Go

When adding a new backend feature:

1. Add/adjust **schema** in `prisma/schema.prisma`.
2. Add shared **types/schema** in `src/features/<feature>/types.ts`.
3. Implement server business logic in `src/server/services/<feature>.ts`.
4. Add thin API route in `src/app/api/.../route.ts`.
5. Add frontend adapter in `src/features/<feature>/client.ts`.
6. Use adapter in UI components/pages.

This keeps frontend and backend decoupled and easier to maintain.

---

## Middleware Guidance

Use middleware only for cross-cutting concerns, for example:
- locale redirects
- global path protection
- coarse auth routing policies

Do not place feature business logic in middleware.
Feature-level authorization should still happen in services/API routes.

---

## Database + Auth Guidance

- **Database access** should happen through Prisma in server services.
- **Auth checks**:
 - page/layout server guard: `requireUser()` / `requireAdminUser()`
 - API guard: `getApiUserId()` / `getApiAdminUser()`
- Avoid trusting client input for ownership/authorization.

---

## Naming Conventions

- Service files: `kebab-case` or domain style (`service-requests.ts`).
- API route folders should mirror resources:
 - `/api/admin/users/[id]/approve`
 - `/api/admin/service-requests/[id]/status`
- Types:
 - input payloads: `XxxInput`
 - zod schema: `xxxSchema`

---

## Anti-Patterns to Avoid

- Fat route handlers with business logic.
- UI components importing Prisma directly.
- Repeating request payload schema in multiple files.
- Creating feature logic under `src/lib` when it belongs in `src/server/services`.

---

## Current Architecture (Summary)

- **Auth**: NextAuth credentials (`src/server/auth/config.ts`)
- **Session guards**: `src/server/auth/guards.ts`
- **Data access**: Prisma (`src/server/database/prisma.ts`, `prisma/schema.prisma`)
- **Middleware policies**: `src/server/middleware/*` with root `middleware.ts` as entrypoint
- **Feature boundaries**: `src/features/*`
- **Business logic**: `src/server/services/*`
- **Transport**: `src/app/api/*`
- **UI**: `src/app/*`, `src/components/*`
