import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';

import { getCookie, setCookie, removeCookie } from '@/configuration/utils/cookie';
import { DateInstance } from '@/configuration/utils/date';
import type { UserType } from '@/configuration/utils/zodParser';
import { AuthContext, type AuthContextType } from '@/context/AuthContext';
import { useRefreshToken } from '@/hook/use-auth';

const decodeToken = (token: string): (UserType & { exp?: number }) | null => {
  try {
    const payload = token.split('.')[1];
    const decodedJson = atob(payload);
    const decoded = JSON.parse(decodedJson);
    return {
      name: decoded.name,
      email: decoded.email,
      emailVerified: decoded.emailVerified,
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutateAsync: refreshToken } = useRefreshToken();

  const logout = useCallback(() => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
  }, [setIsAuthenticated, setUser]);

  const verifyToken = useCallback(async () => {
    setIsLoading(true);
    try {
      const accessToken = getCookie('accessToken');
      const decoded = accessToken ? decodeToken(accessToken) : null;

      if (decoded && decoded.exp && decoded.exp - 5 * 60 > DateInstance.now().toUnix()) {
        setUser({ name: decoded.name, email: decoded.email, emailVerified: decoded.emailVerified });
        setIsAuthenticated(true);
      } else {
        const refresh = getCookie('refreshToken');
        if (refresh) {
          const newTokens = await refreshToken();
          setCookie('accessToken', newTokens.accessToken);
          setCookie('refreshToken', newTokens.refreshToken);
          const newDecoded = decodeToken(newTokens.accessToken);
          if (newDecoded) {
            setUser({
              name: newDecoded.name,
              email: newDecoded.email,
              emailVerified: newDecoded.emailVerified,
            });
            setIsAuthenticated(true);
          }
        } else {
          logout();
        }
      }
    } catch (err) {
      console.error('Auth verification failed', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken, logout]);

  const refreshTokensManually = useCallback(async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setIsAuthenticated(false);

      const newTokens = await refreshToken();

      setCookie('accessToken', newTokens.accessToken);
      setCookie('refreshToken', newTokens.refreshToken);

      const newDecoded = decodeToken(newTokens.accessToken);

      if (newDecoded) {
        setUser({
          name: newDecoded.name,
          email: newDecoded.email,
          emailVerified: newDecoded.emailVerified,
        });
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Manual token refresh failed', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken, logout]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    verifyToken();

    const intervalMs = 5 * 60 * 1000;
    const intervalId = setInterval(() => {
      verifyToken();
    }, intervalMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [verifyToken]);

  const login = useCallback((accessToken: string, refreshTokenValue: string) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshTokenValue);
    const decoded = decodeToken(accessToken);
    if (decoded) {
      setUser({ name: decoded.name, email: decoded.email, emailVerified: decoded.emailVerified });
      setIsAuthenticated(true);
    }
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      isLoading,
      user,
      login,
      logout,
      refreshTokensManually,
    }),
    [isAuthenticated, isLoading, user, login, logout, refreshTokensManually],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
