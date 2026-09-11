import type { UserModel } from '~/models/user.models';
import {
  createContext,
  type ReactElement,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { authService } from '~/services/auth.service';

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  login: (identity: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const MockAuthProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  const [user, setUser] = useState<UserModel | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (
    identity: string,
    password: string
  ): Promise<boolean> => {
    try {
      const matchedUser = await authService.verifyCredentials(
        identity,
        password
      );

      if (matchedUser) {
        localStorage.setItem('auth_user', JSON.stringify(matchedUser));
        setUser(matchedUser);

        return true;
      }

      localStorage.removeItem('auth_user');
      setUser(null);

      return false;
    } catch (error) {
      console.error('Authentication connection error inside Context:', error);
      setUser(null);

      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('auth_user');
    setUser(null); // Instantly boots unauthorized users out!
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within a MockAuthProvider');
  return context;
};
