export function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'icpmemedoge';

  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} IcpMemeDoge. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with{' '}
            <span className="text-neon-pink">❤</span>
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan hover:text-neon-pink transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
