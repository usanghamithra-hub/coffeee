import React, { useState } from 'react';
import { Screen, TastingRecord } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { TASTING_RECORDS_INIT, ATELIER_GATHERINGS, SOCIETY_RESERVE_DROPS } from '../data/coffeeData';

interface LoungeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const LoungeScreen: React.FC<LoungeScreenProps> = ({ onNavigate }) => {
  const { currentUser, updateCredits, openAuthModal } = useAuth();
  const { addToCart } = useCart();

  // Sub-navigation in sidebar
  const [activeTab, setActiveTab] = useState<'overview' | 'allocations' | 'cellar' | 'dispatches' | 'settings'>('overview');

  // Interactive Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active batch allocation state
  const [grindSpec, setGrindSpec] = useState('Whole Bean (Aura V60)');
  const [isGrindModalOpen, setIsGrindModalOpen] = useState(false);

  // Tasting Cellar state
  const [tastingLogs, setTastingLogs] = useState<TastingRecord[]>(TASTING_RECORDS_INIT);
  const [isNewTastingModalOpen, setIsNewTastingModalOpen] = useState(false);
  const [newCoffeeName, setNewCoffeeName] = useState('');
  const [newCoffeeTag, setNewCoffeeTag] = useState('Single Origin');
  const [newProfile, setNewProfile] = useState('');
  const [newRating, setNewRating] = useState(5);

  // Reserve drop state
  const [dropClaimed, setDropClaimed] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleQuickOrder = () => {
    addToCart('Double Mayfair Flat White', 6.20, 'Lounge Express Service • Double Ristretto');
    showToast('Brew master notified. Your Double Mayfair Flat White is being prepared in the Mayfair lounge.');
  };

  const handleClaimDrop = () => {
    const drop = SOCIETY_RESERVE_DROPS[0];
    if (dropClaimed) return;

    if (currentUser && currentUser.societyCredits < drop.price) {
      showToast('Insufficient Society Credits. Please reload credits in settings.');
      return;
    }

    setDropClaimed(true);
    updateCredits(-drop.price);
    addToCart(drop.name, drop.price, 'Exclusive Society Reserve Drop • Cask Aged');
    showToast(`1 Tin of ${drop.name} claimed and charged to Society Credits ($${drop.price}).`);
  };

