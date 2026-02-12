import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { POLL_INTERVAL_MS } from '@/constants/presale';
import type { SyncHealth } from '@/backend';

export interface BackgroundSyncStatus {
  isRunning: boolean;
  lastError: string | null;
  lastAttempt: number | null;
  lastSuccess: number | null;
}

export interface CachedDataState {
  isShowingCached: boolean;
  reason: string | null;
}

export interface Contribution {
  fromAddress: string;
  amount: bigint;
  timestamp: bigint;
  transactionId: string;
}

function parseSyncHealth(health: SyncHealth): BackgroundSyncStatus {
  return {
    isRunning: false,
    lastError: health.syncError || null,
    lastAttempt: health.lastSyncAttempt ? new Date(health.lastSyncAttempt).getTime() : null,
    lastSuccess: health.lastSuccessfulSync ? new Date(health.lastSuccessfulSync).getTime() : null,
  };
}

export function useContributors() {
  const { actor, isFetching: isActorFetching } = useActor();

  // Placeholder query until backend implements getContributions
  const contributionsQuery = useQuery({
    queryKey: ['contributions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Backend does not yet provide contribution data
      // Return empty result
      const result = {
        data: [] as Contribution[],
        lastUpdated: Date.now(),
      };
      
      return result;
    },
    enabled: !!actor && !isActorFetching,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS - 1000,
    retry: false,
  });

  const healthQuery = useQuery({
    queryKey: ['contributionsHealth'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getHealth();
    },
    enabled: !!actor && !isActorFetching,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS - 1000,
    retry: false,
  });

  const backgroundSyncStatus = healthQuery.data 
    ? parseSyncHealth(healthQuery.data)
    : {
        isRunning: false,
        lastError: null,
        lastAttempt: null,
        lastSuccess: null,
      };

  // Determine if we're showing cached data due to sync issues
  const isShowingCached = contributionsQuery.isError && !!contributionsQuery.data;
  const cachedDataState: CachedDataState = {
    isShowingCached,
    reason: isShowingCached && backgroundSyncStatus.lastError
      ? `Background sync failed: ${backgroundSyncStatus.lastError}`
      : null,
  };

  return {
    ...contributionsQuery,
    data: contributionsQuery.data,
    lastSuccessfulUpdate: backgroundSyncStatus.lastSuccess || contributionsQuery.data?.lastUpdated || null,
    backgroundSyncStatus,
    cachedDataState,
  };
}

