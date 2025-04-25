"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar";
import ProductGrid from "../components/productGrid";
import { Product } from "../types/product";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchProducts = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:3005/api/scrape?keyword=${encodeURIComponent(
          keyword
        )}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data);
      } else {
        setError(data.error || "Unexpected error");
      }
    } catch {
      setError("Network error");
    }
    setLoading(false);
  };

  const toggleFavorite = (product: Product) => {
    const exists = favorites.find((fav) => fav.url === product.url);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.url !== product.url));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const isFavorite = (product: Product) =>
    favorites.some((fav) => fav.url === product.url);

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Amazon Scraper</h1>

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        loading={loading}
        fetchProducts={fetchProducts}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {favorites.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Favorites</h2>
          <ProductGrid
            products={favorites}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <ProductGrid
          products={products}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </section>
    </main>
  );
}
