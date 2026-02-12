export const PRESALE_DEPOSIT_ADDRESS = 'd1850dd067fb2302bd635b0de944dcb52530490348ef1b6210bd4bdb490f0fe9';
export const PRESALE_CAP_ICP = 515_000;
export const MAX_SUPPLY = 1_000_000_000;
export const POLL_INTERVAL_MS = 10_000; // 10 seconds - faster updates for deposit detection

// Internet Computer Dashboard URL for monitoring
export const IC_DASHBOARD_ACCOUNT_URL = `https://dashboard.internetcomputer.org/account/${PRESALE_DEPOSIT_ADDRESS}`;

// Background sync timeout (5 seconds) - prevents slow data source from blocking UI
export const SYNC_TIMEOUT_MS = 5_000;

// Minimum interval between background sync attempts to avoid overlapping calls
export const MIN_SYNC_INTERVAL_MS = 3_000;
