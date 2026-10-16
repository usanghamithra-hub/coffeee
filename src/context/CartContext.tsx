import React, { createContext, useContext, useState, useMemo } from 'react';
import { CartItem } from '../types';
import { INITIAL_CART } from '../data/coffeeData';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (name: string, price: number, options?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  setIsDrawerOpen: (open: boolean) => void;
  activeOrigin: string;
  setActiveOrigin: (origin: string) => void;
  lastAddedName: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeOrigin, setActiveOrigin] = useState('Ethiopia Guji Reserve');
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  const itemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = (name: string, price: number, options?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          menuItemId: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name,
          price,
          quantity: 1,
          optionSummary: options || 'Handcrafted Extraction'
        }
      ];
    });

    setLastAddedName(name);
    setTimeout(() => {
      setLastAddedName(null);
    }, 2500);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isDrawerOpen,
        toggleDrawer,
        setIsDrawerOpen,
        activeOrigin,
        setActiveOrigin,
        lastAddedName
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
