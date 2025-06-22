import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { auth, db, supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await loadProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await db.getProfile(userId);
      if (error) {
        console.error('Error loading profile:', error);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success('Welcome back!');
        return true;
      }
      
      return false;
    } catch (error: any) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await auth.signUp(email, password, firstName, lastName);
      
      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        toast.success('Account created successfully! Please check your email to verify your account.');
        return true;
      }
      
      return false;
    } catch (error: any) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) {
        toast.error('Error signing out');
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await db.updateProfile(user.id, updates);
      if (error) {
        toast.error('Failed to update profile');
        return false;
      }
      
      setProfile(data);
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  return {
    user,
    profile,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    displayName: profile ? `${profile.first_name} ${profile.last_name}` : user?.email || '',
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
  };
};