import { PRESALE_DEPOSIT_ADDRESS, IC_DASHBOARD_ACCOUNT_URL } from '@/constants/presale';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

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
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-neon-yellow/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-neon-yellow">ICP Deposit Address</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-gray-400">Monitoring Active</span>
        </div>
      </div>

      <div className="bg-gray-800/70 rounded-lg p-4 mb-4">
        <code className="text-sm text-gray-300 font-mono break-all block">
          {PRESALE_DEPOSIT_ADDRESS}
        </code>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleCopy}
          className="flex-1 bg-neon-yellow/20 hover:bg-neon-yellow/30 text-neon-yellow border border-neon-yellow/50"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </>
          )}
        </Button>
        <Button
          asChild
          className="flex-1 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50"
        >
          <a
            href={IC_DASHBOARD_ACCOUNT_URL}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on IC Dashboard
          </a>
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        All deposits to this address are automatically monitored and tracked in real-time
      </p>
    </div>
  );
}
