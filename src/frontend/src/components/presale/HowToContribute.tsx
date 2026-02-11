import { PRESALE_DEPOSIT_ADDRESS, PRESALE_CAP_ICP } from '@/constants/presale';

export function HowToContribute() {
  return (
    <section className="container mx-auto px-4 py-16" id="how-to-contribute">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-yellow to-neon-pink bg-clip-text text-transparent">
            How to Contribute
          </span>
        </h2>

        <div className="bg-gray-800/70 backdrop-blur-md border border-neon-pink/40 rounded-3xl p-8 md:p-12 shadow-2xl shadow-neon-pink/20">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-neon-pink/20 border border-neon-pink rounded-full flex items-center justify-center text-neon-pink font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Send ICP to the Presale Address</h3>
                <p className="text-gray-300">
                  Transfer ICP tokens to the presale address shown above. You can send any amount up to the remaining cap.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-neon-cyan/20 border border-neon-cyan rounded-full flex items-center justify-center text-neon-cyan font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Automatic Detection</h3>
                <p className="text-gray-300">
                  Your contribution will be automatically detected and added to the presale progress. Your address will appear in the contributors list.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-neon-yellow/20 border border-neon-yellow rounded-full flex items-center justify-center text-neon-yellow font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Receive Your Tokens</h3>
                <p className="text-gray-300">
                  After the presale ends (when 100% is reached or {PRESALE_CAP_ICP.toLocaleString()} ICP is collected), your IcpMemeDoge tokens will be credited to your address.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-neon-pink/10 via-neon-cyan/10 to-neon-yellow/10 border border-neon-cyan/30 rounded-xl p-6">
            <h4 className="text-lg font-bold text-neon-cyan mb-2">Important Information</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Presale cap: {PRESALE_CAP_ICP.toLocaleString()} ICP</li>
              <li>• Payment currency: ICP only</li>
              <li>• Presale ends when 100% is reached</li>
              <li>• Tokens will be distributed after presale completion</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
