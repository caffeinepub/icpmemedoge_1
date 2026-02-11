# Specification

## Summary
**Goal:** Fix the Presale Progress “ICP Remaining” stat so it shows the correct remaining ICP based on a 515000 ICP cap.

**Planned changes:**
- Update the Presale Progress UI calculation/formatting for “ICP Remaining” to display `515000 ICP` when received is `0`.
- Ensure “ICP Remaining” updates as `max(515000 - received, 0)` as contributions come in, with no thousands separators and no decimals.
- Keep all other Presale Status section labels/content unchanged.

**User-visible outcome:** The Presale Progress panel shows “ICP Remaining” as exactly `515000 ICP` at 0 received, and then decreases correctly (never below 0) as ICP contributions are detected.
