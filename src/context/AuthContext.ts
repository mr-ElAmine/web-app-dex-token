import { createContext } from 'react';

import type { UserType } from '@/configuration/utils/zodParser';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserType | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  refreshTokensManually: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
