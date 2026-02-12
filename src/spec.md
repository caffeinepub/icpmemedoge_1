# Specification

## Summary
**Goal:** Automatically detect presale deposits to the existing configured address and update deposit/payment status accordingly.

**Planned changes:**
- Add backend logic to periodically check for deposits to the fixed presale address and record matched deposits.
- Update status computation so a user’s presale payment state reflects detected deposits (keeping the current polling-based UX).

**User-visible outcome:** Users see their presale deposit/payment status update automatically after making a transfer to the presale address, without manual intervention.
