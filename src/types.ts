export type Screen = 'home' | 'artisanal-menu' | 'checkout-&-order' | 'member-lounge';

export interface User {
  id: string;
  name: string;
  email: string;
  memberTier: 'Standard Member' | 'Silver Patron' | 'Gold Roastery Member' | 'Grand Reserve Patron';
  memberNumber: string;
  societyCredits: number;
  beansRoastedKg: number;
  visits: number;
  loungeCupsRemaining: number;
  avatarUrl: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  badge?: string;
  badgeType?: 'signature' | 'house' | 'process' | 'dessert' | 'daily' | 'chef' | 'origin';
  price: number;
  category: 'espresso' | 'slow-drip' | 'cold-brew' | 'tea' | 'pastries';
  description: string;
  notes: string[];
  specs: string;
  image: string;
  featured?: boolean;
  cuppingScore?: number;
  origin?: string;
  temperature?: string;
  ratio?: string;
  dietary?: ('oat' | 'decaf' | 'sugar-free')[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  optionSummary?: string;
}

export interface TastingRecord {
  id: string;
  coffeeName: string;
  tag: string;
  curatedProfile: string;
  dateStr: string;
  rating: number; // 1 to 5
  ratingLabel: string;
}

export interface AtelierGathering {
  id: string;
  type: 'Masterclass Flight' | 'Table Reservation';
  title: string;
  dateStr: string;
  timeStr: string;
  statusText: string;
  location: string;
}

export interface SocietyReserveDrop {
  id: string;
  name: string;
  price: number;
  description: string;
  elevation: string;
  remainingTins: number;
  limitPerPatron: number;
  image: string;
  claimedByCurrentUser?: boolean;
}

export interface SearchIndexedItem {
  id: string;
  title: string;
  category: string;
  type: 'menu' | 'roast' | 'origin' | 'gathering';
  keywords: string[];
  description: string;
  price?: number;
  image?: string;
  targetScreen: Screen;
  actionPayload?: any;
}
