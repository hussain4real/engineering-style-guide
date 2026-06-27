# API Contract

## Document Metadata

| Field | Value |
| --- | --- |
| `title` | `<API or integration name> Contract` |
| `owner` | `<API owner>` |
| `status` | `Draft` |
| `reviewers` | `<Consumer owner>, <Provider owner>, <Security reviewer>, <QA lead>` |
| `last_updated` | `YYYY-MM-DD` |
| `related_links` | `<OpenAPI spec>, <architecture document>, <consumer repo>, <provider repo>` |

## Source Materials Reviewed

`source_materials_reviewed`

- [ ] BRS or feature brief:
- [ ] Existing API or integration reference:
- [ ] Consumer requirements:
- [ ] Security and data-classification notes:
- [ ] Error, retry, or support history:

## Overview

Describe what this API enables and which systems consume or provide it.

## Authentication And Authorization

- Authentication method:
- Authorization rules:
- Required scopes or roles:

## Endpoints

| Method | Path | Purpose | Auth required |
| --- | --- | --- | --- |
| `GET` | `/example` | `<Purpose>` | `Yes / No` |

## Request Payload

```json
{
  "field": "value"
}
```

## Response Payload

```json
{
  "id": "example",
  "status": "ok"
}
```

## Validation Rules

| Field | Type | Required | Rule |
| --- | --- | --- | --- |
| `field` | `string` | `Yes` | `<Validation>` |

## Error Responses

| Status | Code | Meaning | Consumer action |
| --- | --- | --- | --- |
| `400` | `validation_error` | `<Meaning>` | `<Action>` |

## Versioning And Compatibility

- Versioning approach:
- Backward compatibility expectations:
- Deprecation policy:

## Rate Limits And Timeouts

- Rate limit:
- Timeout:
- Retry guidance:

## Observability

- Logs:
- Metrics:
- Correlation IDs:
- Alerts:

## Test Cases

- [ ] Happy path:
- [ ] Validation failure:
- [ ] Unauthorized access:
- [ ] Provider or dependency failure:
