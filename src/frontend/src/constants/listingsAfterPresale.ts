export interface ListingItem {
  title: string;
  description?: string;
  status: 'Planned' | 'In Progress' | 'Announced';
}

export const LISTINGS_AFTER_PRESALE: ListingItem[] = [
  {
    title: 'Decentralized Exchange Listing',
    description: 'Major DEX integration for seamless trading',
    status: 'Planned',
  },
  {
    title: 'Community Governance Platform',
    description: 'Token holder voting and proposals',
    status: 'Planned',
  },
  {
    title: 'Liquidity Pool Launch',
    description: 'Initial liquidity provision for trading pairs',
    status: 'Planned',
  },
];
