import { useState, useEffect } from 'react';
import { Screen } from './types';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OrderTrayBar } from './components/OrderTrayBar';
import { AuthModal } from './components/AuthModal';
import { HomeScreen } from './pages/HomeScreen';
import { MenuScreen } from './pages/MenuScreen';
import { CheckoutScreen } from './pages/CheckoutScreen';
import { LoungeScreen } from './pages/LoungeScreen';

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('artisanal-menu');

  // Sync hash routing if desired
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Screen;
      if (['home', 'artisanal-menu', 'checkout-&-order', 'member-lounge'].includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    if (window.location.hash) {
      handleHash();
    }
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLounge = currentScreen === 'member-lounge';

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col">
      {/* Top Header - shown on standard pages, or on mobile lounge */}
      {!isLounge && (
        <Header currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${!isLounge ? 'pt-28' : ''}`}>
        {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
        {currentScreen === 'artisanal-menu' && <MenuScreen onNavigate={handleNavigate} />}
        {currentScreen === 'checkout-&-order' && <CheckoutScreen onNavigate={handleNavigate} />}
        {currentScreen === 'member-lounge' && <LoungeScreen onNavigate={handleNavigate} />}
      </main>

      {/* Floating Order Tray Preview Bar - active on Menu & Home */}
      {(currentScreen === 'artisanal-menu' || currentScreen === 'home') && (
        <OrderTrayBar onNavigate={handleNavigate} />
      )}

      {/* Footer - shown on standard pages */}
      {!isLounge && <Footer />}

      {/* Global Authentication Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
