"use client"
import { createContext, useContext, ReactNode } from 'react';
import { useGetSession } from '@/hooks/useSession';

interface UserContextType {
  isLoggedIn?: boolean;
  walletAddress?: string;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, isLoading } = useGetSession();

  const value = {
    isLoggedIn: session?.isLoggedIn,
    walletAddress: session?.walletAddress,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}