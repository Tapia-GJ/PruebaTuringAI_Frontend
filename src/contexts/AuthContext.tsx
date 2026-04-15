/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';
import type { AuthContextType, User } from '../types/auth.types';
import { fetchSession, signIn, signUp, signOut } from '../api/auth.api';

// Create context with undefined default (will be provided by AuthProvider)
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * Wraps application with auth context
 * Fetches session on mount and exposes login, register, logout methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize session on mount
   * Fetch current session from backend using HTTP-only cookie
   */
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const session = await fetchSession();
        if (session) {
          setUser(session.user);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to load authentication state');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const session = await signIn(email, password);
      setUser(session.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err; // Re-throw for component to handle (e.g., redirect)
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register with email, name, and password
   */
  const register = useCallback(
    async (email: string, name: string, password: string): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const session = await signUp(email, name, password);
        setUser(session.user);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw err; // Re-throw for component to handle (e.g., show error)
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout current user
   * Clears session on backend and local state
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
