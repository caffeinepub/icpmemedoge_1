import { PresaleProgress } from './PresaleProgress';
import { DepositAddress } from './DepositAddress';
import { CountdownTimer } from './CountdownTimer';
import { PRESALE_CAP_ICP } from '@/constants/presale';

export function PresaleStatusSection() {
  return (
    <section className="container mx-auto px-4 py-16" id="presale">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-md border border-neon-cyan/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-neon-cyan/20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow bg-clip-text text-transparent">
              Presale Status
            </span>
          </h2>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer />
          </div>

          {/* Presale Parameters */}
          <div className="bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-700/50">
            <h3 className="text-xl font-bold text-neon-cyan mb-4">Presale Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Hard Cap</p>
                <p className="text-white font-bold text-lg">{PRESALE_CAP_ICP.toLocaleString()} ICP</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Currency</p>
                <p className="text-white font-bold text-lg">ICP</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">End Condition</p>
                <p className="text-white font-bold text-lg">100% Reached</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <PresaleProgress />

          {/* Deposit Address */}
          <div className="mt-8">
            <DepositAddress />
          </div>
        </div>
      </div>
    </section>
  );
}
