import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { Database } from '../types/database';
import toast from 'react-hot-toast';

type Product = Database['public']['Tables']['products']['Row'];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await db.getProducts();
      
      if (error) {
        setError(error.message);
        toast.error('Failed to load products');
        return;
      }
      
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await db.getProduct(id);
      
      if (error) {
        toast.error('Product not found');
        return null;
      }
      
      return data;
    } catch (err: any) {
      toast.error('Failed to load product');
      return null;
    }
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'All Products') return products;
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const categories = ['All Products', ...new Set(products.map(p => p.category))];

  return {
    products,
    isLoading,
    error,
    getProduct,
    getProductsByCategory,
    searchProducts,
    categories,
    refetch: loadProducts,
  };
};