import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        // Token exists, user data will be set via setUser after login
        // For now, just set loading to false
        // In production, you would fetch user data from API here
      }
    } catch (error) {
      // Silently handle error - user will need to login again
      // In production, you might want to log this to an error tracking service
    } finally {
      setLoading(false);
    }
  };

  const setUser = (userData: User | null) => {
    setUserState(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
