import type { Contribution } from '@/backend';

export interface AggregatedContributor {
  address: string;
  totalAmount: number;
  lastTimestamp: bigint;
  contributionCount: number;
}

export function aggregateContributions(contributions: Contribution[]): AggregatedContributor[] {
  const aggregated = new Map<string, AggregatedContributor>();

  for (const contribution of contributions) {
    const existing = aggregated.get(contribution.address);
    const amountInIcp = Number(contribution.amount) / 100_000_000;

    if (existing) {
      existing.totalAmount += amountInIcp;
      existing.contributionCount += 1;
      if (contribution.timestamp > existing.lastTimestamp) {
        existing.lastTimestamp = contribution.timestamp;
      }
    } else {
      aggregated.set(contribution.address, {
        address: contribution.address,
        totalAmount: amountInIcp,
        lastTimestamp: contribution.timestamp,
        contributionCount: 1,
      });
    }
  }

  return Array.from(aggregated.values()).sort((a, b) => {
    return Number(b.lastTimestamp - a.lastTimestamp);
  });
}
