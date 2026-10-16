import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import {
  initializeUserVault,
  getStoredVault,
  saveVault,
  getActiveSessionEmail,
  setActiveSessionEmail,
  hashPassword,
  generateSalt,
  DEFAULT_PATRON
} from '../utils/auth';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateCredits: (amountDelta: number) => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_PATRON);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    async function load() {
      await initializeUserVault();
      const sessionEmail = getActiveSessionEmail();
      if (sessionEmail) {
        const vault = getStoredVault();
        if (vault[sessionEmail]) {
          setCurrentUser(vault[sessionEmail].user);
        } else {
          setCurrentUser(DEFAULT_PATRON);
        }
      } else {
        // Fallback default
        setCurrentUser(DEFAULT_PATRON);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const vault = getStoredVault();
    const record = vault[cleanEmail];

    if (!record) {
      return { success: false, error: 'No patron account registered with this email address.' };
    }

    const calculatedHash = await hashPassword(pass, record.salt);
    if (calculatedHash !== record.passwordHash) {
      return { success: false, error: 'Incorrect credentials. Please verify your password.' };
    }

    setCurrentUser(record.user);
    setActiveSessionEmail(cleanEmail);
    return { success: true };
  };

  const signUp = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please provide a valid full patron name.' };
    }
    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please provide a valid email address.' };
    }
    if (pass.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const vault = getStoredVault();
    if (vault[cleanEmail]) {
      return { success: false, error: 'An account is already registered with this email address.' };
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(pass, salt);
    const tokenNumber = Math.floor(10000 + Math.random() * 90000);

    const newUser: User = {
      id: `patron-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      memberTier: 'Gold Roastery Member',
      memberNumber: `GB-${tokenNumber}`,
      societyCredits: 50.00, // Welcome credits
      beansRoastedKg: 0,
      visits: 1,
      loungeCupsRemaining: 4,
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5ZZwkOmbL5Oqq_N_ScLXHy1p7PxE9nfHjCjJ9uLztJvqN3WeNd283PhIFIhX6yAZovmnLCr-fu24lrte_vaz2BF5yHGvYy4uHChJ7PuRHiBcRgcenJPjYyU8ihmzN7J3Z5CZyxBdPa4UWeWyc43_11_UCNlTGWxLBEiI1dz2m2KQD4QfUsmLdKo3gWSNKVzsobucyI_-zs5wKtPD1cmf0KvyQ8bU9i7Jti-9UYDVqoEmMfYKyWzz',
      createdAt: new Date().toISOString()
    };

    vault[cleanEmail] = {
      user: newUser,
      salt,
      passwordHash
    };
    saveVault(vault);
    setCurrentUser(newUser);
    setActiveSessionEmail(cleanEmail);
    return { success: true };
  };

  const logout = () => {
    setActiveSessionEmail(null);
    // Keep guest or prompt
    setCurrentUser(null);
  };

  const updateCredits = (amountDelta: number) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      societyCredits: Math.max(0, Number((currentUser.societyCredits + amountDelta).toFixed(2)))
    };
    setCurrentUser(updated);
    const vault = getStoredVault();
    if (vault[updated.email.toLowerCase()]) {
      vault[updated.email.toLowerCase()].user = updated;
      saveVault(vault);
    }
  };

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        signUp,
        logout,
        updateCredits,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        setAuthModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
