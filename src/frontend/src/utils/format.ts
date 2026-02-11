/**
 * Formats a number with dot thousands separators (e.g., 515000 → "515.000")
 * Uses German locale formatting which uses dots for thousands separators
 */
export function formatIcpWithDots(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}