  const handleSaveTastingLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoffeeName.trim()) return;

    const ratingLabels: Record<number, string> = {
      1: 'Unbalanced 1.0',
      2: 'Modest 2.0',
      3: 'Refined 3.0',
      4: 'Distinguished 4.0',
      5: 'Flawless 5.0'
    };

    const newRecord: TastingRecord = {
      id: `tast-${Date.now()}`,
      coffeeName: newCoffeeName.trim(),
      tag: newCoffeeTag,
      curatedProfile: newProfile.trim() || 'Velvety body with subtle floral acidity and dark honey nuances.',
      dateStr: `Tasted today at Mayfair Cellar`,
      rating: newRating,
      ratingLabel: ratingLabels[newRating] || 'Distinguished'
    };

    setTastingLogs([newRecord, ...tastingLogs]);
    setIsNewTastingModalOpen(false);
    setNewCoffeeName('');
    setNewProfile('');
    showToast('Tasting notes added to your digital sommelier sheet.');
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Fixed Left Sidebar on desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-surface-container-low z-40 flex-col justify-between py-6 border-r border-outline-variant/30 shadow-[0_1px_8px_rgba(58,48,42,0.04)]">
        <div className="px-6">
          {/* Monogram Brand Header */}
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              alt="Gent & Bean Monogram Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgqVU4_PN27rMw7D_5dUYey7imv3-KE14HUSt7MqUouegON2Mk5g1lZqB907XLw0Z6hypCub6bZqK0nfQv2tJNqPpgtf3bVa6D4LY2aRsBJjEsv_kHG4EwUXM81VKlqJv0LN_RHJpLpo5LCaHCes4-a91N7g--96neXn_GitvtRuzyjsjCLcprxeHTK4mw65d6Kni2Qow4G5stLO7COudNs-BxPoouJrXY6XaX0PmRnwqXB2SiAB9F"
            />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-base tracking-wider text-on-surface uppercase leading-tight">
                Gent &amp; Bean
              </span>
              <span className="text-[9px] tracking-widest uppercase text-on-surface-variant font-semibold">
                Private Lounge
              </span>
            </div>
          </div>

          {/* Patron Card */}
          <div
            className="mb-6 p-3 bg-surface-container rounded-lg border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
            onClick={() => openAuthModal('login')}
          >
            <div className="flex items-center gap-3">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-fixed"
                src={
                  currentUser?.avatarUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5ZZwkOmbL5Oqq_N_ScLXHy1p7PxE9nfHjCjJ9uLztJvqN3WeNd283PhIFIhX6yAZovmnLCr-fu24lrte_vaz2BF5yHGvYy4uHChJ7PuRHiBcRgcenJPjYyU8ihmzN7J3Z5CZyxBdPa4UWeWyc43_11_UCNlTGWxLBEiI1dz2m2KQD4QfUsmLdKo3gWSNKVzsobucyI_-zs5wKtPD1cmf0KvyQ8bU9i7Jti-9UYDVqoEmMfYKyWzz'
                }
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface leading-tight">
                  {currentUser ? currentUser.name : 'Lord Sterling'}
                </span>
                <span className="text-[10px] text-primary font-medium">
                  {currentUser ? currentUser.memberTier : 'Gold Roastery Member'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-surface-container-highest text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Lounge Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('allocations')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'allocations'
                  ? 'bg-surface-container-highest text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">coffee</span>
              <span>Monthly Allocations</span>
            </button>
            <button
              onClick={() => setActiveTab('cellar')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'cellar'
                  ? 'bg-surface-container-highest text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">local_bar</span>
              <span>Tasting Cellar</span>
            </button>
            <button
              onClick={() => setActiveTab('dispatches')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'dispatches'
                  ? 'bg-surface-container-highest text-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              <span>Past Dispatches</span>
            </button>
            <button
              onClick={() => openAuthModal('login')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-lg">manage_accounts</span>
              <span>Member Settings</span>
            </button>
          </nav>
        </div>

        <div className="px-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 lg:pl-64 flex flex-col w-full">
        {/* Top Header Strip */}
        <header className="sticky top-0 h-16 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 z-30 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
              Club Room Tier:
            </span>
            <span className="text-xs font-bold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
              Privileged Tier III
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('checkout-&-order')}
              className="flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container px-3 py-1.5 rounded-lg text-xs font-medium text-on-surface transition-colors border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-base text-primary">local_mall</span>
              <span>View Active Orders</span>
            </button>
            <div className="h-5 w-px bg-surface-container-high"></div>
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-2"
              title="Patron Profile"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed"
                src={
                  currentUser?.avatarUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5ZZwkOmbL5Oqq_N_ScLXHy1p7PxE9nfHjCjJ9uLztJvqN3WeNd283PhIFIhX6yAZovmnLCr-fu24lrte_vaz2BF5yHGvYy4uHChJ7PuRHiBcRgcenJPjYyU8ihmzN7J3Z5CZyxBdPa4UWeWyc43_11_UCNlTGWxLBEiI1dz2m2KQD4QfUsmLdKo3gWSNKVzsobucyI_-zs5wKtPD1cmf0KvyQ8bU9i7Jti-9UYDVqoEmMfYKyWzz'
                }
              />
            </button>
          </div>
        </header>

        {/* Lounge Content Body */}
        <main className="w-full px-6 lg:px-8 py-8 space-y-10">
          {/* Header & Concierge Welcome Banner */}
          <section className="relative rounded-2xl bg-surface-container p-8 lg:p-10 shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none pr-6 pb-4">
              <span className="font-headline text-9xl italic font-serif text-on-surface select-none">
                GB
              </span>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    Grand Reserve Patron • Year 3
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium tracking-wide">
                    Privileged Atelier No. 042
                  </span>
                </div>
                <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-on-surface leading-tight">
                  Good morning,{' '}
                  <span className="italic font-serif">
                    {currentUser ? currentUser.name : 'Lord Sterling'}
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-on-surface-variant font-light leading-relaxed max-w-xl">
                  The Mayfair hearth is stoked, and your bespoke copper cellar locker is stocked. Your
                  roasted harvest awaits dispatch for this Thursday&apos;s tasting salon.
                </p>
              </div>

              {/* Quick Action / Morning Brew Pill */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start lg:self-center">
                <button
                  type="button"
                  onClick={handleQuickOrder}
                  className="group flex items-center justify-between gap-4 px-5 py-3.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-md transition-all duration-300 active:scale-95"
                >
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-surface/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-base">local_cafe</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold opacity-80">
                        One-Click Request
                      </p>
                      <p className="text-xs font-bold leading-tight">Double Mayfair Flat White</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">
                    bolt
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Stats Metric Band */}
            <div className="mt-8 pt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 bg-surface-container-low/70 rounded-xl p-5 shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                    Society Credits
                  </p>
                  <p className="font-headline text-2xl font-bold text-on-surface leading-tight font-mono">
                    ${currentUser ? currentUser.societyCredits.toFixed(2) : '142.00'}
                  </p>
                  <span className="text-[10px] text-primary font-medium tracking-tight">
                    + $25 reload bonus active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">grain</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                    Beans Roasted
                  </p>
                  <p className="font-headline text-2xl font-bold text-on-surface leading-tight font-mono">
                    {currentUser ? currentUser.beansRoastedKg : 14.8}{' '}
                    <span className="text-sm font-sans font-normal text-on-surface-variant">kg</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant">Lifetime patron yield</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">chair</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                    Atelier Visits
                  </p>
                  <p className="font-headline text-2xl font-bold text-on-surface leading-tight font-mono">
                    {currentUser ? currentUser.visits : 8}{' '}
                    <span className="text-sm font-sans font-normal text-on-surface-variant">visits</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant">Current monthly cycle</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl">emoji_food_beverage</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                    Lounge Cups
                  </p>
                  <p className="font-headline text-2xl font-bold text-on-surface leading-tight font-mono">
                    {currentUser ? currentUser.loungeCupsRemaining : 4}{' '}
                    <span className="text-sm font-sans font-normal text-on-surface-variant">remaining</span>
                  </p>
                  <span className="text-[10px] text-on-surface-variant">Renews on 1st of month</span>
                </div>
              </div>
            </div>
          </section>

          {/* Toast Alert */}
          {toastMessage && (
            <div className="transition-all duration-300 rounded-xl bg-surface-container-highest p-4 text-xs text-on-surface shadow-md flex items-center justify-between border border-primary/30 animate-in fade-in">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                <span className="font-medium">{toastMessage}</span>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface text-xs font-semibold"
                onClick={() => setToastMessage(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Main Atelier Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (Span 7): Core Roastery Allocation & Tasting Vault */}
            <div className="lg:col-span-7 space-y-8">
              {/* Module A: Active Monthly Bean Allocation */}
              <section className="rounded-2xl bg-surface-container p-6 lg:p-7 shadow-sm relative overflow-hidden border border-outline-variant/30">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                    <h2 className="font-headline text-xl lg:text-2xl font-bold text-on-surface tracking-tight">
                      Active Allocation
                    </h2>
                  </div>
                  <span className="text-[11px] tracking-widest uppercase font-semibold text-primary bg-primary-fixed px-2.5 py-1 rounded-md">
                    Batch #84
                  </span>
                </div>

                {/* Allocation Card */}
                <div className="rounded-xl bg-surface-container-lowest p-5 lg:p-6 shadow-sm space-y-6 border border-outline-variant/30">
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <img
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-sm shrink-0"
                      alt="Two vintage luxury embossed metallic bronze coffee canisters"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9geICC_mv6-PGco_5YBuIXX_f5uOIjUSH1wiIu0UkRzUa6sKfT4l3rtNWtmqcFYJ2C3xABgr1qxJMKWB9KNKsoVEuAn4ky-WQtx3otBoiL5ykgT3-3d4wDI_Kysr5P8QFkvqMThZoQuFt0LRImBpCk9uLpIjaOjITd0IgvcB6JHLL5Dy9QuN46zx5Gr2Rfs_-A_Rfjf4IlRUfXRn_66C-6M1onX7EjDFOqRPAvgJg3OuWDCNVIVSd"
                    />
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">
                          Rare Terroir Pick
                        </span>
                        <span className="text-on-surface-variant text-xs">•</span>
                        <span className="text-[10px] font-medium text-on-surface-variant font-mono">
                          Lot #084-PAN
                        </span>
                      </div>
                      <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface truncate">
                        Geisha Washed Panama, Finca Sophia
                      </h3>
                      <p className="text-xs text-on-surface-variant font-light">
                        2x 250g Nitrogen-Flushed Lacquered Brass Tins • Whole Bean Estate Select
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[11px] font-semibold text-primary">
                          Roasting in Mayfair Roastery — Ships Thursday
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Roasting Progress Micro-Chart */}
                  <div className="p-4 rounded-lg bg-surface-container-low space-y-3 border border-outline-variant/30">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant font-medium">
                        Roast Profile Stage: Development Phase
                      </span>
                      <span className="font-bold text-on-surface">82% Prepared</span>
                    </div>
                    <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-on-surface-variant">
                      <span>Lot Sorting • Done</span>
                      <span className="font-semibold text-primary">Custom Drum Roast • In Progress</span>
                      <span>Tinning &amp; Dispatch</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface-variant">Grind Specification:</span>
                      <span className="text-xs font-bold text-on-surface bg-surface-container px-2 py-0.5 rounded">
                        {grindSpec}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsGrindModalOpen(true)}
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors shadow-sm"
                      >
                        Adjust Grind / Skip Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Module B: Tasting Cellar Archives */}
              <section className="rounded-2xl bg-surface-container p-6 lg:p-7 shadow-sm border border-outline-variant/30">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">local_bar</span>
                    <h2 className="font-headline text-xl lg:text-2xl font-bold text-on-surface tracking-tight">
                      Tasting Cellar Archives
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsNewTastingModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span>Log New Tasting</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {tastingLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-surface-container-low/40 border border-outline-variant/30"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-on-surface tracking-wide">
                            {log.coffeeName}
                          </span>
                          <span className="text-[10px] text-on-surface-variant uppercase tracking-widest bg-surface-container px-2 py-0.5 rounded">
                            {log.tag}
                          </span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          <span className="font-semibold text-on-surface">Curated Profile:</span>{' '}
                          {log.curatedProfile}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                          <span className="material-symbols-outlined text-xs">calendar_today</span>
                          <span>{log.dateStr}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1.5">
                        <div className="flex text-primary">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`material-symbols-outlined text-base ${
                                star <= log.rating ? 'text-primary' : 'text-surface-container-highest'
                              }`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                          {log.ratingLabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 flex justify-center">
                  <button
                    onClick={() => onNavigate('artisanal-menu')}
                    className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1"
                  >
                    <span>Explore All 38 Sommelier Archives</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column (Span 5): Atelier Gatherings & Reserve Drops */}
            <div className="lg:col-span-5 space-y-8">
              {/* Module C: Atelier Gatherings */}
              <section className="rounded-2xl bg-surface-container p-6 lg:p-7 shadow-sm border border-outline-variant/30">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">event_seat</span>
                    <h2 className="font-headline text-xl lg:text-2xl font-bold text-on-surface tracking-tight">
                      Atelier Gatherings
                    </h2>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">Mayfair Study</span>
                </div>

                <div className="space-y-4">
                  {ATELIER_GATHERINGS.map((gath) => (
                    <div
                      key={gath.id}
                      className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-outline-variant/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              gath.type === 'Masterclass Flight'
                                ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                                : 'bg-secondary-fixed text-on-secondary-fixed'
                            }`}
                          >
                            {gath.type}
                          </span>
                          <h3 className="font-headline text-base font-bold text-on-surface leading-snug">
                            {gath.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs font-bold text-primary">{gath.dateStr}</span>
                          <span className="text-[10px] text-on-surface-variant">{gath.timeStr}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 bg-surface-container-low px-3 py-2 rounded-lg">
                        <span className="flex items-center gap-1.5 text-on-surface">
                          <span className="material-symbols-outlined text-sm text-primary">
                            {gath.type === 'Masterclass Flight' ? 'how_to_reg' : 'groups'}
                          </span>
                          <span className="font-medium">{gath.statusText}</span>
                        </span>
                        <span className="text-on-surface-variant text-[11px]">{gath.location}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => showToast('Private salon reservation request sent to Mayfair concierge.')}
                  className="w-full mt-4 py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface text-xs font-bold tracking-wide transition-colors"
                >
                  Request Bespoke Private Salon Booking
                </button>
              </section>

              {/* Module D: Exclusive Members-Only Reserve Drops */}
              <section className="rounded-2xl bg-surface-container p-6 lg:p-7 shadow-sm relative border border-outline-variant/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">stars</span>
                    <h2 className="font-headline text-xl lg:text-2xl font-bold text-on-surface tracking-tight">
                      Society Reserve Drops
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary animate-pulse">
                    Vault Open
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant font-light mb-4">
                  Strictly limited micro-lots reserved exclusively for Grand Reserve members prior to public
                  cellar auction.
                </p>

                {/* Drop Highlight Card */}
                {SOCIETY_RESERVE_DROPS.map((drop) => (
                  <div
                    key={drop.id}
                    className="rounded-xl bg-surface-container-lowest p-4 shadow-sm space-y-4 border border-outline-variant/30"
                  >
                    <div className="relative rounded-lg overflow-hidden h-36 bg-surface-container-high">
                      <img className="w-full h-full object-cover" alt={drop.name} src={drop.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[11px] font-bold text-surface-container-lowest tracking-wide bg-on-surface/60 backdrop-blur-md px-2.5 py-1 rounded">
                          Allocation: {drop.remainingTins} Tins Left Worldwide
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-headline text-base font-bold text-on-surface">{drop.name}</h3>
                        <span className="text-xs font-bold text-primary font-headline">
                          ${drop.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                        {drop.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <div className="text-[11px] text-on-surface-variant">
                        <span>Limit: {drop.limitPerPatron} per Patron</span>
                      </div>
                      <button
                        onClick={handleClaimDrop}
                        disabled={dropClaimed}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide shadow-sm transition-colors ${
                          dropClaimed
                            ? 'bg-surface-container-highest text-on-surface cursor-default'
                            : 'bg-primary hover:bg-primary-container text-on-primary'
                        }`}
                      >
                        {dropClaimed ? 'Allocation Reserved' : 'Claim Allocation'}
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>

          {/* Quiet Atmosphere & Curated Philosophy Footer Callout */}
          <div className="rounded-xl bg-surface-container-low p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              <span>
                Mayfair Atelier Protocol: All roast allocations are packaged in zero-oxygen nitrogen seal
                within 4 hours of heat cessation.
              </span>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <span className="font-medium text-on-surface">Concierge Hotline: +44 (0) 20 7946 0912</span>
              <a className="text-primary hover:underline font-semibold" href="#charter">
                Society Charter
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* Adjust Grind Modal */}
      {isGrindModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsGrindModalOpen(false)}
        >
          <div
            className="bg-surface rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-headline text-2xl font-bold text-on-surface mb-2">Adjust Allocation</h4>
            <p className="text-xs text-on-surface-variant mb-4">
              Select your burr calibration for the upcoming Thursday dispatch:
            </p>
            <div className="space-y-2 mb-6">
              {[
                'Whole Bean (Aura V60)',
                'Medium-Coarse (Chemex / Kalita)',
                'Fine Ristretto (Espresso Machine)',
                'Coarse Grind (French Press / Cupping)'
              ].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border text-xs font-medium transition-colors ${
                    grindSpec === opt
                      ? 'bg-surface-container-high border-primary text-on-surface font-semibold'
                      : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
                  }`}
                >
                  <span>{opt}</span>
                  <input
                    type="radio"
                    name="grind-opt"
                    checked={grindSpec === opt}
                    onChange={() => setGrindSpec(opt)}
                    className="accent-primary"
                  />
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsGrindModalOpen(false);
                  showToast(`Grind specification updated to: ${grindSpec}`);
                }}
                className="flex-1 py-2.5 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setIsGrindModalOpen(false)}
                className="px-4 py-2.5 bg-surface-container text-on-surface text-xs font-semibold rounded-lg hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log New Tasting Modal */}
      {isNewTastingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsNewTastingModalOpen(false)}
        >
          <div
            className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-headline text-2xl font-bold text-on-surface">Log Tasting Notes</h4>
              <button
                onClick={() => setIsNewTastingModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveTastingLog} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Coffee / Lot Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Panama Geisha Finca Sophia"
                  value={newCoffeeName}
                  onChange={(e) => setNewCoffeeName(e.target.value)}
                  className="w-full bg-surface-container-lowest text-xs rounded-lg px-3.5 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Roast Category
                </label>
                <select
                  value={newCoffeeTag}
                  onChange={(e) => setNewCoffeeTag(e.target.value)}
                  className="w-full bg-surface-container-lowest text-xs rounded-lg px-3.5 py-2.5 text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
                >
                  <option value="Single Origin">Single Origin</option>
                  <option value="Aged Barrel">Aged Barrel</option>
                  <option value="Heirloom Lot">Heirloom Lot</option>
                  <option value="Rare Terroir">Rare Terroir</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Sommelier Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${
                          star <= newRating ? 'text-primary' : 'text-surface-container-highest'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-on-surface ml-2">
                    {newRating}.0 / 5.0
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                  Tasting Observations
                </label>
                <textarea
                  rows={3}
                  placeholder="Notes on mouthfeel, sweetness, acidity, jasmine florals, oak undertones..."
                  value={newProfile}
                  onChange={(e) => setNewProfile(e.target.value)}
                  className="w-full bg-surface-container-lowest text-xs rounded-lg p-3 text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors shadow-md"
              >
                Record in Private Cellar Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
