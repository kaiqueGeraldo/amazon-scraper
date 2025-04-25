"use client";

import { useFavorites } from "@/context/favoriteContext";
import ProductGrid from "@/components/productGrid";
import Navbar from "@/components/navBar";

export default function FavoritePage() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <Navbar />

      <h1 className="text-4xl font-bold mb-6">
        Your Favorite Products
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorite products yet.</p>
      ) : (
        <ProductGrid
          products={favorites}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </main>
  );
}
