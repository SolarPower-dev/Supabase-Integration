import { useState, useEffect } from 'react';
import { Database } from '../types/database';
import toast from 'react-hot-toast';

type Product = Database['public']['Tables']['products']['Row'];

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dunevolt-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dunevolt-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.in_stock) {
      toast.error('Product is out of stock');
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock_quantity) {
          toast.error(`Only ${product.stock_quantity} items available in stock`);
          return prev;
        }
        toast.success(`Updated ${product.name} quantity in cart`);
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (quantity > product.stock_quantity) {
        toast.error(`Only ${product.stock_quantity} items available in stock`);
        return prev;
      }
      
      toast.success(`Added ${product.name} to cart`);
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.product.id === productId);
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          if (quantity > item.product.stock_quantity) {
            toast.error(`Only ${item.product.stock_quantity} items available in stock`);
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
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getTaxAmount = () => {
    return getCartTotal() * 0.1; // 10% tax
  };

  const getShippingAmount = () => {
    return getCartTotal() >= 200 ? 0 : 25; // Free shipping over $200
  };

  const getFinalTotal = () => {
    return getCartTotal() + getTaxAmount() + getShippingAmount();
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getTaxAmount,
    getShippingAmount,
    getFinalTotal,
  };
};