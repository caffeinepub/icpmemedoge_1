# Specification

## Summary
**Goal:** Replace placeholder presale monitoring with real backend-synced on-chain ICP deposit data and wire the frontend polling to those real endpoints so the UI no longer shows “Awaiting Transaction Sync” once transactions exist.

**Planned changes:**
- Implement real backend presale transaction syncing for deposit accountId `d1850dd067fb2302bd635b0de944dcb52530490348ef1b6210bd4bdb490f0fe9`, including deduplication by stable transactionId and computing presale stats from the synced dataset.
- Persist the individual contribution records in stable canister state and add a conditional upgrade migration only if required by the new schema.
- Improve backend health reporting to return real `lastSuccessfulSync`, `lastSyncAttempt`, and `syncError` values reflecting the presale sync process (provider-neutral wording).
- Update `frontend/src/hooks/usePresaleStatus.ts` and `frontend/src/hooks/useContributors.ts` to call the new backend methods (instead of placeholders) while keeping the existing 10-second React Query polling cadence and English UI text.
- Ensure Presale Progress, Latest Transactions, and Contributors all derive from the same backend-synced contributions dataset and stop rendering the “Awaiting Transaction Sync” placeholder when contributions exist.

**User-visible outcome:** The presale monitoring page shows real-time (polled) presale totals and newest-first deposit transactions from the specified deposit account, with consistent progress/transactions/contributors and accurate sync status messaging when syncing succeeds or fails.
