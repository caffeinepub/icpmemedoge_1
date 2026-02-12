import { useContributors } from '@/hooks/useContributors';
import { aggregateContributions } from '@/utils/contributors';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw } from 'lucide-react';

export function ContributorsList() {
  const { data: contributorsData, isLoading, isFetching } = useContributors();

  const contributions = contributorsData?.data;
  const aggregated = contributions ? aggregateContributions(contributions) : [];

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
          {/* Auto-update indicator */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${isFetching ? 'bg-neon-cyan animate-pulse' : 'bg-green-500'}`}></div>
              <span>
                {isFetching ? (
                  <span className="text-neon-cyan">Updating...</span>
                ) : contributorsData?.lastUpdated ? (
                  <span>Updated {formatDistanceToNow(contributorsData.lastUpdated, { addSuffix: true })}</span>
                ) : (
                  <span>Auto-updating</span>
                )}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Total: <span className="text-neon-yellow font-bold">{aggregated.length}</span> contributor{aggregated.length !== 1 ? 's' : ''}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-700/50 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : aggregated.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No contributions yet. Be the first!</p>
              <p className="text-gray-500 text-sm mt-2">Deposits are automatically detected every 10 seconds</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 px-4 text-neon-yellow font-bold">Address</th>
                    <th className="text-right py-4 px-4 text-neon-yellow font-bold">Total Contributed</th>
                    <th className="text-right py-4 px-4 text-neon-yellow font-bold">Last Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {aggregated.map((contributor, index) => (
                    <tr
                      key={contributor.address}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <code className="text-sm text-gray-300 font-mono">
                          {contributor.address.slice(0, 8)}...{contributor.address.slice(-8)}
                        </code>
                      </td>
                      <td className="text-right py-4 px-4">
                        <span className="text-neon-cyan font-bold">
                          {contributor.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ICP
                        </span>
                      </td>
                      <td className="text-right py-4 px-4 text-gray-400 text-sm">
                        {formatDistanceToNow(new Date(Number(contributor.lastTimestamp) / 1_000_000), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
