import React, { useState } from 'react';
import { Screen } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  const { itemCount, subtotal, toggleDrawer } = useCart();
  const { currentUser, openAuthModal } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(58,48,42,0.04)] border-b border-outline-variant/30">
      {/* Top Banner Announcement */}
      <div className="bg-surface-container-high py-1.5 px-6 lg:px-12 text-center text-xs tracking-widest uppercase font-medium text-on-surface-variant flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
        <span>COMPLIMENTARY AGED OAK-BARREL COLD BREW TASTING WITH EVERY CLUB SUBSCRIPTION</span>
        <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
      </div>

      {/* Main Navigation Row */}
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Monogram */}
        <div
          className="flex items-center gap-4 shrink-0 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <img
            alt="Gent & Bean Monogram Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgqVU4_PN27rMw7D_5dUYey7imv3-KE14HUSt7MqUouegON2Mk5g1lZqB907XLw0Z6hypCub6bZqK0nfQv2tJNqPpgtf3bVa6D4LY2aRsBJjEsv_kHG4EwUXM81VKlqJv0LN_RHJpLpo5LCaHCes4-a91N7g--96neXn_GitvtRuzyjsjCLcprxeHTK4mw65d6Kni2Qow4G5stLO7COudNs-BxPoouJrXY6XaX0PmRnwqXB2SiAB9F"
          />
          <div className="flex flex-col">
            <span className="font-headline font-bold text-lg tracking-wider text-on-surface uppercase leading-tight">
              Gent &amp; Bean
            </span>
            <span className="text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold">
              Coffee Atelier
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors pb-1 ${
              currentScreen === 'home'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('artisanal-menu')}
            className={`transition-colors pb-1 ${
              currentScreen === 'artisanal-menu'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Artisanal Menu
          </button>
          <button
            onClick={() => onNavigate('checkout-&-order')}
            className={`transition-colors pb-1 ${
              currentScreen === 'checkout-&-order'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Checkout &amp; Order
          </button>
          <button
            onClick={() => onNavigate('member-lounge')}
            className={`transition-colors pb-1 ${
              currentScreen === 'member-lounge'
                ? 'text-primary font-semibold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Member Lounge
          </button>
        </nav>

        {/* Right Section: Indexed Search + Cart Tray + User Profile */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Indexed Search Bar */}
          <div className="hidden sm:block">
            <SearchBar onNavigate={onNavigate} />
          </div>

          {/* Cart Tray Button */}
          <button
            onClick={toggleDrawer}
            className="flex items-center gap-2.5 bg-surface-container-lowest hover:bg-surface-container px-3.5 py-1.5 rounded-lg text-xs font-medium text-on-surface transition-colors shadow-[0_1px_6px_rgba(58,48,42,0.03)] border border-outline-variant/30"
            title="View Order Tray"
          >
            <span
              className="material-symbols-outlined text-lg text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_mall
            </span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-on-surface leading-none font-mono">
                ${subtotal.toFixed(2)}
              </span>
              <span className="text-[10px] text-on-surface-variant leading-tight">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </button>

          <div className="h-6 w-px bg-surface-container-high hidden sm:block"></div>

          {/* User Auth Profile */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 hover:opacity-90 transition-opacity"
              >
                <img
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-fixed"
                  src={currentUser.avatarUrl}
                />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-on-surface leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-primary font-medium tracking-wide leading-none">
                    {currentUser.memberTier}
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-surface rounded-xl shadow-xl border border-outline-variant/40 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-outline-variant/30">
                    <p className="font-bold text-on-surface">{currentUser.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate">{currentUser.email}</p>
                    <p className="text-[10px] font-mono text-primary mt-1">
                      Credits: ${currentUser.societyCredits.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate('member-lounge');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-surface-container flex items-center gap-2 text-on-surface"
                  >
                    <span className="material-symbols-outlined text-base text-primary">dashboard</span>
                    <span>Enter Member Lounge</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onNavigate('checkout-&-order');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-surface-container flex items-center gap-2 text-on-surface"
                  >
                    <span className="material-symbols-outlined text-base text-primary">receipt_long</span>
                    <span>Active Orders</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-surface-container flex items-center gap-2 text-tertiary border-t border-outline-variant/20 mt-1"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Patron Dossier / Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
