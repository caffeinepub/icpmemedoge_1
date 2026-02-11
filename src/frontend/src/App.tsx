import { HeroSection } from './components/presale/HeroSection';
import { PresaleStatusSection } from './components/presale/PresaleStatusSection';
import { HowToContribute } from './components/presale/HowToContribute';
import { ContributorsList } from './components/presale/ContributorsList';
import { TokenomicsFaq } from './components/presale/TokenomicsFaq';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="relative">
        {/* Animated background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-neon-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <PresaleStatusSection />
          <HeroSection />
          <HowToContribute />
          <ContributorsList />
          <TokenomicsFaq />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
