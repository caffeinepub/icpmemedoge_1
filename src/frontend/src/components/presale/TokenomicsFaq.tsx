import { MAX_SUPPLY } from '@/constants/presale';

export function TokenomicsFaq() {
  return (
    <section className="container mx-auto px-4 py-16" id="tokenomics">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan bg-clip-text text-transparent">
            Tokenomics & FAQ
          </span>
        </h2>

        <div className="space-y-6">
          {/* Tokenomics Card */}
          <div className="bg-gray-800/70 backdrop-blur-md border border-neon-cyan/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-neon-cyan/20">
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Tokenomics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
                <span className="text-gray-300 font-medium">Token Name</span>
                <span className="text-white font-bold">IcpMemeDoge</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
                <span className="text-gray-300 font-medium">Max Supply</span>
                <span className="text-neon-pink font-bold">{MAX_SUPPLY.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700/50">
                <span className="text-gray-300 font-medium">Blockchain</span>
                <span className="text-white font-bold">Internet Computer (ICP)</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-300 font-medium">Presale Cap</span>
                <span className="text-white font-bold">515,000 ICP</span>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-neon-yellow/20 to-neon-pink/20 border-2 border-neon-yellow rounded-xl p-6 text-center">
              <p className="text-2xl font-black text-neon-yellow">
                🎯 100% Win Chances After the Presale
              </p>
              <p className="text-gray-300 mt-2">Join now and be part of something special!</p>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="bg-gray-800/70 backdrop-blur-md border border-neon-pink/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-neon-pink/20">
            <h3 className="text-2xl font-bold text-neon-pink mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">What is IcpMemeDoge?</h4>
                <p className="text-gray-300">
                  IcpMemeDoge is a special memecoin built on the Internet Computer blockchain, designed to bring something extraordinary to the future of meme tokens.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">How do I participate in the presale?</h4>
                <p className="text-gray-300">
                  Simply send ICP tokens to the presale address displayed above. Your contribution will be automatically detected and your tokens will be credited after the presale ends.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">When will I receive my tokens?</h4>
                <p className="text-gray-300">
                  Tokens will be distributed to all contributors after the presale ends (when 100% is reached or the hard cap of 515,000 ICP is collected).
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">What makes IcpMemeDoge special?</h4>
                <p className="text-gray-300">
                  IcpMemeDoge combines the fun of meme culture with the power of the Internet Computer blockchain, offering a unique opportunity with 100% win chances after the presale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
