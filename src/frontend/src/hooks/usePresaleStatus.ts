import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { POLL_INTERVAL_MS } from '@/constants/presale';

export function usePresaleStatus() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['presaleStatus'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getPresaleStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: POLL_INTERVAL_MS - 1000,
  });
}
