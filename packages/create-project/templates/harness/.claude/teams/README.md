# Teams

A **team** is a named subset of agents that the `{{PM_AGENT_NAME}}` orchestrator dispatches together
for a recurring kind of work. Teams are not new actors — they are dispatch presets. The sole-caller
invariant still holds: the PM coordinates; agents inside a team do not call each other.

| Team | Lead | Members | Trigger |
|---|---|---|---|
| `delivery` | developer | qa, architect (sign-off) | a feature/bugfix to ship |
| `discovery` | {{DOMAIN_SME_ROLE}} | architect, qa | a new requirement / ambiguity |
| `governance` | security-officer | architect, developer | sprint close / material change / audit |
| `release` | ops | developer, {{PM_AGENT_NAME}} (approval) | version bump / deploy |

Add or rename teams to fit your project. Keep each team small and trigger-based.
