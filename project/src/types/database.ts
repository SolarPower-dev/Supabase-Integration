export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          short_description: string;
          price: number;
          original_price: number | null;
          images: string[];
          category: string;
          in_stock: boolean;
          stock_quantity: number;
          features: string[];
          specifications: Record<string, any>;
          rating: number;
          review_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          short_description: string;
          price: number;
          original_price?: number | null;
          images?: string[];
          category: string;
          in_stock?: boolean;
          stock_quantity?: number;
          features?: string[];
          specifications?: Record<string, any>;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          short_description?: string;
          price?: number;
          original_price?: number | null;
          images?: string[];
          category?: string;
          in_stock?: boolean;
          stock_quantity?: number;
          features?: string[];
          specifications?: Record<string, any>;
          rating?: number;
          review_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          total_amount: number;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          shipping_address: Record<string, any>;
          payment_status: string;
          payment_method: string | null;
          tracking_number: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          status?: string;
          total_amount: number;
          subtotal: number;
          tax_amount?: number;
          shipping_amount?: number;
          shipping_address: Record<string, any>;
          payment_status?: string;
          payment_method?: string | null;
          tracking_number?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          status?: string;
          total_amount?: number;
          subtotal?: number;
          tax_amount?: number;
          shipping_amount?: number;
          shipping_address?: Record<string, any>;
          payment_status?: string;
          payment_method?: string | null;
          tracking_number?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          created_at?: string;
        };
      };
    };
  };
}