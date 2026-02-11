# Specification

## Summary
**Goal:** Ensure the Presale Progress “ICP Remaining” value defaults to and displays exactly “515.000 ICP” when there are no contributions or when presale status data is missing, while continuing to correctly compute and format the remaining amount as contributions arrive.

**Planned changes:**
- Update the frontend “ICP Remaining” calculation to treat missing/undefined/null presale status data as 0 received ICP.
- Ensure the “ICP Remaining” display uses dot thousands formatting and shows exactly “515.000 ICP” at 0 received, then (515,000 − received) thereafter (e.g., “514.900 ICP”).
- Keep all user-facing labels in English (e.g., “ICP Remaining”) and avoid visual/layout changes beyond the value/format correction.

**User-visible outcome:** On the Presale Progress section, users always see “ICP Remaining” render as “515.000 ICP” before any contributions (even if status data is unavailable), and then see a correctly decreasing, dot-formatted remaining ICP value as contributions come in.
