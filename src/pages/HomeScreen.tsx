import React, { useState } from 'react';
import { Screen } from '../types';
import { useCart } from '../context/CartContext';
import { DAILY_ROASTS } from '../data/coffeeData';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();

  // Extraction selector in Weekly Reserve
  const [selectedBrew, setSelectedBrew] = useState<{
    method: 'pour-over' | 'siphon' | 'cold-drip';
    title: string;
    specs: string;
  }>({
    method: 'pour-over',
    title: 'V60 Chemex Slow Pour',
    specs: '92°C | 1:16 Ratio | 3m 45s flow rate'
  });

  // Modal order state
  const [orderModalItem, setOrderModalItem] = useState<{
    name: string;
    price: number;
    serviceOption: 'table' | 'takeaway';
  } | null>(null);

  const [orderSuccess, setOrderSuccess] = useState(false);

  // Guild allocation subscription state
  const [guildEmail, setGuildEmail] = useState('');
  const [guildSubmitted, setGuildSubmitted] = useState(false);

  const handleAcquireReserveLot = () => {
    addToCart(
      'Ethiopian Yirgacheffe Heirloom (Reserve Tin)',
      34.00,
      `Weekly Reserve Lot • Extraction: ${selectedBrew.title}`
    );
  };

  const handleOpenOrderModal = (name: string, price: number) => {
    setOrderModalItem({
      name,
      price,
      serviceOption: 'table'
    });
    setOrderSuccess(false);
  };

  const handleConfirmOrderModal = () => {
    if (!orderModalItem) return;
    addToCart(
      orderModalItem.name,
      orderModalItem.price,
      orderModalItem.serviceOption === 'table' ? 'Table Service' : 'Curbside / Takeaway'
    );
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderModalItem(null);
      setOrderSuccess(false);
    }, 2000);
  };

  const handleGuildSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guildEmail.includes('@')) return;
    setGuildSubmitted(true);
    setGuildEmail('');
    setTimeout(() => {
      setGuildSubmitted(false);
    }, 6000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Hero Stage */}
      <section className="relative w-full overflow-hidden bg-surface-container-low px-6 lg:px-12 pt-12 pb-24">
        {/* Subtle warmth radial diffusion */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] rounded-full bg-surface-tint/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Monogram & Overline */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary"></span>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                Mayfair Roastery • London W1
              </span>
            </div>

            <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-on-surface mb-6">
              Distinguished Roasts for the{' '}
              <span className="italic font-light text-primary">Modern Gentleman.</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-on-surface-variant max-w-xl font-normal leading-relaxed mb-10">
              Small-batch single origins, slow pour-overs, and warm oak-paneled sanctuary. Roasted daily in
              our Mayfair atelier with uncompromising rigor and classical finesse.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={() => onNavigate('artisanal-menu')}
                className="px-8 py-4 bg-on-surface text-surface font-body text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-primary transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2 group"
              >
                <span>Explore Artisanal Menu</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                onClick={() => onNavigate('member-lounge')}
                className="px-7 py-4 bg-surface-container-lowest text-on-surface hover:text-primary font-body text-sm font-semibold tracking-wider uppercase rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Reserve Tasting Table
              </button>
            </div>

            {/* 3 Metric Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 bg-surface-container/60 p-6 rounded-xl backdrop-blur-sm max-w-2xl border border-outline-variant/30">
              <div className="flex flex-col">
                <span className="font-headline text-2xl lg:text-3xl text-on-surface font-semibold tracking-tight">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant mt-1 font-medium">
                  Single Origin Arabica
                </span>
              </div>
              <div className="flex flex-col pl-4 border-l border-outline-variant/40">
                <span className="font-headline text-2xl lg:text-3xl text-primary font-semibold tracking-tight">
                  28 Days
                </span>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant mt-1 font-medium">
                  Oak-Barrel Rested
                </span>
              </div>
              <div className="flex flex-col pl-4 border-l border-outline-variant/40">
                <div className="flex items-center gap-1">
                  <span className="font-headline text-2xl lg:text-3xl text-on-surface font-semibold tracking-tight">
                    4.98
                  </span>
                  <span
                    className="material-symbols-outlined text-sm text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant mt-1 font-medium">
                  2,400+ Patrons
                </span>
              </div>
            </div>
          </div>

          {/* Right Feature Mosaic / Origin Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container-lowest p-5 sm:p-7 rounded-2xl shadow-xl flex flex-col gap-6 border border-outline-variant/30">
              {/* Image Container with Scrim & Tag */}
              <div className="relative w-full h-80 rounded-xl overflow-hidden group">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Ethiopian Yirgacheffe Heirloom beans in brass scale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaghr82Ty6OS36l619iVnfaa8Hq6mP1uEegTSe-NoA_1SW3S3xkVm9nGs0oKpi5rfpTuJFcCRAHT2fwBuTppuncpwTWQZZyr6gsYctsGk5dRF6hL8RnozUAkVKZWvkfi77-_fKsGA-dH1Tah9uMAJ9DUrop63jKQ9rzLJ-cYbmsaprPFMviNd8auTT1wcaU1RjX4-s5BnXE0eYg8Mr9ZR1hbBOkOxFziy5tBa_9p7UXBX92pvy4B-g"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">
                    Weekly Reserve Lot
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-surface">
                  <span className="text-xs uppercase tracking-widest text-primary-fixed-dim font-medium block">
                    Elevation 2,150m • Washed
                  </span>
                  <h3 className="font-headline text-2xl font-bold leading-tight mt-0.5">
                    Ethiopian Yirgacheffe Heirloom
                  </h3>
                </div>
              </div>

              {/* Origin Detail & Interactive Recommendation */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-on-surface-variant">
                    Cupping Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface-container-high text-on-surface">
                      Bergamot Peel
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface-container-high text-on-surface">
                      Dark 85% Cacao
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-surface-container-high text-on-surface">
                      Night Jasmine
                    </span>
                  </div>
                </div>

                {/* Interactive Brew Method Selector */}
                <div className="pt-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-medium text-on-surface-variant">Recommended Extraction:</span>
                    <span className="font-semibold text-primary">{selectedBrew.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBrew({
                          method: 'pour-over',
                          title: 'V60 Chemex Slow Pour',
                          specs: '92°C | 1:16 Ratio | 3m 45s flow rate'
                        })
                      }
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
                        selectedBrew.method === 'pour-over'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Pour Over
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBrew({
                          method: 'siphon',
                          title: 'Siphon Vacuum Pot',
                          specs: '94°C | 1:15 Ratio | 2m 10s flow rate'
                        })
                      }
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
                        selectedBrew.method === 'siphon'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Siphon
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedBrew({
                          method: 'cold-drip',
                          title: 'Aged Cold Press',
                          specs: '4°C | 18h Extraction | Charred Oak'
                        })
                      }
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
                        selectedBrew.method === 'cold-drip'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      Cold Drip
                    </button>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/80 tracking-wide mt-2.5 font-mono">
                    {selectedBrew.specs}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block">
                      Allocation Remaining
                    </span>
                    <span className="font-headline font-bold text-lg text-on-surface">14 of 40 Tins</span>
                  </div>
                  <button
                    onClick={handleAcquireReserveLot}
                    className="px-5 py-2.5 bg-primary text-on-primary text-xs uppercase font-semibold tracking-wider rounded-lg hover:bg-primary-container transition-colors shadow-sm active:scale-95"
                  >
                    Acquire Lot — $34
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Daily Roasts Section */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-primary">
                Master Roaster&apos;s Selection
              </span>
            </div>
            <h2 className="font-headline text-4xl sm:text-5xl font-normal text-on-surface tracking-tight">
              Curated Daily Roasts
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
              Pulled with unswerving precision using custom Kees van der Westen machines and hand-calibrated
              water chemistry.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-on-surface-variant font-medium">
              Brewing today: <strong className="text-on-surface">Batch #812</strong>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-primary-fixed text-on-primary-fixed">
              Fresh Cut
            </span>
          </div>
        </div>

        {/* 3 Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DAILY_ROASTS.map((roast) => (
            <div
              key={roast.id}
              className="group bg-surface-container-low rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative border border-outline-variant/30"
            >
              {roast.badge && (
                <div className="absolute -top-3 left-8 bg-primary text-on-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  {roast.badge}
                </div>
              )}
              <div>
                {/* Image preview */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={roast.name}
                    src={roast.image}
                  />
                  <div className="absolute top-3 right-3 bg-on-surface/90 backdrop-blur-md text-surface font-headline font-bold text-lg px-3 py-1 rounded-lg">
                    ${roast.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                    {roast.type}
                  </span>
                  {/* Roast Strength Meter */}
                  <div
                    className="flex items-center gap-1"
                    title={`Roast Strength: ${roast.strength}/5`}
                  >
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={`w-2 h-2 rounded-full ${
                          dot <= roast.strength ? 'bg-primary' : 'bg-surface-container-highest'
                        }`}
                      ></span>
                    ))}
                  </div>
                </div>

                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{roast.name}</h3>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                  {roast.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {roast.notes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-surface-container-lowest px-2.5 py-1 rounded-md text-on-surface-variant font-medium border border-outline-variant/20"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 bg-surface-container-lowest hover:bg-primary text-on-surface hover:text-on-primary font-body text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm border border-outline-variant/30"
                onClick={() => handleOpenOrderModal(roast.name, roast.price)}
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Order to Table / Takeaway</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* The Atelier Experience Story Section */}
      <section className="w-full bg-surface-container-high py-24 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Editorial Story */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary mb-3">
              The Mayfair Sanctuary
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl font-normal text-on-surface tracking-tight leading-[1.1] mb-6">
              A Quiet Sanctuary <br className="hidden sm:block" />
              in the Heart of the City.
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6">
              Step off the quickened rhythm of St. Swithin&apos;s Lane and cross the brass threshold into
              deliberate calm. Gent &amp; Bean was conceived not simply as an artisanal roastery, but as an
              intellectual retreat where conversation and craftsmanship thrive in equilibrium.
            </p>
            <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8">
              Furnished with deep leather Chesterfield armchairs, bespoke walnut shelving housing rare
              architectural volumes, a spinning turntable curating modal jazz pressings, and the warm,
              rhythmic chime of our vintage 1954 Probat roaster.
            </p>

            {/* Curated Feature Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-6 rounded-xl border border-outline-variant/30">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">volume_off</span>
                <div>
                  <h4 className="font-headline font-bold text-base text-on-surface">No Loud Devices</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Cellular calls reserved strictly for courtyard garden.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                  record_voice_over
                </span>
                <div>
                  <h4 className="font-headline font-bold text-base text-on-surface">Analog Vinyl Lounge</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Original Blue Note &amp; Prestige records on tube amp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Atelier Amenities Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">coffee_maker</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Artisan Pour-Over Bar</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Sit front-row at our sunken marble brew station. Hand-dripped V60, Chemex, and Kalita Wave
                  extractions timed to the fraction of a second.
                </p>
              </div>

              <div className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">meeting_room</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Private Boardroom</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Equipped with high-speed fiber, concealed AV, and dedicated coffee butler for executive
                  meetings, book clubs, and intimate tastings.
                </p>
              </div>

              <div className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">loyalty</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Bespoke Subscriptions</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Customized roast profiles delivered fortnightly to your residence or club in custom
                  wax-sealed airtight amber tins.
                </p>
              </div>

              <div className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-2xl">deck</span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Cigar &amp; Pairing Terrace</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Heated garden portico tailored for afternoon espresso pairings with bespoke single leaves
                  and boutique roasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curator's Note & Member Guild Invitation */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-14 lg:p-16 shadow-xl relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary/5 pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Curator Quotation */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <img
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-fixed"
                  alt="Arthur Vance, Head Roaster"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM0xP-bNTSE11hXIoRPltxzwlFHx_vUgwte_DEcI53YfChRkLYXA7Y73zeVyVoLn9t_gDYYs_WzxvTjDTXdPpS3e7aLt3Smhjk4b_j3zIIzyO9EcVjwcq_lhNrT5TeYKFjgVkjPh0XX0ObGYKPKRc0-vvNeO8V_6c15ZmUHbafDzvJdzaDE7lASXUbOZrraVHLe322Bi7LGtkWtsepXhlSeQbMpobU6yrB0LdNEbZ83QNVZnmYdhnz"
                />
                <div>
                  <span className="font-headline font-bold text-lg text-on-surface block leading-tight">
                    Arthur Vance
                  </span>
                  <span className="text-xs text-primary font-medium tracking-wide">
                    Head Roaster &amp; Co-Founder
                  </span>
                </div>
              </div>
              <blockquote className="font-headline text-2xl sm:text-3xl lg:text-4xl text-on-surface font-normal italic leading-snug mb-6">
                &ldquo;Coffee is not an unthinking routine to hasten the day; it is an act of quiet
                ceremony, a mindful interlude that anchors the spirit.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-sm text-primary">verified</span> Fellow of
                  the London Coffee Guild
                </span>
                <span>•</span>
                <span>Established 2018</span>
              </div>
            </div>

            {/* Society Newsletter Invitation Card */}
            <div className="lg:col-span-5 bg-surface-container-low p-6 sm:p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/30">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-2 block">
                  Private Registry
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">
                  Request Guild Allocation
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                  Receive confidential dispatches prior to open auctions, invitations to seasonal cupping
                  salons, and private access to barrel-aged releases.
                </p>
              </div>
              <form onSubmit={handleGuildSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest text-xs text-on-surface px-4 py-3.5 rounded-lg placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm border border-outline-variant/40"
                    placeholder="Enter your personal email"
                    required
                    type="email"
                    value={guildEmail}
                    onChange={(e) => setGuildEmail(e.target.value)}
                  />
                </div>
                <button
                  className="w-full py-3.5 bg-primary text-on-primary font-body text-xs uppercase font-bold tracking-widest rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md active:scale-[0.99]"
                  type="submit"
                >
                  Request Invitation
                </button>
                {guildSubmitted && (
                  <span className="text-[11px] text-primary font-medium text-center animate-in fade-in">
                    Invitation dispatch scheduled. Check your inbox momentarily.
                  </span>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Order Dialog */}
      {orderModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-on-surface/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOrderModalItem(null)}
        >
          <div
            className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              onClick={() => setOrderModalItem(null)}
              aria-label="Close dialog"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {orderSuccess ? (
              <div className="text-center py-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <h4 className="font-headline text-2xl font-bold text-on-surface">Order Received</h4>
                <p className="text-xs text-on-surface-variant mt-2 mb-6">
                  The barista is currently drawing your extraction with calibrated care. Added to your
                  Atelier Tray!
                </p>
                <button
                  onClick={() => setOrderModalItem(null)}
                  className="px-6 py-2.5 bg-on-surface text-surface text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                  Instant Atelier Dispatch
                </span>
                <h3 className="font-headline text-2xl font-bold text-on-surface mt-1">
                  {orderModalItem.name}
                </h3>
                <p className="font-body text-sm font-semibold text-primary mb-4 font-mono">
                  ${orderModalItem.price.toFixed(2)}
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  <label className="text-xs font-semibold text-on-surface">Service Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${
                        orderModalItem.serviceOption === 'table'
                          ? 'bg-surface-container-high border-primary text-on-surface font-semibold'
                          : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      <input
                        type="radio"
                        name="order-type"
                        className="accent-primary"
                        checked={orderModalItem.serviceOption === 'table'}
                        onChange={() =>
                          setOrderModalItem({ ...orderModalItem, serviceOption: 'table' })
                        }
                      />
                      <span className="text-xs font-medium">Table Service</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-colors ${
                        orderModalItem.serviceOption === 'takeaway'
                          ? 'bg-surface-container-high border-primary text-on-surface font-semibold'
                          : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      <input
                        type="radio"
                        name="order-type"
                        className="accent-primary"
                        checked={orderModalItem.serviceOption === 'takeaway'}
                        onChange={() =>
                          setOrderModalItem({ ...orderModalItem, serviceOption: 'takeaway' })
                        }
                      />
                      <span className="text-xs font-medium">Curbside / Takeaway</span>
                    </label>
                  </div>
                </div>
                <button
                  className="w-full py-3.5 bg-primary text-on-primary font-body text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors shadow-md active:scale-95"
                  onClick={handleConfirmOrderModal}
                >
                  Confirm Preparation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
