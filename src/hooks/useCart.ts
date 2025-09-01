import { useState, useEffect } from 'react';
import type { CartItem } from '../api/food';

const CART_STORAGE_KEY = 'food-stadium-cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    console.log('useCart - loading from localStorage:', savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('useCart - parsed cart from localStorage:', parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('useCart - saving to localStorage:', cartItems);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    console.log('useCart - addToCart called with:', item);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const newItems = prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('useCart - updated existing item, new cart:', newItems);
        return newItems;
      } else {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        console.log('useCart - added new item, new cart:', newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevItems.filter(item => item.id !== itemId);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getItemQuantity = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    getItemQuantity
  };
}
