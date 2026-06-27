# Code Review Comment

Use this structure for comments that need action or discussion.

## Comment Type

`Blocking / Should fix / Suggestion / Question / Praise`

## Observation

What did you notice?

## Impact

Why does it matter for correctness, maintainability, security, accessibility, performance, or team standards?

## Suggested Direction

What change, investigation, or decision would resolve this?

## Example

```text
Should fix: This endpoint returns the raw database entity, which exposes fields the API contract does not include.

Impact: Future schema changes could leak internal fields to consumers.

Suggested direction: Return the documented response DTO/schema and add a test that asserts the public response shape.
```
