export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Hero Image */}
        <div className="relative w-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow opacity-30 blur-3xl animate-pulse-slow"></div>
          <img
            src="/assets/generated/icp-meme-doge-hero.dim_1600x900.png"
            alt="IcpMemeDoge - Special Meme Dog"
            className="relative z-10 w-full h-auto rounded-3xl shadow-2xl shadow-neon-cyan/50"
          />
        </div>

        {/* Animated Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
          <span className="neon-text-animated bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-yellow bg-clip-text text-transparent animate-gradient-x">
            IcpMemeDoge
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl font-medium">
          The <span className="text-neon-cyan font-bold">special memecoin</span> bringing something extraordinary to the future.
          Join the presale now and be part of the revolution!
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-neon-pink/30 rounded-2xl p-6 hover:border-neon-pink/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-pink/30">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-neon-pink font-bold text-lg mb-2">Revolutionary</h3>
            <p className="text-gray-300 text-sm">A memecoin that's truly special and different</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-neon-cyan/30 rounded-2xl p-6 hover:border-neon-cyan/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/30">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="text-neon-cyan font-bold text-lg mb-2">Limited Supply</h3>
            <p className="text-gray-300 text-sm">Only 1 billion tokens will ever exist</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-neon-yellow/30 rounded-2xl p-6 hover:border-neon-yellow/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-yellow/30">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-neon-yellow font-bold text-lg mb-2">100% Win Chances</h3>
            <p className="text-gray-300 text-sm">After the presale ends</p>
          </div>
        </div>
      </div>
    </section>
  );
}
