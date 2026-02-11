import { Badge } from '@/components/ui/badge';
import { usePresaleStatus } from '@/hooks/usePresaleStatus';
import { LISTINGS_AFTER_PRESALE } from '@/constants/listingsAfterPresale';

export function PostPresaleListingsSection() {
  const { data: presaleStatus, isLoading, isError } = usePresaleStatus();

  // Fallback when status is unavailable
  if (isLoading || isError || !presaleStatus) {
    return (
      <section className="container mx-auto px-4 py-16" id="listings">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-yellow to-neon-pink bg-clip-text text-transparent">
              Listings After the Presale
            </span>
          </h2>
          <div className="bg-gray-800/70 backdrop-blur-md border border-neon-cyan/40 rounded-3xl p-8 text-center">
            <p className="text-gray-300">Loading listing information...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show "coming soon" message when presale is still active
  if (presaleStatus.active) {
    return (
      <section className="container mx-auto px-4 py-16" id="listings">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-yellow to-neon-pink bg-clip-text text-transparent">
              Listings After the Presale
            </span>
          </h2>
          <div className="bg-gray-800/70 backdrop-blur-md border border-neon-cyan/40 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-neon-cyan/20">
            <div className="mb-6">
              <span className="text-6xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-neon-cyan mb-4">
              Listings Coming Soon!
            </h3>
            <p className="text-gray-300 text-lg">
              Detailed listing information will be announced after the presale ends. Stay tuned for exciting updates about where IcpMemeDoge will be available for trading!
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show listings when presale has ended
  return (
    <section className="container mx-auto px-4 py-16" id="listings">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-neon-cyan via-neon-yellow to-neon-pink bg-clip-text text-transparent">
            Listings After the Presale
          </span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LISTINGS_AFTER_PRESALE.map((listing, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-md border border-neon-pink/40 rounded-2xl p-6 shadow-xl shadow-neon-pink/10 hover:shadow-neon-pink/30 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex-1">
                  {listing.title}
                </h3>
                <Badge
                  variant={listing.status === 'Announced' ? 'default' : 'outline'}
                  className={
                    listing.status === 'Announced'
                      ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan'
                      : listing.status === 'In Progress'
                        ? 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow'
                        : 'bg-neon-pink/20 text-neon-pink border-neon-pink'
                  }
                >
                  {listing.status}
                </Badge>
              </div>
              {listing.description && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  {listing.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 border-2 border-neon-cyan rounded-xl p-6 text-center">
          <p className="text-xl font-bold text-neon-cyan mb-2">
            📢 More Listings Coming Soon
          </p>
          <p className="text-gray-300">
            We're working on additional exchange listings and partnerships. Follow our official channels for the latest announcements!
          </p>
        </div>
      </div>
    </section>
  );
}
