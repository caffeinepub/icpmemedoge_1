import { useCountdown24h } from '@/hooks/useCountdown24h';

export function CountdownTimer() {
  const { hours, minutes, seconds } = useCountdown24h();

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-300 mb-4">Time Remaining</h3>
      <div className="flex justify-center gap-4">
        <div className="bg-gray-900/80 border border-neon-pink/40 rounded-xl p-4 min-w-[80px]">
          <div className="text-3xl md:text-4xl font-black text-neon-pink">{hours.toString().padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">HOURS</div>
        </div>
        <div className="bg-gray-900/80 border border-neon-cyan/40 rounded-xl p-4 min-w-[80px]">
          <div className="text-3xl md:text-4xl font-black text-neon-cyan">{minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">MINUTES</div>
        </div>
        <div className="bg-gray-900/80 border border-neon-yellow/40 rounded-xl p-4 min-w-[80px]">
          <div className="text-3xl md:text-4xl font-black text-neon-yellow">{seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs text-gray-400 mt-1">SECONDS</div>
        </div>
      </div>
    </div>
  );
}
