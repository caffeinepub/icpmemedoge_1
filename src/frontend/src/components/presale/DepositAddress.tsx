import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
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
      <h3 className="text-lg font-bold text-neon-yellow">Deposit Address</h3>
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
    </div>
  );
}
