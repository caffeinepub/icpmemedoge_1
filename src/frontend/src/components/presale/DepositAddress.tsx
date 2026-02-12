import { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { PRESALE_DEPOSIT_ADDRESS } from '@/constants/presale';

export function DepositAddress() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PRESALE_DEPOSIT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-neon-yellow">Deposit Address</h3>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>Monitoring active</span>
        </div>
      </div>
      <div className="bg-gray-900/80 rounded-xl p-4 border border-neon-yellow/40">
        <div className="flex items-center gap-3">
          <code className="flex-1 text-xs md:text-sm text-gray-200 font-mono break-all">
            {PRESALE_DEPOSIT_ADDRESS}
          </code>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 p-2 bg-neon-yellow/20 hover:bg-neon-yellow/30 border border-neon-yellow/50 rounded-lg transition-all duration-200 hover:scale-105"
            aria-label="Copy address"
          >
            {copied ? (
              <Check className="w-5 h-5 text-neon-yellow" />
            ) : (
              <Copy className="w-5 h-5 text-neon-yellow" />
            )}
          </button>
        </div>
        {copied && (
          <p className="text-neon-yellow text-sm mt-2 font-medium animate-fade-in">
            ✓ Copied to clipboard!
          </p>
        )}
      </div>
      <div className="flex items-start gap-2 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg p-3">
        <AlertCircle className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
        <p className="text-xs text-gray-300">
          Deposits to this address are automatically detected and the presale status updates every 10 seconds.
        </p>
      </div>
    </div>
  );
}
