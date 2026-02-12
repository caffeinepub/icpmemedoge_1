import { usePresaleStatus } from '@/hooks/usePresaleStatus';
import { PRESALE_CAP_ICP, POLL_INTERVAL_MS, IC_DASHBOARD_ACCOUNT_URL } from '@/constants/presale';
import { formatIcpWithDots } from '@/utils/format';
import { RefreshCw, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function PresaleProgress() {
  const { data: statusData, isLoading, isFetching, isError, lastSuccessfulUpdate, backgroundSyncStatus } = usePresaleStatus();

  // Determine if data is stale or cached
  const isStale = isError && lastSuccessfulUpdate !== null;
  const isSyncFailing = backgroundSyncStatus.lastError !== null;

  // Only show initial loading skeleton when we have no data at all
  if (isLoading && !lastSuccessfulUpdate) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-700/50 rounded-lg animate-pulse"></div>
        <div className="h-24 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const status = statusData;
  const totalIcp = status ? Number(status.totalICP) / 100_000_000 : 0;
  const remainingIcp = status && status.remainingICP !== undefined
    ? Number(status.remainingICP) / 100_000_000
    : PRESALE_CAP_ICP;
  const percentComplete = status ? (totalIcp / PRESALE_CAP_ICP) * 100 : 0;
  const isEnded = status ? !status.active : false;

  // Convert polling interval to seconds for display
  const pollIntervalSeconds = POLL_INTERVAL_MS / 1000;

  // Check if backend has no data (empty contributions)
  const hasNoData = totalIcp === 0 && !isLoading;

  return (
    <div className="space-y-6">
      {/* Backend not synced warning */}
      {hasNoData && (
        <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300 flex-1">
            <p className="font-medium text-blue-400 mb-2">Awaiting Transaction Sync</p>
            <p className="mb-3">The presale monitoring system is ready but not yet connected to the transaction data source.</p>
            <a
              href={IC_DASHBOARD_ACCOUNT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-neon-yellow hover:text-neon-pink transition-colors"
            >
              <span>View live transactions on IC Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Sync failure warning banner */}
      {isSyncFailing && backgroundSyncStatus.lastError && !hasNoData && (
        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">
            <p className="font-medium text-yellow-500 mb-2">Background Sync Issue</p>
            <p>{backgroundSyncStatus.lastError}. Showing last known data. Automatic retries continue in the background.</p>
          </div>
        </div>
      )}

      {/* Progress header with live monitoring indicator */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-neon-cyan">Presale Progress</h3>
        <div className="flex items-center gap-2">
          {isFetching && (
            <RefreshCw className="w-5 h-5 text-neon-cyan animate-spin" />
          )}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className={`w-2 h-2 rounded-full ${
              isFetching ? 'bg-neon-cyan animate-pulse' : 
              isStale || isSyncFailing ? 'bg-yellow-500' : 
              hasNoData ? 'bg-blue-400' : 
              'bg-green-500'
            }`}></div>
            <span className="flex items-center gap-1">
              {isFetching ? (
                <span className="text-neon-cyan">Syncing...</span>
              ) : lastSuccessfulUpdate ? (
                <>
                  <Clock className="w-3 h-3" />
                  <span>
                    {formatDistanceToNow(lastSuccessfulUpdate, { addSuffix: true })}
                  </span>
                </>
              ) : (
                <span>Monitoring active</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden border border-neon-cyan/30">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-cyan transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(percentComplete, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white drop-shadow-lg">
              {percentComplete.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-neon-cyan/20">
            <p className="text-sm text-gray-400 mb-1">Raised</p>
            <p className="text-2xl font-bold text-neon-cyan">
              {formatIcpWithDots(totalIcp)} ICP
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-neon-pink/20">
            <p className="text-sm text-gray-400 mb-1">Remaining</p>
            <p className="text-2xl font-bold text-neon-pink">
              {formatIcpWithDots(remainingIcp)} ICP
            </p>
          </div>
        </div>

        {/* Auto-update info */}
        <p className="text-xs text-gray-500 text-center">
          {isEnded ? (
            'Presale has ended'
          ) : (
            <>Updates automatically every {pollIntervalSeconds} seconds</>
          )}
        </p>
      </div>
    </div>
  );
}
