"use client"

import { useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check current session on mount
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          return;  
        }
        const currentUser = session?.user ?? null
        setUser(currentUser)
        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) {
        return {
          error: {
            ...error
          },
          data: { user: null }
        };
      }

      if (data && data.user) {
        return { error: null, data: { user: data.user } };
      }

      return {
        error: {
          message: 'An unexpected error occurred',
          name: 'AuthError',
          status: 500
        } as AuthError,
        data: { user: null }
      };
    } catch (err) {
      console.error('Auth error:', err);
      return {
        error: {
          message: 'An unexpected error occurred. Please try again.',
          name: 'AuthError',
          status: 500
        } as AuthError,
        data: { user: null }
      };
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      // First attempt signup
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password 
      });

      if (signUpError) {
        return {
          error: {
            ...signUpError
          },
          data: { user: null }
        };
      }

      // If signup successful but no session (common with email confirmation)
      if (signUpData?.user && !signUpData.session) {
        // Attempt to sign in immediately
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          console.warn('Auto sign-in after signup failed:', signInError);
          // Return original signup data even if auto-signin fails
          return { error: null, data: signUpData };
        }

        // Return sign-in data if successful
        return { error: null, data: signInData };
      }

      // Return original signup data
      return { error: null, data: signUpData };
    } catch (err) {
      console.error('Signup error:', err);
      return {
        error: {
          message: 'An unexpected error occurred. Please try again.',
          name: 'AuthError',
          status: 500
        } as AuthError,
        data: { user: null }
      };
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (err) {
      console.error('Signout error:', err);
      return {
        error: {
          message: 'Failed to sign out. Please try again.',
          name: 'SignOutError',
          status: 500
        } as AuthError
      };
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}
