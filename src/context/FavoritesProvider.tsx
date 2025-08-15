"use client";
import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Ctx = {
  favorites: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};
const FavCtx = createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const api = useMemo<Ctx>(
    () => ({
      favorites,
      toggle: (id) =>
        setFavorites((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        ),
      has: (id) => favorites.includes(id),
    }),
    [favorites, setFavorites]
  );
  return <FavCtx.Provider value={api}>{children}</FavCtx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavCtx);
  if (!ctx) throw new Error("useFavorites outside provider");
  return ctx;
}
