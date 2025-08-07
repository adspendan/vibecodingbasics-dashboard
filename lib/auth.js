// lib/auth.js (Updated)
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    // Check for active session on initial load
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        // Check if email is confirmed
        if (!session.user.email_confirmed_at) {
          console.log('Email not confirmed yet');
        }
        
        // Fetch subscription data
        const { data: subData } = await supabase
          .from('user_subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        setSubscription(subData);
      }
      
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          
          // Check if email is confirmed
          if (!session.user.email_confirmed_at) {
            console.log('Email not confirmed yet');
          }
          
          // Fetch subscription data after sign in
          const { data: subData } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setSubscription(subData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSubscription(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    subscription,
    loading,
    signUp: async (email, password) => {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      if (error) throw error;
    },
    signIn: async (email, password) => {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      
      // Check if email is confirmed
      if (data.user && !data.user.email_confirmed_at) {
        throw new Error('Please verify your email before signing in');
      }
      
      if (error) throw error;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    resendConfirmationEmail: async (email) => {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      if (error) throw error;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}