import { User } from '../types';

export interface StoredUserAccount {
  user: User;
  salt: string;
  passwordHash: string;
}

const STORAGE_USERS_KEY = 'gent_bean_patron_vault_v1';
const STORAGE_SESSION_KEY = 'gent_bean_active_session_token';

// WebCrypto-based SHA-256 secure password hashing with salt
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:atelier_secret_pepper_2026`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const DEFAULT_PATRON: User = {
  id: 'patron-sterling',
  name: 'Lord Arthur Sterling',
  email: 'sterling@mayfairclub.co.uk',
  memberTier: 'Gold Roastery Member',
  memberNumber: 'GB-99214',
  societyCredits: 142.00,
  beansRoastedKg: 14.8,
  visits: 8,
  loungeCupsRemaining: 4,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc5ZZwkOmbL5Oqq_N_ScLXHy1p7PxE9nfHjCjJ9uLztJvqN3WeNd283PhIFIhX6yAZovmnLCr-fu24lrte_vaz2BF5yHGvYy4uHChJ7PuRHiBcRgcenJPjYyU8ihmzN7J3Z5CZyxBdPa4UWeWyc43_11_UCNlTGWxLBEiI1dz2m2KQD4QfUsmLdKo3gWSNKVzsobucyI_-zs5wKtPD1cmf0KvyQ8bU9i7Jti-9UYDVqoEmMfYKyWzz',
  createdAt: '2023-04-12T00:00:00Z'
};

export async function initializeUserVault(): Promise<void> {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(STORAGE_USERS_KEY);
  if (!existing) {
    const salt = generateSalt();
    const passwordHash = await hashPassword('Sterling1854!', salt);
    const initialVault: Record<string, StoredUserAccount> = {
      [DEFAULT_PATRON.email.toLowerCase()]: {
        user: DEFAULT_PATRON,
        salt,
        passwordHash
      }
    };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialVault));
    // Default logged in session to preserve the user experience of the screens
    localStorage.setItem(STORAGE_SESSION_KEY, DEFAULT_PATRON.email.toLowerCase());
  }
}

export function getStoredVault(): Record<string, StoredUserAccount> {
  try {
    const data = localStorage.getItem(STORAGE_USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to parse patron vault', e);
    return {};
  }
}

export function saveVault(vault: Record<string, StoredUserAccount>): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(vault));
  } catch (e) {
    console.error('Failed to save patron vault', e);
  }
}

export function getActiveSessionEmail(): string | null {
  try {
    return localStorage.getItem(STORAGE_SESSION_KEY);
  } catch {
    return null;
  }
}

export function setActiveSessionEmail(email: string | null): void {
  try {
    if (email) {
      localStorage.setItem(STORAGE_SESSION_KEY, email.toLowerCase());
    } else {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to set active session', e);
  }
}
