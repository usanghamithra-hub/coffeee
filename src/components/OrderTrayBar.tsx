import React from 'react';
import { useCart } from '../context/CartContext';
import { Screen } from '../types';

interface OrderTrayBarProps {
  onNavigate: (screen: Screen) => void;
}

export const OrderTrayBar: React.FC<OrderTrayBarProps> = ({ onNavigate }) => {
  const {
    cartItems,
    itemCount,
    subtotal,
    isDrawerOpen,
    toggleDrawer,
    clearCart,
    activeOrigin,
    lastAddedName,
    updateQuantity,
    removeFromCart
  } = useCart();

  if (cartItems.length === 0 && !lastAddedName) return null;

  return (
    <aside
      className={`fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 sm:w-[460px] z-50 bg-inverse-surface/95 text-inverse-on-surface backdrop-blur-xl rounded-2xl shadow-2xl p-4 transition-all duration-300 border border-outline-variant/30 ${
        lastAddedName ? 'scale-[1.02] ring-2 ring-primary' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_mall
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wide">
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in Tray
              </span>
              <span className="w-1 h-1 rounded-full bg-surface-tint"></span>
              <span className="text-[11px] text-surface-container-high font-mono">
                Subtotal: ${subtotal.toFixed(2)}
              </span>
            </div>
            <span className="text-[10px] text-surface-container-high/70">
              Beans: {activeOrigin}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-inverse-on-surface hover:text-primary transition-colors"
            onClick={toggleDrawer}
            title={isDrawerOpen ? 'Collapse tray' : 'Expand tray'}
          >
            <span className="material-symbols-outlined text-lg">
              {isDrawerOpen ? 'expand_more' : 'expand_less'}
            </span>
          </button>
          <button
            type="button"
            className="bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 active:scale-95"
            onClick={() => onNavigate('checkout-&-order')}
          >
            <span>Checkout</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Collapsible Tray Details Drawer */}
      {isDrawerOpen && (
        <div className="mt-4 pt-4 border-t border-surface-container-high/20 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto no-scrollbar pr-1 text-xs">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-surface-container-high py-1 hover:bg-white/5 px-2 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1 bg-surface-container/20 rounded px-1.5 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-surface-container-high/70 hover:text-white px-0.5 font-bold"
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs">{item.quantity}×</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-surface-container-high/70 hover:text-white px-0.5 font-bold"
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-surface-container-high/40 hover:text-error transition-colors"
                    title="Remove item"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-surface-container-high/20 flex items-center justify-between text-[11px] text-surface-container-high/80">
            <span>Mayfair Concierge Delivery: Complimentary</span>
            <button
              className="text-tertiary-fixed-dim hover:underline"
              onClick={clearCart}
            >
              Clear Tray
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
