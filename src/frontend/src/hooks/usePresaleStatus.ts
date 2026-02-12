import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { POLL_INTERVAL_MS, PRESALE_CAP_ICP } from '@/constants/presale';
import type { SyncHealth } from '@/backend';

export interface BackgroundSyncStatus {
  isRunning: boolean;
  lastError: string | null;
  lastAttempt: number | null;
  lastSuccess: number | null;
}

export interface PresaleStats {
  totalICP: bigint;
  remainingICP: bigint;
  contributorCount: bigint;
  active: boolean;
}

function parseSyncHealth(health: SyncHealth): BackgroundSyncStatus {
  return {
    isRunning: false,
    lastError: health.syncError || null,
    lastAttempt: health.lastSyncAttempt ? new Date(health.lastSyncAttempt).getTime() : null,
    lastSuccess: health.lastSuccessfulSync ? new Date(health.lastSuccessfulSync).getTime() : null,
  };
}

export function usePresaleStatus() {
  const { actor, isFetching: isActorFetching } = useActor();

  // Placeholder query until backend implements getPresaleStats
  const statsQuery = useQuery({
    queryKey: ['presaleStats'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Backend does not yet provide presale stats
      // Return default empty state
      const result: PresaleStats & { lastUpdated: number } = {
        totalICP: BigInt(0),
        remainingICP: BigInt(PRESALE_CAP_ICP * 100_000_000),
        contributorCount: BigInt(0),
        active: false,
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
    queryKey: ['presaleHealth'],
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

  return {
    ...statsQuery,
    data: statsQuery.data,
    lastSuccessfulUpdate: backgroundSyncStatus.lastSuccess || statsQuery.data?.lastUpdated || null,
    backgroundSyncStatus,
  };
}

