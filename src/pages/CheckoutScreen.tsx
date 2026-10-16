import React, { useState } from 'react';
import { Screen } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CheckoutScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onNavigate }) => {
  const { cartItems, subtotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const { currentUser, updateCredits, openAuthModal } = useAuth();

  const [fulfillmentMode, setFulfillmentMode] = useState<'counter' | 'table' | 'courier'>('counter');
  const [salonTable, setSalonTable] = useState('7');
  const [timing, setTiming] = useState<'immediate' | 'scheduled'>('immediate');
  const [paymentMethod, setPaymentMethod] = useState<'house' | 'card' | 'apple' | 'google'>('house');
  const [directives, setDirectives] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderRef, setConfirmedOrderRef] = useState('');

  // Calculations
  const memberDiscount = subtotal * 0.15;
  const payableTotal = Math.max(0, subtotal - memberDiscount);

  const handleCompleteOrder = () => {
    setIsSubmitting(true);
    const orderRef = `GB-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      // If paid via House Account, deduct credits
      if (paymentMethod === 'house' && currentUser) {
        updateCredits(-payableTotal);
      }
      setConfirmedOrderRef(orderRef);
      setOrderConfirmed(true);
      setIsSubmitting(false);
    }, 1200);
  };

  const handleDismissOrder = () => {
    clearCart();
    setOrderConfirmed(false);
    onNavigate('member-lounge');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        {/* Breadcrumb & Atelier Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Artisanal Guild
            </button>
            <span className="text-outline-variant">/</span>
            <button
              onClick={() => onNavigate('artisanal-menu')}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Tasting Cart
            </button>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Reserve Checkout</span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container-high text-xs text-on-surface border border-outline-variant/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-medium text-xs">Mayfair Roastery Station No. 3: Extracting Live</span>
          </div>
        </div>

        {/* Main Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Logistics, Patron Credentials, & Settlement */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Stage 01: Fulfillment Modality */}
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-baseline justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                    Stage 01
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                    Fulfillment Modality
                  </h2>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                  Mayfair Atelier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Counter Pickup */}
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('counter')}
                  className={`flex flex-col text-left p-4 rounded-lg transition-all relative overflow-hidden border ${
                    fulfillmentMode === 'counter'
                      ? 'bg-surface-container-high text-on-surface shadow-sm border-primary/40'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        fulfillmentMode === 'counter' ? 'text-primary' : 'text-secondary'
                      }`}
                      style={{ fontVariationSettings: fulfillmentMode === 'counter' ? "'FILL' 1" : '' }}
                    >
                      storefront
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        fulfillmentMode === 'counter' ? 'bg-primary' : 'bg-transparent'
                      }`}
                    ></span>
                  </div>
                  <span className="font-headline text-base font-bold text-on-surface leading-snug">
                    Counter Pickup
                  </span>
                  <span className="text-xs text-on-surface-variant mt-1">Mayfair Roastery Bar</span>
                  <span className="inline-block mt-3 py-0.5 px-2 rounded bg-surface-container-highest text-[10px] font-semibold text-primary uppercase tracking-wider">
                    Ready in 12 mins
                  </span>
                </button>

                {/* Table Service */}
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('table')}
                  className={`flex flex-col text-left p-4 rounded-lg transition-all relative overflow-hidden border ${
                    fulfillmentMode === 'table'
                      ? 'bg-surface-container-high text-on-surface shadow-sm border-primary/40'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        fulfillmentMode === 'table' ? 'text-primary' : 'text-secondary'
                      }`}
                      style={{ fontVariationSettings: fulfillmentMode === 'table' ? "'FILL' 1" : '' }}
                    >
                      chair
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        fulfillmentMode === 'table' ? 'bg-primary' : 'bg-transparent'
                      }`}
                    ></span>
                  </div>
                  <span className="font-headline text-base font-bold text-on-surface leading-snug">
                    Table Service
                  </span>
                  <span className="text-xs text-on-surface-variant mt-1">Atelier Lounge &amp; Salon</span>
                  <span className="inline-block mt-3 py-0.5 px-2 rounded bg-surface-container-high text-[10px] font-medium text-on-surface-variant">
                    Selected Table
                  </span>
                </button>

                {/* Courier Express */}
                <button
                  type="button"
                  onClick={() => setFulfillmentMode('courier')}
                  className={`flex flex-col text-left p-4 rounded-lg transition-all relative overflow-hidden border ${
                    fulfillmentMode === 'courier'
                      ? 'bg-surface-container-high text-on-surface shadow-sm border-primary/40'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        fulfillmentMode === 'courier' ? 'text-primary' : 'text-secondary'
                      }`}
                      style={{ fontVariationSettings: fulfillmentMode === 'courier' ? "'FILL' 1" : '' }}
                    >
                      electric_moped
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        fulfillmentMode === 'courier' ? 'bg-primary' : 'bg-transparent'
                      }`}
                    ></span>
                  </div>
                  <span className="font-headline text-base font-bold text-on-surface leading-snug">
                    Courier Express
                  </span>
                  <span className="text-xs text-on-surface-variant mt-1">Mayfair &amp; Belgravia</span>
                  <span className="inline-block mt-3 py-0.5 px-2 rounded bg-surface-container-high text-[10px] font-medium text-on-surface-variant">
                    Thermal Flask Cask
                  </span>
                </button>
              </div>

              {/* Table Number Selector Sub-drawer */}
              {fulfillmentMode === 'table' && (
                <div className="mt-5 p-4 rounded-lg bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/30 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl">room_service</span>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Specify Salon Seating</p>
                      <p className="text-[11px] text-on-surface-variant">
                        Brass number plaque located on the oak side table
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-on-surface-variant" htmlFor="table-num">
                      Salon Table:
                    </label>
                    <select
                      id="table-num"
                      value={salonTable}
                      onChange={(e) => setSalonTable(e.target.value)}
                      className="bg-surface-container-lowest text-on-surface text-xs rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-primary shadow-sm border border-outline-variant/40"
                    >
                      <option value="4">Table IV (Fireplace Bay)</option>
                      <option value="7">Table VII (Leather Library)</option>
                      <option value="12">Table XII (Courtyard Terrace)</option>
                      <option value="private">Private Cupping Suite A</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Chrono Timing Preference */}
              <div className="mt-6 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Extraction Timing
                  </label>
                  <p className="text-xs text-on-surface-variant">
                    Fresh grind orchestrated upon master barista roster call
                  </p>
                </div>
                <div className="inline-flex p-1 rounded-lg bg-surface-container-high border border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setTiming('immediate')}
                    className={`px-3 py-1.5 rounded text-xs transition-all ${
                      timing === 'immediate'
                        ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface font-medium'
                    }`}
                  >
                    As perfected (10-15 mins)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTiming('scheduled')}
                    className={`px-3 py-1.5 rounded text-xs transition-all ${
                      timing === 'scheduled'
                        ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface font-medium'
                    }`}
                  >
                    Reserve Scheduled Time
                  </button>
                </div>
              </div>
            </section>

            {/* Stage 02: Society Patron Dossier */}
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-baseline justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                    Stage 02
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                    Society Patron Dossier
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold tracking-wide">
                    Privileged Tier
                  </span>
                  {!currentUser && (
                    <button
                      onClick={() => openAuthModal('login')}
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/30">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                    Member Name
                  </span>
                  <span className="font-headline text-lg font-bold text-on-surface mt-1">
                    {currentUser ? currentUser.name : 'Lord Arthur Sterling'}
                  </span>
                  <span className="text-xs text-on-surface-variant/80 mt-0.5 font-mono">
                    Guild Sovereign Token #{currentUser ? currentUser.memberNumber : 'GB-99214'}
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-surface-container-low flex flex-col border border-outline-variant/30">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                    Dispatch Dispatcher
                  </span>
                  <span className="text-xs font-medium text-on-surface mt-1 truncate">
                    {currentUser ? currentUser.email : 'sterling@mayfairclub.co.uk'}
                  </span>
                  <span className="text-xs text-on-surface mt-0.5 font-medium font-mono">
                    +44 20 7946 0912
                  </span>
                </div>
              </div>

              {/* Automatic Society Benefit Callout */}
              <div className="p-4 rounded-lg bg-surface-container flex items-start gap-3.5 border border-outline-variant/30">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 text-on-primary">
                  <span className="material-symbols-outlined text-base">verified</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
                      Society Perk Applied
                    </span>
                    <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                    Complimentary Roastery Valet &amp; Priority Extraction allocated to Barista Station 3.
                  </p>
                </div>
              </div>
            </section>

            {/* Stage 03: Settlement Instrument */}
            <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-baseline justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-primary tracking-widest uppercase">
                    Stage 03
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">
                    Settlement Instrument
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-primary">encrypted</span>
                  <span>256-bit Encrypted</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Society House Account */}
                <label
                  className={`cursor-pointer flex items-center justify-between p-4 rounded-lg transition-all border ${
                    paymentMethod === 'house'
                      ? 'bg-surface-container-high border-primary/40 shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={paymentMethod === 'house'}
                      onChange={() => setPaymentMethod('house')}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wide">
                          Society House Account
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-on-primary uppercase tracking-wider">
                          Recommended
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant mt-0.5">
                        Automated settlement against Ledger Balance:{' '}
                        <strong className="text-on-surface font-semibold font-mono">
                          ${currentUser ? currentUser.societyCredits.toFixed(2) : '142.00'}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl">
                    account_balance_wallet
                  </span>
                </label>

                {/* Mastercard Private Reserve */}
                <label
                  className={`cursor-pointer flex flex-col p-4 rounded-lg transition-all border ${
                    paymentMethod === 'card'
                      ? 'bg-surface-container-high border-primary/40 shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment-method"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface tracking-wide">
                          Mastercard Private Reserve
                        </span>
                        <span className="text-xs text-on-surface-variant mt-0.5">
                          Mastercard ending in •••• 8821 • Exp 08/28
                        </span>
                      </div>
                    </div>
                    <div className="w-7 h-5 rounded bg-surface-container-highest flex items-center justify-center font-bold text-[9px] text-on-surface tracking-tighter">
                      MC
                    </div>
                  </div>
                </label>

                {/* Digital Wallets */}
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label
                    className={`cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold text-on-surface border transition-colors ${
                      paymentMethod === 'apple'
                        ? 'bg-surface-container-high border-primary/40'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'apple'}
                      onChange={() => setPaymentMethod('apple')}
                    />
                    <span className="text-sm font-bold">∅</span> Apple Pay
                  </label>
                  <label
                    className={`cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold text-on-surface border transition-colors ${
                      paymentMethod === 'google'
                        ? 'bg-surface-container-high border-primary/40'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      className="sr-only"
                      checked={paymentMethod === 'google'}
                      onChange={() => setPaymentMethod('google')}
                    />
                    <span className="font-bold text-sm">G</span> Google Pay
                  </label>
                </div>
              </div>

              {/* Special Extraction Directives */}
              <div className="mt-6 pt-6 border-t border-outline-variant/20">
                <div className="flex items-center justify-between mb-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider text-on-surface"
                    htmlFor="directives-input"
                  >
                    Atelier Special Extraction Directives
                  </label>
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    Transmitted to Lead Roaster
                  </span>
                </div>
                <textarea
                  id="directives-input"
                  value={directives}
                  onChange={(e) => setDirectives(e.target.value)}
                  placeholder="e.g., Extra hot micro-foam, water served on the side at 85°C, oak resting preference..."
                  rows={2}
                  className="w-full bg-surface-container-lowest text-xs rounded-lg p-3.5 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none border border-outline-variant/40"
                ></textarea>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary & Ledger */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-md relative overflow-hidden border border-outline-variant/30">
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>

              <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-outline-variant/20">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">
                    Receipt Ref #GB-8840
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-on-surface">Curated Extraction</h3>
                </div>
                <span className="text-xs font-semibold text-on-surface-variant">
                  {cartItems.length} Provisions
                </span>
              </div>

              {/* Itemised Provisions List */}
              <div className="flex flex-col gap-4 mb-6 max-h-72 overflow-y-auto no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="text-center py-6 text-on-surface-variant text-xs">
                    Your atelier tasting cart is empty.{' '}
                    <button
                      onClick={() => onNavigate('artisanal-menu')}
                      className="text-primary underline font-semibold"
                    >
                      Browse offerings
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3 group">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="flex items-center gap-1 shrink-0 mt-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 rounded bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-primary">
                            {item.quantity}x
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 rounded bg-surface-container text-xs font-bold text-on-surface hover:bg-surface-container-high flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <div className="min-w-0">
                          <p className="font-headline font-bold text-base text-on-surface leading-snug truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 truncate">
                            {item.optionSummary}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface font-mono shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-opacity"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Barista Allocation Card */}
              <div className="p-4 rounded-lg bg-surface-container-low mb-6 flex items-center gap-4 border border-outline-variant/30">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Master Roaster Alistair"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOPysrPOkysPa55ZrcmuQ39INhE9Hh4q2eSffDCLOFqxuZXdF0VEwauy2mNztTJrjW9Bv3Q_iCAl2H2YniVIO7JqcD5v_kP4g-k9LtdJuLD9kRCBzK90n5Fj-Bsh421G3pqk4h7cD9C8Z9QV-vOxT6mpz_KjY1QqdOdwru2AVuUiTJa3BVwfKC45QyZHzKyNUrbNk_9j5rxEREguUzDSPzrDuRfErP_IdCpffyO4kmbAnuEbLSRx_C"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface truncate">
                      Master Roaster Alistair
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                    Allocated to bespoke extraction upon command authorization.
                  </p>
                </div>
              </div>

              {/* Financial Accounting */}
              <div className="pt-5 border-t border-outline-variant/20 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Gross Provisions Subtotal</span>
                  <span className="font-medium text-on-surface font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-tertiary">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">loyalty</span>
                    <span>Society Member Privilege (15%)</span>
                  </span>
                  <span className="font-semibold font-mono">-${memberDiscount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Atelier Hospitality &amp; VAT</span>
                  <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">
                    Complimentary
                  </span>
                </div>

                {/* Grand Ledger Sum */}
                <div className="mt-4 pt-4 bg-surface-container-high/40 p-4 rounded-lg flex items-baseline justify-between border border-outline-variant/30">
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">
                      Total Payable Settlement
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Inclusive of VAT &amp; Atelier Service
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline text-3xl font-bold text-on-surface tracking-tight font-mono">
                      ${payableTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="mt-6">
                <button
                  type="button"
                  disabled={cartItems.length === 0 || isSubmitting}
                  onClick={handleCompleteOrder}
                  className="w-full py-4 px-6 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>Allocating to Master Barista...</span>
                  ) : (
                    <>
                      <span>Complete Order &amp; Send to Barista</span>
                      <span className="font-bold font-mono">(${payableTotal.toFixed(2)})</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantee */}
              <div className="mt-5 flex items-center justify-center gap-2 text-center text-on-surface-variant/80 text-[11px]">
                <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                <span>Roasted Fresh to Order • Zero Wait At Counter Guarantee</span>
              </div>
            </div>

            {/* Mineral Notice */}
            <div className="p-5 rounded-xl bg-surface-container text-on-surface-variant text-xs flex items-start gap-3 border border-outline-variant/30">
              <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">
                local_cafe
              </span>
              <p className="leading-relaxed">
                Your single origin lots are calibrated specifically to the Mayfair Atelier water mineral
                profile (pH 7.2, 140 ppm) for peak aromatic clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmed Modal */}
      {orderConfirmed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-on-surface/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div className="bg-surface rounded-2xl max-w-md w-full p-8 shadow-2xl text-center border border-outline-variant/40">
            <div className="w-16 h-16 rounded-full bg-primary-fixed text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-primary">
              Extraction Confirmed
            </span>
            <h3 className="font-headline text-3xl font-bold text-on-surface mt-1">
              Order #{confirmedOrderRef}
            </h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Master Roaster Alistair has taken charge of your extraction at Barista Station 3.{' '}
              {fulfillmentMode === 'table'
                ? `Service scheduled for Salon Table ${salonTable}.`
                : fulfillmentMode === 'counter'
                ? 'Your order will be ready at the Mayfair Roastery Bar in ~12 mins.'
                : 'Courier dispatched via thermal flask cask.'}
            </p>
            <div className="mt-6 p-4 bg-surface-container-low rounded-xl text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Settlement Method:</span>
                <span className="font-semibold text-on-surface">
                  {paymentMethod === 'house'
                    ? 'Society House Account'
                    : paymentMethod === 'card'
                    ? 'Mastercard Private Reserve'
                    : paymentMethod === 'apple'
                    ? 'Apple Pay'
                    : 'Google Pay'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Amount Debited:</span>
                <span className="font-mono font-bold text-primary">${payableTotal.toFixed(2)}</span>
              </div>
              {paymentMethod === 'house' && currentUser && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Remaining House Balance:</span>
                  <span className="font-mono text-on-surface">
                    ${currentUser.societyCredits.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleDismissOrder}
              className="mt-6 w-full py-3.5 bg-primary text-on-primary font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors shadow-md"
            >
              Return to Member Lounge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
