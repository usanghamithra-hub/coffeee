import React, { useState, useMemo } from 'react';
import { Screen, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/coffeeData';

interface MenuScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigate }) => {
  const { addToCart, activeOrigin, setActiveOrigin } = useCart();

  // Calibration origin selector
  const [selectedOriginKey, setSelectedOriginKey] = useState<'ethiopia' | 'guatemala' | 'swiss-water'>('ethiopia');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilters, setDietaryFilters] = useState<{
    oat: boolean;
    decaf: boolean;
    sugarFree: boolean;
  }>({
    oat: false,
    decaf: false,
    sugarFree: false
  });

  const originDetails = {
    ethiopia: {
      title: 'Ethiopia Guji Reserve',
      descriptor: 'Grown at 2,100m • Jasmine blossom, bergamot & raw cane sugar note.'
    },
    guatemala: {
      title: 'Guatemala Antigua',
      descriptor: 'Rich volcanic shade • Dark dark chocolate, roasted macadamia & blood orange.'
    },
    'swiss-water': {
      title: 'Swiss Water Decaf',
      descriptor: '99.9% caffeine-free • Mountain stream washed, notes of cocoa nibs & dried plum.'
    }
  };

  const handleSelectOrigin = (key: 'ethiopia' | 'guatemala' | 'swiss-water') => {
    setSelectedOriginKey(key);
    setActiveOrigin(originDetails[key].title);
  };

  const toggleDietary = (type: 'oat' | 'decaf' | 'sugarFree') => {
    setDietaryFilters((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Filter items based on category and dietary preferences
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Exclude featured hero from grid or keep in grid
      if (item.featured && activeCategory === 'all' && !dietaryFilters.oat && !dietaryFilters.decaf && !dietaryFilters.sugarFree) {
        // Shown in masterwork hero above
        return false;
      }

      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      if (dietaryFilters.oat && !item.dietary?.includes('oat')) {
        return false;
      }
      if (dietaryFilters.decaf && !item.dietary?.includes('decaf')) {
        return false;
      }
      if (dietaryFilters.sugarFree && !item.dietary?.includes('sugar-free')) {
        return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilters]);

  const featuredMasterwork = MENU_ITEMS.find((i) => i.featured) || MENU_ITEMS[0];

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Subtle ambient decorative glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-80 -left-20 w-80 h-80 bg-tertiary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        {/* Editorial Section Overline & Intro Header */}
        <section className="pt-6 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-primary">
                Curation № IV
              </span>
              <span className="w-8 h-px bg-outline-variant"></span>
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">
                Autumn / Winter Release
              </span>
            </div>
            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight font-normal leading-none">
              The Atelier Menu
            </h1>
            <p className="mt-4 text-sm sm:text-base text-on-surface-variant max-w-xl font-light leading-relaxed">
              Meticulously sourced single-estate micro-lots, bespoke barrel extractions, and viennoiserie
              baked at dawn in our Mayfair kitchen.
            </p>
          </div>

          {/* Origin Roast Calibration Pill */}
          <div className="bg-surface-container-low rounded-xl p-3 sm:p-4 shadow-sm max-w-md border border-outline-variant/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-on-surface-variant">
                Guild Roast Calibration
              </span>
              <span className="text-[10px] font-mono text-primary font-bold">BATCH #882</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container rounded-lg text-[11px] font-medium">
              <button
                type="button"
                onClick={() => handleSelectOrigin('ethiopia')}
                className={`py-1.5 px-2 rounded text-center transition-all ${
                  selectedOriginKey === 'ethiopia'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Ethiopia Guji
              </button>
              <button
                type="button"
                onClick={() => handleSelectOrigin('guatemala')}
                className={`py-1.5 px-2 rounded text-center transition-all ${
                  selectedOriginKey === 'guatemala'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Guatemala
              </button>
              <button
                type="button"
                onClick={() => handleSelectOrigin('swiss-water')}
                className={`py-1.5 px-2 rounded text-center transition-all ${
                  selectedOriginKey === 'swiss-water'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Swiss Decaf
              </button>
            </div>
            <p className="mt-2 text-[10px] text-on-surface-variant leading-tight flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-xs text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span>{originDetails[selectedOriginKey].descriptor}</span>
            </p>
          </div>
        </section>

        {/* Category Filter Navigation Tabs */}
        <section className="sticky top-20 z-40 bg-surface/95 backdrop-blur-md py-4 mb-8 border-b border-outline-variant/30">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 shrink-0">
              {[
                { id: 'all', label: 'All Offerings' },
                { id: 'espresso', label: 'Espresso & Ristretto' },
                { id: 'slow-drip', label: 'Slow Drip & Filter' },
                { id: 'cold-brew', label: 'Cold Brew & Nitro' },
                { id: 'tea', label: 'Specialty Tea & Infusions' },
                { id: 'pastries', label: 'Atelier Pastries & Savory' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`text-xs px-4 py-2 rounded-lg transition-all ${
                    activeCategory === tab.id
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Dietary Preference Indicators */}
            <div className="hidden xl:flex items-center gap-3 shrink-0 pl-4">
              <button
                onClick={() => toggleDietary('oat')}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                  dietaryFilters.oat
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'text-on-surface-variant bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    dietaryFilters.oat ? 'bg-primary' : 'bg-secondary-fixed-dim'
                  }`}
                ></span>
                <span>Barista Oat</span>
              </button>
              <button
                onClick={() => toggleDietary('decaf')}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                  dietaryFilters.decaf
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'text-on-surface-variant bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    dietaryFilters.decaf ? 'bg-primary' : 'bg-secondary-fixed-dim'
                  }`}
                ></span>
                <span>Mountain Water Decaf</span>
              </button>
              <button
                onClick={() => toggleDietary('sugarFree')}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all ${
                  dietaryFilters.sugarFree
                    ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                    : 'text-on-surface-variant bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    dietaryFilters.sugarFree ? 'bg-primary' : 'bg-secondary-fixed-dim'
                  }`}
                ></span>
                <span>Zero Cane Refined</span>
              </button>
            </div>
          </div>
        </section>

        {/* Featured Masterwork Hero Banner (Curated Highlight) */}
        {activeCategory === 'all' && (
          <section className="mb-14 bg-surface-container-low rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary-fixed text-on-primary-fixed text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 rounded">
                      {featuredMasterwork.badge}
                    </span>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Extracted at 18.5 bar
                    </span>
                  </div>
                  <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal tracking-tight leading-tight mb-4">
                    {featuredMasterwork.name}
                  </h2>
                  <p className="text-sm sm:text-base text-on-surface-variant font-light leading-relaxed mb-6 max-w-lg">
                    {featuredMasterwork.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-on-surface-variant mb-8">
                    <span className="bg-surface-container px-3 py-1.5 rounded-lg text-on-surface">
                      V60 Precision Ceremony
                    </span>
                    <span className="bg-surface-container px-3 py-1.5 rounded-lg text-on-surface">
                      93.5°C Pure Spring Extraction
                    </span>
                    <span className="bg-surface-container px-3 py-1.5 rounded-lg text-on-surface">
                      Cardamom • Dark Honey • Blackcurrant
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-start sm:gap-6 pt-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant block">
                      Single Origin
                    </span>
                    <span className="font-headline text-3xl font-bold text-on-surface">
                      ${featuredMasterwork.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      addToCart(featuredMasterwork.name, featuredMasterwork.price, 'V60 Table-side Ceremony')
                    }
                    className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-6 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">local_cafe</span>
                    <span>Request Pour-Over</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[320px] relative overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Artisan copper V60 pour over"
                  src={featuredMasterwork.image}
                />
                <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm text-[11px] font-mono text-on-surface flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span>Live Cupping Score: {featuredMasterwork.cuppingScore}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Artisanal Menu Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-low rounded-2xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30"
            >
              <div>
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-5 bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    alt={item.name}
                    src={item.image}
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-on-surface px-2.5 py-1 rounded shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-headline text-2xl text-on-surface font-normal">{item.name}</h3>
                  <span className="font-headline text-xl font-bold text-on-surface font-mono">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-surface-container text-on-surface-variant font-medium px-2 py-0.5 rounded"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant font-mono">{item.specs}</span>
                <button
                  onClick={() => addToCart(item.name, item.price, item.specs)}
                  className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                >
                  <span>Add to Tray</span>
                  <span className="material-symbols-outlined text-xs">add</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Sensory Atelier Story & Extraction Visualizer */}
        <section className="mt-20 bg-surface-container-low rounded-2xl p-8 sm:p-12 shadow-sm border border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-primary block mb-2">
                The Extraction Guild
              </span>
              <h3 className="font-headline text-3xl sm:text-4xl text-on-surface font-normal leading-tight mb-4">
                Precision in Every Micron &amp; Degree
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 font-light">
                We monitor total dissolved solids (TDS) and mineral content in our Mayfair water
                filtration manifold to achieve a balanced 19.8% extraction yield across our brass Slayer
                levers.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-headline text-2xl font-bold text-on-surface block">93.5°C</span>
                  <span className="text-[10px] tracking-wider uppercase text-on-surface-variant font-medium">
                    Brew Temp
                  </span>
                </div>
                <div className="w-px h-8 bg-surface-container-high"></div>
                <div>
                  <span className="font-headline text-2xl font-bold text-on-surface block">1.35%</span>
                  <span className="text-[10px] tracking-wider uppercase text-on-surface-variant font-medium">
                    Optimal TDS
                  </span>
                </div>
                <div className="w-px h-8 bg-surface-container-high"></div>
                <div>
                  <span className="font-headline text-2xl font-bold text-on-surface block">1:2.1</span>
                  <span className="text-[10px] tracking-wider uppercase text-on-surface-variant font-medium">
                    Espresso Ratio
                  </span>
                </div>
              </div>
            </div>

            {/* Inline Data Visualization: Extraction Harmony Curve */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-on-surface">Extraction Harmony Curve</span>
                <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                  Ideal Window: 18% - 22%
                </span>
              </div>
              <div className="w-full h-32 flex items-end">
                <svg className="w-full h-28 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 100">
                  {/* Under-extracted zone */}
                  <rect fill="#eae2da" height="100" opacity="0.4" width="125" x="0" y="0"></rect>
                  {/* Golden extraction sweetspot */}
                  <rect fill="#fbe8d8" height="100" opacity="0.6" width="250" x="125" y="0"></rect>
                  {/* Over-extracted zone */}
                  <rect fill="#eae2da" height="100" opacity="0.4" width="125" x="375" y="0"></rect>
                  {/* Gentle spline wave */}
                  <path
                    d="M 0 90 Q 75 80, 150 45 T 250 15 T 350 48 T 500 88"
                    fill="none"
                    stroke="#c2652a"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  ></path>
                  {/* Target focal point */}
                  <circle cx="250" cy="15" fill="#c2652a" r="4.5"></circle>
                  <circle cx="250" cy="15" fill="#c2652a" opacity="0.25" r="8"></circle>
                </svg>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant mt-2 pt-2 border-t border-outline-variant/20">
                <span>Sour / Under (14%)</span>
                <span className="text-primary font-bold">Gent &amp; Bean Sweetspot (19.8%)</span>
                <span>Bitter / Over (24%)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
