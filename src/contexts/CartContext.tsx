import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Cart } from '../types/Cart';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping_cart';

const getCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

const calculateCart = (items: CartItem[]): Cart => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, total, itemCount };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const items = getCartFromStorage();
    setCartItems(items);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      const maxAllowed = Math.min(item.stock, item.max_quantity || 10);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > maxAllowed) {
          alert(`Maximum ${maxAllowed} items allowed per product`);
          return prev;
        }
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }

      if (quantity > maxAllowed) {
        alert(`Maximum ${maxAllowed} items allowed per product`);
        return prev;
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const maxAllowed = Math.min(item.stock, item.max_quantity || 10);
          if (quantity > maxAllowed) {
            alert(`Maximum ${maxAllowed} items allowed per product`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (itemId: string): boolean => {
    return cartItems.some((item) => item.id === itemId);
  };

  const getItemQuantity = (itemId: string): number => {
    const item = cartItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const cart = calculateCart(cartItems);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
