import { useContributors } from '@/hooks/useContributors';
import { aggregateContributions } from '@/utils/contributors';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { IC_DASHBOARD_ACCOUNT_URL, POLL_INTERVAL_MS } from '@/constants/presale';

export function ContributorsList() {
  const { 
    data: contributorsData, 
    isLoading, 
    isFetching, 
    isError, 
    lastSuccessfulUpdate,
    backgroundSyncStatus,
    cachedDataState,
  } = useContributors();

  const contributions = contributorsData?.data;
  const aggregated = contributions ? aggregateContributions(contributions) : [];

  // Determine if data is stale
  const isStale = isError && lastSuccessfulUpdate !== null;
  const isSyncFailing = backgroundSyncStatus.lastError !== null;
  
  // Check if backend has no data
  const hasNoData = aggregated.length === 0 && !isLoading;

  // Convert polling interval to seconds for display
  const pollIntervalSeconds = POLL_INTERVAL_MS / 1000;

  return (
    <section className="container mx-auto px-4 py-16" id="contributors">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              Contributors
            </span>
          </h2>
          {isFetching && (
            <RefreshCw className="w-6 h-6 text-neon-cyan animate-spin" />
          )}
        </div>

        <div className="bg-gray-800/70 backdrop-blur-md border border-neon-yellow/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-neon-yellow/20">
          {/* Auto-update indicator with last successful sync */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${
                isFetching ? 'bg-neon-cyan animate-pulse' : 
                isStale || isSyncFailing ? 'bg-yellow-500' : 
                hasNoData ? 'bg-blue-400' : 
                'bg-green-500'
              }`}></div>
              <span className="flex items-center gap-2">
                {isFetching ? (
                  <span className="text-neon-cyan">Refreshing...</span>
                ) : lastSuccessfulUpdate ? (
                  <>
                    <Clock className="w-3 h-3" />
                    <span>
                      Last successful update: {formatDistanceToNow(lastSuccessfulUpdate, { addSuffix: true })}
                    </span>
                  </>
                ) : (
                  <span>Not updated yet</span>
                )}
              </span>
            </div>
            <a
              href={IC_DASHBOARD_ACCOUNT_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-neon-yellow hover:text-neon-pink transition-colors"
            >
              <span>View on IC Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Backend not synced info */}
          {hasNoData && !isError && (
            <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-blue-400 mb-2">Awaiting Transaction Sync</p>
                <p>Contributor data will appear here once the backend sync is active.</p>
              </div>
            </div>
          )}

          {/* Cached/stale data warning banner */}
          {cachedDataState.isShowingCached && cachedDataState.reason && (
            <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-yellow-500 mb-2">Showing cached data</p>
                <p>{cachedDataState.reason}. Automatic retries continue in the background.</p>
              </div>
            </div>
          )}

          {/* Loading state (only on initial load without cached data) */}
          {isLoading && !lastSuccessfulUpdate && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg animate-pulse">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600/50 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-600/50 rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-gray-600/50 rounded w-24"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error state (only if no previous data) */}
          {isError && !lastSuccessfulUpdate && !isLoading && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 text-lg font-medium mb-2">Failed to load contributors</p>
              <p className="text-gray-400 text-sm">The page will retry automatically</p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && aggregated.length === 0 && !hasNoData && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No contributors yet.</p>
              <p className="text-gray-500 text-sm mt-2">Be the first to contribute!</p>
            </div>
          )}

          {/* Contributors table */}
          {aggregated.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Address</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium text-sm">Total ICP</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium text-sm">Last Contribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aggregated.map((contributor) => {
                      const totalIcp = Number(contributor.totalAmount) / 100_000_000;
                      const lastContribution = Number(contributor.lastTimestamp) / 1_000_000;
                      const timeAgo = formatDistanceToNow(new Date(lastContribution), { addSuffix: true });

                      return (
                        <tr
                          key={contributor.address}
                          className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <code className="text-sm text-gray-300 font-mono">
                              {contributor.address.slice(0, 12)}...{contributor.address.slice(-12)}
                            </code>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="text-neon-cyan font-bold text-lg">
                              {totalIcp.toLocaleString(undefined, { maximumFractionDigits: 2 })} ICP
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-sm text-gray-400">
                            {timeAgo}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Auto-update info */}
              <p className="text-xs text-gray-500 text-center mt-6">
                Updates automatically every {pollIntervalSeconds} seconds
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
