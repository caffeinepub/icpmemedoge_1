import { usePresaleStatus } from '@/hooks/usePresaleStatus';
import { PRESALE_CAP_ICP } from '@/constants/presale';
import { formatIcpWithDots } from '@/utils/format';

export function PresaleProgress() {
  const { data: status, isLoading } = usePresaleStatus();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-700/50 rounded-lg animate-pulse"></div>
        <div className="h-24 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const totalIcp = status ? Number(status.totalIcp) / 100_000_000 : 0;
  const remainingIcp = status ? Math.max(0, Math.floor(Number(status.remainingIcp) / 100_000_000)) : PRESALE_CAP_ICP;
  const percentComplete = status ? (totalIcp / PRESALE_CAP_ICP) * 100 : 0;
  const isEnded = status ? !status.active : false;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300 font-medium">Progress</span>
          <span className="text-neon-cyan font-bold text-lg">{percentComplete.toFixed(2)}%</span>
        </div>
        <div className="relative h-8 bg-gray-900/80 rounded-full overflow-hidden border border-gray-700/50">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(percentComplete, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900/50 rounded-xl p-4 border border-neon-pink/30">
          <p className="text-gray-400 text-sm mb-1">ICP Received</p>
          <p className="text-2xl font-bold text-neon-pink">{totalIcp.toLocaleString(undefined, { maximumFractionDigits: 2 })} ICP</p>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 border border-neon-cyan/30">
          <p className="text-gray-400 text-sm mb-1">ICP Remaining</p>
          <p className="text-2xl font-bold text-neon-cyan">{formatIcpWithDots(remainingIcp)} ICP</p>
        </div>
      </div>

      {/* Presale Ended Badge */}
      {isEnded && (
        <div className="bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 border-2 border-neon-pink rounded-xl p-6 text-center">
          <p className="text-3xl font-black text-neon-pink animate-pulse-slow">
            🎉 PRESALE ENDED 🎉
          </p>
          <p className="text-gray-300 mt-2">Thank you for participating!</p>
        </div>
      )}
    </div>
  );
}
