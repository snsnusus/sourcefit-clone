import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  type ReactElement,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';
import { authService } from '~/services/auth.service';

interface AuthUser {
  id: string;
  name: string;
  role: string;
  departmentId?: string;
}

interface DecodedToken {
  sub: string;
  name: string;
  role: string;
  departmentId?: string;
  exp: number;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeUser = (accessToken: string): AuthUser => {
  const decoded = jwtDecode<DecodedToken>(accessToken);

  return {
    id: decoded.sub,
    name: decoded.name,
    role: decoded.role,
    departmentId: decoded.departmentId,
  };
};

export const AuthProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedAccessToken = localStorage.getItem('access_token');
    if (!savedAccessToken) return null;

    try {
      return decodeUser(savedAccessToken);
    } catch {
      return null;
    }
  });

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { accessToken, refreshToken } = await authService.login(
        username,
        password
      );

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      setUser(decodeUser(accessToken));

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);

      return false;
    }
  };

  const logout = async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch (error) {
        console.error('Logout request failed:', error);
      }
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
