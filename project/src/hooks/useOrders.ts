import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Database } from '../types/database';
import toast from 'react-hot-toast';

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: (Database['public']['Tables']['order_items']['Row'] & {
    products: Database['public']['Tables']['products']['Row'];
  })[];
};

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await db.getUserOrders(user.id);
      
      if (error) {
        toast.error('Failed to load orders');
        return;
      }
      
      setOrders(data || []);
    } catch (err: any) {
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderData: {
    items: Array<{
      product_id: string;
      quantity: number;
      unit_price: number;
    }>;
    shipping_address: any;
    payment_method: string;
    subtotal: number;
    tax_amount: number;
    shipping_amount: number;
    total_amount: number;
  }): Promise<string | null> => {
    if (!user) {
      toast.error('Please log in to place an order');
      return null;
    }

    try {
      // Create the order
      const { data: order, error: orderError } = await db.createOrder({
        user_id: user.id,
        subtotal: orderData.subtotal,
        tax_amount: orderData.tax_amount,
        shipping_amount: orderData.shipping_amount,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        payment_method: orderData.payment_method,
        payment_status: 'paid', // In production, this would be set after payment processing
        status: 'processing',
      });

      if (orderError || !order) {
        toast.error('Failed to create order');
        return null;
      }

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
      }));

      const { error: itemsError } = await db.createOrderItems(orderItems);

      if (itemsError) {
        toast.error('Failed to create order items');
        return null;
      }

      // Generate tracking number (in production, this would come from shipping provider)
      const trackingNumber = `DV${Date.now().toString().slice(-8)}`;
      await db.updateOrderStatus(order.id, 'processing', trackingNumber);

      toast.success('Order placed successfully!');
      await loadOrders(); // Refresh orders list
      
      return order.id;
    } catch (err: any) {
      toast.error('Failed to create order');
      return null;
    }
  };

  const getOrder = async (orderId: string): Promise<Order | null> => {
    try {
      const { data, error } = await db.getOrder(orderId);
      
      if (error) {
        toast.error('Order not found');
        return null;
      }
      
      return data as Order;
    } catch (err: any) {
      toast.error('Failed to load order');
      return null;
    }
  };

  return {
    orders,
    isLoading,
    createOrder,
    getOrder,
    refetch: loadOrders,
  };
};