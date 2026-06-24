# MILAHA Coding Guidelines

These guidelines are the required baseline for MILAHA engineering teams. They apply across repositories, with specific sections for NestJS, FastAPI, React/Next.js, and Tailwind.

## Core Principles

- Prefer clear, boring code over clever code.
- Keep changes small enough to review with confidence.
- Make boundaries explicit with types, schemas, contracts, and validation.
- Treat errors, empty states, authorization, logging, and tests as part of the feature.
- Use existing project conventions before adding a new pattern.
- Document decisions when the tradeoff will matter later.

## Shared Coding Baseline

### Structure

- Organize code by domain or feature, not by miscellaneous utility buckets.
- Keep public interfaces narrow and stable.
- Separate transport concerns from business rules.
- Put reusable code behind clear names and tests.
- Avoid unrelated refactors inside feature or bug-fix PRs.

### Naming

- Use names that describe intent, not implementation trivia.
- Prefer domain language used by business and operations teams.
- Avoid abbreviations unless they are already standard inside MILAHA.
- Name booleans as conditions, such as `isApproved`, `hasAccess`, or `shouldRetry`.

### Types And Contracts

- Define explicit request, response, event, and persistence shapes.
- Validate data at system boundaries.
- Keep internal models separate from external API contracts when they can evolve independently.
- Version or document breaking contract changes before consumers depend on them.

### Validation And Error Handling

- Validate user and integration input before business logic runs.
- Return actionable errors without exposing secrets, stack traces, or internal implementation details.
- Handle expected failures explicitly.
- Log enough context to debug production issues without leaking sensitive data.
- Avoid swallowing exceptions unless the fallback is intentional and observable.

### Security

- Enforce authorization near the entry point and again before sensitive state changes when needed.
- Keep secrets in environment or secret-management systems, never in source code.
- Treat file uploads, webhooks, callbacks, and third-party payloads as untrusted input.
- Avoid logging access tokens, passwords, API keys, national IDs, payment details, or private customer data.
- Use least-privilege service accounts and scoped API credentials.

### Configuration

- Keep environment-specific values in configuration, not hardcoded conditionals.
- Validate required configuration at startup.
- Use safe defaults for local development and explicit settings for production.
- Document new environment variables in the relevant README, runbook, or release checklist.

### Data And Migrations

- Make migrations reversible where practical.
- Plan large data changes as phased work with backups, validation, and rollback notes.
- Avoid mixing schema migrations and high-risk data migrations without a release plan.
- Preserve auditability for business-critical workflows.

### Tests

- Add tests at the level where the behavior can regress.
- Cover happy paths, validation failures, authorization, and important error paths.
- Keep unit tests fast and deterministic.
- Use integration or browser tests for cross-boundary behavior.
- Do not lower coverage or skip failing tests without recording the reason and follow-up.

### Observability

- Log important business and system transitions with correlation IDs when available.
- Emit metrics or alerts for scheduled jobs, queues, webhooks, and critical integrations.
- Include operational dashboards or log queries in runbooks for production features.
- Make background failures visible to support or operations teams.

### Comments And Documentation

- Write comments to explain why a non-obvious decision exists.
- Do not comment code that is already self-explanatory.
- Update docs, templates, runbooks, or ADRs when behavior, operations, or architecture changes.

### Dependencies

- Prefer established project dependencies before adding new packages.
- Add dependencies only when they remove real complexity or risk.
- Check license, maintenance, security posture, and bundle/runtime impact.
- Pin or constrain versions according to the repository's package-management policy.

## NestJS Guidelines

- Structure modules around business capabilities, not technical layers alone.
- Keep controllers thin: parse transport details, delegate business work, and return typed responses.
- Put business rules in providers or services with focused tests.
- Use DTOs for request bodies, query parameters, and responses when the contract should be explicit.
- Use validation pipes and class-based validators for incoming data.
- Use guards for authorization and authentication decisions.
- Use interceptors for cross-cutting behavior such as response shaping, tracing, or timing.
- Use exception filters or standard exception classes so API errors stay consistent.
- Keep configuration in a typed configuration module or service.
- Document public APIs with OpenAPI metadata when consumers need stable contracts.
- Test controllers for routing/contract behavior and services for business behavior.

## FastAPI Guidelines

- Organize routers by domain or capability.
- Keep route handlers thin: validate transport input, call domain/application services, and return response schemas.
- Use Pydantic models for request and response contracts.
- Use dependencies for auth, database sessions, settings, and shared request context.
- Keep async code honest: do not block the event loop with synchronous I/O inside async handlers.
- Use explicit exception handlers or `HTTPException` responses for expected failures.
- Centralize settings with environment-backed configuration.
- Keep OpenAPI output clean with response models, tags, summaries, and examples where useful.
- Test routers with realistic request/response assertions and services with focused unit tests.
- Manage startup/shutdown tasks, background jobs, and external clients explicitly.

## React, Next.js, And Tailwind Guidelines

- Use `@qatar-navigation-milaha/ui` primitives before creating app-local reusable UI.
- Add Storybook stories for new reusable UI before it is accepted.
- Keep components focused and composable.
- Prefer server components and server-side data loading where the app architecture supports it.
- Keep client components for interaction, browser APIs, and local state.
- Use semantic Tailwind tokens such as `primary`, `accent`, `text`, `background`, and `border`.
- Make accessibility part of the component API: labels, focus states, keyboard behavior, and ARIA wiring should not be afterthoughts.
- Use browser tests for critical workflows and interaction-heavy UI.
- Avoid raw brand colors in product code unless documenting tokens or building the design system itself.

## Review Checklist

- [ ] The change is scoped to one clear outcome.
- [ ] Public interfaces, schemas, or API contracts are explicit.
- [ ] Validation, authorization, and error paths are handled.
- [ ] Tests cover the behavior most likely to regress.
- [ ] Logs, metrics, or runbook updates exist for production-impacting work.
- [ ] New dependencies and configuration are justified and documented.
- [ ] ADRs or architecture docs are updated for durable decisions.
