'use client';

import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { authService } from '@/app/services/auth';

interface IUserInfo {
  username: string;
  userId: string;
}

interface IAuthContext {
  userInfo: { username: string; userId: string } | null;
  onLogin: (email: string, password: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await authService.onLogin(email, password);
      const accessToken = response.userInfo.token;

      const currentUser: IUserInfo =
        authService.extractCurrentUser(accessToken);
      setUserInfo(currentUser);

      return response;
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, onLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthProvider;
