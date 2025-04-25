import React from "react";
import ProductCard from "./productCard";
import { Product } from "../types/product";

interface ProductGridProps {
  products: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
}

const ProductGrid = ({
  products,
  toggleFavorite,
  isFavorite,
}: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, i) => (
        <ProductCard
          key={product.url + i}
          product={product}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(product)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
