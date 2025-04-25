"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";

interface FavoriteContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.url === product.url);
      if (exists) return prev.filter((fav) => fav.url !== product.url);
      return [...prev, product];
    });
  };

  const isFavorite = (product: Product) =>
    favorites.some((fav) => fav.url === product.url);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorites must be used within FavoriteProvider");
  return context;
};