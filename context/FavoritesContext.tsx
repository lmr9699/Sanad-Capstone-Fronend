import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

const FAVORITES_KEY = "@sanad_favorites";

interface FavoriteItem {
  id: string;
  type: "professional" | "center";
  name: string;
  subtitle: string;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: Omit<FavoriteItem, "addedAt">) => Promise<void>;
  removeFavorite: (id: string, type: "professional" | "center") => Promise<void>;
  isFavorite: (id: string, type: "professional" | "center") => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      if (data) {
        setFavorites(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteItem[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.log("Error saving favorites:", error);
    }
  };

  const addFavorite = async (item: Omit<FavoriteItem, "addedAt">) => {
    const newFavorite: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    const newFavorites = [newFavorite, ...favorites];
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (id: string, type: "professional" | "center") => {
    const newFavorites = favorites.filter(
      (f) => !(f.id === id && f.type === type)
    );
    await saveFavorites(newFavorites);
  };

  const isFavorite = (id: string, type: "professional" | "center") => {
    return favorites.some((f) => f.id === id && f.type === type);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
