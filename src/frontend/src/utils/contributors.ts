import type { Contribution } from '@/hooks/useContributors';

export interface AggregatedContributor {
  address: string;
  totalAmount: bigint;
  contributionCount: number;
  lastTimestamp: bigint;
}

/**
 * Aggregates individual contributions by fromAddress.
 * Input contributions should already be sorted newest-first by backend.
 * Returns aggregated contributors sorted newest-first by their most recent contribution.
 */
export function aggregateContributions(contributions: Contribution[]): AggregatedContributor[] {
  const aggregated = new Map<string, AggregatedContributor>();

  for (const contribution of contributions) {
    const existing = aggregated.get(contribution.fromAddress);
    
    if (existing) {
      existing.totalAmount += contribution.amount;
      existing.contributionCount += 1;
      // Keep the newest timestamp (first occurrence in newest-first list)
      if (contribution.timestamp > existing.lastTimestamp) {
        existing.lastTimestamp = contribution.timestamp;
      }
    } else {
      aggregated.set(contribution.fromAddress, {
        address: contribution.fromAddress,
        totalAmount: contribution.amount,
        contributionCount: 1,
        lastTimestamp: contribution.timestamp,
      });
    }
  }

  // Convert to array and sort by lastTimestamp (newest first)
  const result = Array.from(aggregated.values());
  result.sort((a, b) => {
    // Sort by timestamp descending (newest first)
    if (a.lastTimestamp > b.lastTimestamp) return -1;
    if (a.lastTimestamp < b.lastTimestamp) return 1;
    // Stable tie-breaking by address
    return a.address.localeCompare(b.address);
  });

  return result;
}
