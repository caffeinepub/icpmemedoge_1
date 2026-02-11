# Specification

## Summary
**Goal:** Format the Presale Progress “ICP Remaining” value with dot thousands separators so it displays as “515.000 ICP” when no contributions have been received, and continues to format correctly as contributions come in.

**Planned changes:**
- Update the frontend formatting logic for the “ICP Remaining” statistic to use dot thousands separators (e.g., 515.000) while preserving the underlying remaining-amount calculation.
- Ensure the displayed remaining amount is clamped to a minimum of 0 and that only numeric formatting changes (label and other UI behavior remain unchanged).

**User-visible outcome:** In Presale Progress, “ICP Remaining” shows “515.000 ICP” at 0 received, and thereafter shows the correctly computed remaining ICP with dot thousands separators (never below 0).
