import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant mt-24 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                alt="Gent & Bean Monogram Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgqVU4_PN27rMw7D_5dUYey7imv3-KE14HUSt7MqUouegON2Mk5g1lZqB907XLw0Z6hypCub6bZqK0nfQv2tJNqPpgtf3bVa6D4LY2aRsBJjEsv_kHG4EwUXM81VKlqJv0LN_RHJpLpo5LCaHCes4-a91N7g--96neXn_GitvtRuzyjsjCLcprxeHTK4mw65d6Kni2Qow4G5stLO7COudNs-BxPoouJrXY6XaX0PmRnwqXB2SiAB9F"
              />
              <span className="font-headline font-bold text-lg text-on-surface tracking-wider uppercase">
                Gent &amp; Bean
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Artisanal gentleman-coded coffee atelier and members guild. Micro-roasted single origins,
              aged barrels, and uncompromising precision.
            </p>
            <p className="text-[11px] text-on-surface-variant/70">
              An exquisite cup for the discerning palate.
            </p>
          </div>

          {/* Atelier Location */}
          <div className="text-xs flex flex-col gap-2">
            <span className="font-headline font-bold text-sm uppercase text-on-surface tracking-wider mb-2">
              Atelier Location
            </span>
            <p className="leading-relaxed">
              The Old Exchange Building
              <br />
              42 St. Swithin&apos;s Lane
              <br />
              Mayfair, London W1J 8AQ
            </p>
            <p className="mt-2 font-medium text-on-surface">Concierge: +44 20 7946 0831</p>
          </div>

          {/* Roastery Hours */}
          <div className="text-xs flex flex-col gap-2">
            <span className="font-headline font-bold text-sm uppercase text-on-surface tracking-wider mb-2">
              Roastery Hours
            </span>
            <p className="leading-relaxed">
              Monday – Friday: 7:00 AM – 8:00 PM
              <br />
              Saturday – Sunday: 8:00 AM – 8:00 PM
            </p>
            <p className="mt-2 text-on-surface-variant/80">Private Tastings by Reservation Only</p>
          </div>

          {/* Newsletter / Society Gazette */}
          <div className="md:col-span-1">
            <span className="font-headline font-bold text-sm uppercase text-on-surface tracking-wider block mb-2">
              The Society Gazette
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Receive dispatches on rare reserve lots, cupping schedules, and seasonal bean allocations.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  className="bg-surface-container-lowest text-xs rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary w-full border border-outline-variant/40"
                  placeholder="Your private email address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-primary font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Dispatch enrollment confirmed.</span>
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Sublinks */}
        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant/60 gap-4 border-t border-outline-variant/20">
          <p>© 2025 Gent &amp; Bean Coffee Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-on-surface transition-colors" href="#charter">
              Club Charter
            </a>
            <a className="hover:text-on-surface transition-colors" href="#provenance">
              Provenance &amp; Origins
            </a>
            <a className="hover:text-on-surface transition-colors" href="#privacy">
              Privacy Guild
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
