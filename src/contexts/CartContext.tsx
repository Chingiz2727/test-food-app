import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../api/food';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemQuantity: (itemId: number) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'food-stadium-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    console.log('CartContext - loading from localStorage:', savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('CartContext - parsed cart from localStorage:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('CartContext - saving to localStorage:', cartItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    console.log('CartContext - addToCart called with:', item);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const newItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('CartContext - updated existing item, new cart:', newItems);
        return newItems;
      } else {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        console.log('CartContext - added new item, new cart:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    console.log('CartContext - removeFromCart called with itemId:', itemId);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        const newItems = prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        console.log('CartContext - decreased quantity, new cart:', newItems);
        return newItems;
      } else {
        const newItems = prevItems.filter(item => item.id !== itemId);
        console.log('CartContext - removed item completely, new cart:', newItems);
        return newItems;
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log('CartContext - getTotalPrice:', total, 'cartItems:', cartItems);
    return total;
  };

  const getTotalItems = () => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('CartContext - getTotalItems:', total, 'cartItems:', cartItems);
    return total;
  };

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    const quantity = item ? item.quantity : 0;
    console.log(`CartContext - getItemQuantity for itemId ${itemId}:`, quantity);
    return quantity;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
