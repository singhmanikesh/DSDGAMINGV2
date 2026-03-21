/// <reference types="vite/client" />
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export type RegisterForm = {
  email: string;
  gamerName: string;
  steamId: string;
  riotId: string;
  password: string;
  avatarDataUrl: string;
  avatarFileName: string;
  tags: string[];
  pastTournaments: string[];
};

export type AuthMode = 'login' | 'register';

export type AuthUser = {
  id?: string | number;
  email: string;
  gamerName?: string;
  gamername?: string;
  avatar?: string | null;
  avatarUrl?: string | null;
  avatarInitials?: string | null;
  accessToken?: string;
  refreshToken?: string;
  hp?: number;
  riotId?: string;
  steamId?: string;
};

type UserContextValue = {
  apiBaseUrl: string;
  authMode: AuthMode;
  setAuthMode: React.Dispatch<React.SetStateAction<AuthMode>>;
  form: RegisterForm;
  updateField: <K extends keyof RegisterForm>(name: K, value: RegisterForm[K]) => void;
  resetForm: () => void;
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const createDefaultForm = (): RegisterForm => ({
  email: '',
  gamerName: '',
  steamId: '',
  riotId: '',
  password: '',
  avatarDataUrl: '',
  avatarFileName: '',
  tags: [],
  pastTournaments: [],
});

const rawBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api/v1';
const apiBaseUrl = (rawBase || '').replace(/\/$/, '');

axios.defaults.baseURL = apiBaseUrl; ///
export const axiosClient = axios;

const getStoredUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('dsd_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch (err) {
    console.error('Failed to parse stored user', err);
    return null;
  }
};

const applyAuthHeader = (token?: string) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common.Authorization;
  }
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [form, setForm] = useState<RegisterForm>(createDefaultForm);

  const updateField = <K extends keyof RegisterForm>(name: K, value: RegisterForm[K]) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setForm(createDefaultForm());

  useEffect(() => {
    const storedToken =
      user?.accessToken ||
      (typeof window !== 'undefined'
        ? localStorage.getItem('dsd_access_token') || undefined
        : undefined);

    applyAuthHeader(storedToken);
  }, [user]);

  const value = useMemo(
    () => ({
      apiBaseUrl,
      authMode,
      setAuthMode,
      form,
      updateField,
      resetForm,
      user,
      setUser,
    }),
    [apiBaseUrl, authMode, form, user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used within UserProvider');
  return ctx;
}
