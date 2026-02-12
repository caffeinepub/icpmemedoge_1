import { useContributors } from '@/hooks/useContributors';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw, ExternalLink, AlertTriangle, Clock } from 'lucide-react';
import { IC_DASHBOARD_ACCOUNT_URL, POLL_INTERVAL_MS } from '@/constants/presale';
import { formatUtcTimestamp } from '@/utils/utcTimestamp';

export function LatestTransactionsPanel() {
  const { 
    data: contributorsData, 
    isLoading, 
    isFetching, 
    isError, 
    lastSuccessfulUpdate,
    backgroundSyncStatus,
    cachedDataState,
  } = useContributors();

  const contributions = contributorsData?.data || [];
  const latestTransactions = contributions.slice(0, 10);

  // Determine if data is stale
  const isStale = isError && lastSuccessfulUpdate !== null;
  const isSyncFailing = backgroundSyncStatus.lastError !== null;
  
  // Check if backend has no data
  const hasNoData = contributions.length === 0 && !isLoading;

  // Convert polling interval to seconds for display
  const pollIntervalSeconds = POLL_INTERVAL_MS / 1000;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-neon-cyan/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-neon-cyan">Latest Transactions</h3>
          {isFetching && (
            <RefreshCw className="w-5 h-5 text-neon-cyan animate-spin" />
          )}
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

      {/* Auto-update indicator with last successful sync */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 pb-3 border-b border-gray-700/50">
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

      {/* Backend not synced info */}
      {hasNoData && !isError && (
        <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300">
            <p className="font-medium text-blue-400">Awaiting Transaction Sync</p>
            <p className="mt-1">Transaction data will appear here once the backend sync is active.</p>
          </div>
        </div>
      )}

      {/* Cached/stale data warning banner */}
      {cachedDataState.isShowingCached && cachedDataState.reason && (
        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-gray-300">
            <p className="font-medium text-yellow-500">Showing cached data</p>
            <p className="mt-1">{cachedDataState.reason}</p>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !lastSuccessfulUpdate && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg animate-pulse">
              <div className="flex-1">
                <div className="h-3 bg-gray-600/50 rounded w-2/3 mb-2"></div>
                <div className="h-2 bg-gray-600/50 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-600/50 rounded w-16"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state (only if no previous data) */}
      {isError && !lastSuccessfulUpdate && !isLoading && (
        <div className="text-center py-8">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-red-400 text-sm font-medium mb-1">Failed to load transactions</p>
          <p className="text-gray-400 text-xs">Retrying automatically</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && latestTransactions.length === 0 && !hasNoData && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No transactions yet</p>
        </div>
      )}

      {/* Transactions list */}
      {latestTransactions.length > 0 && (
        <>
          <div className="space-y-3">
            {latestTransactions.map((tx) => {
              const amount = Number(tx.amount) / 100_000_000;
              const timestampMs = Number(tx.timestamp) / 1_000_000;
              const timeAgo = formatDistanceToNow(new Date(timestampMs), { addSuffix: true });
              const utcTime = formatUtcTimestamp(tx.timestamp);

              return (
                <div
                  key={tx.transactionId}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <code className="text-xs text-gray-300 font-mono block truncate">
                      {tx.fromAddress.slice(0, 16)}...{tx.fromAddress.slice(-16)}
                    </code>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-500">{timeAgo}</p>
                      <span className="text-gray-600">•</span>
                      <p className="text-xs text-gray-500">{utcTime}</p>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-neon-cyan">
                      {amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ICP
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Auto-update info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Updates automatically every {pollIntervalSeconds} seconds
          </p>
        </>
      )}
    </div>
  );
}
