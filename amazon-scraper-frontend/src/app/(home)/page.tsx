"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar";
import ProductGrid from "@/components/productGrid";
import { Product } from "@/types/product";
import { useFavorites } from "@/context/favoriteContext";
import Navbar from "@/components/navBar";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

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

  return (
    <main className="px-6 py-8 max-w-7xl mx-auto">
      <Navbar />

      <h1 className="text-4xl font-bold mb-6">Amazon Scraper</h1>

      <SearchBar
        keyword={keyword}
        setKeyword={setKeyword}
        loading={loading}
        fetchProducts={fetchProducts}
      />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        <ProductGrid
          products={products}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </section>
    </main>
  );
}
