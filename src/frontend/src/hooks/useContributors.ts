import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { POLL_INTERVAL_MS } from '@/constants/presale';

export function useContributors() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['contributors'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const contributors = await actor.getAllContributors();
      return {
        data: contributors,
        lastUpdated: Date.now(),
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS - 1000,
  });
}
