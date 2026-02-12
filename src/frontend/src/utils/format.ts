/**
 * Formats a number with dot thousands separators (e.g., 515000 → "515.000")
 * Uses German locale formatting which uses dots for thousands separators
 * Ensures exactly 3 decimal places for proper thousands formatting
 */
export function formatIcpWithDots(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  }).format(value);
}
