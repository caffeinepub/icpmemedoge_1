/**
 * Formats a backend-provided on-chain timestamp (nanoseconds) into an exact UTC string.
 * Format: YYYY/MM/DD HH:mm:ss UTC
 * 
 * @param timestampNanos - Timestamp in nanoseconds from the backend
 * @returns Formatted UTC timestamp string
 */
export function formatUtcTimestamp(timestampNanos: bigint): string {
  // Convert nanoseconds to milliseconds
  const timestampMs = Number(timestampNanos) / 1_000_000;
  const date = new Date(timestampMs);
  
  // Use UTC getters to avoid local timezone conversion
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds} UTC`;
}
