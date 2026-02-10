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
  login: (email: string, password: string, name?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const USER_KEY = "sanad_user";
const TOKEN_KEY = "token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await SecureStore.getItemAsync(USER_KEY);
      if (userJson) {
        const userData = JSON.parse(userJson);
        setUserState(userData);
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      // In a real app, this would call your API
      // For demo purposes, we create a user from the email
      const userName = name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      
      const userData: User = {
        id: Date.now().toString(),
        name: userName,
        email: email.toLowerCase(),
      };

      // Save user data
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      await SecureStore.setItemAsync(TOKEN_KEY, "demo_token_" + Date.now());
      
      setUserState(userData);
      return true;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email.toLowerCase(),
      };

      // Save user data
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
      await SecureStore.setItemAsync(TOKEN_KEY, "demo_token_" + Date.now());
      
      setUserState(userData);
      return true;
    } catch (error) {
      console.log("Register error:", error);
      return false;
    }
  };

  const setUser = (userData: User | null) => {
    setUserState(userData);
    if (userData) {
      SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, setUser, logout }}>
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
