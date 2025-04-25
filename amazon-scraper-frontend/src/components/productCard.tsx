import React from "react";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard = ({
  product,
  onToggleFavorite,
  isFavorite,
}: ProductCardProps) => {
  return (
    <div className="border rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform bg-white flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain bg-gray-100 mb-3 rounded"
        onError={(e) =>
          ((e.target as HTMLImageElement).src = "/placeholder.png")
        }
      />
      <h4 className="text-sm font-semibold mb-1 line-clamp-2 text-black">
        {product.title}
      </h4>
      {product.rating && <p className="text-sm text-gray-700">{product.rating}</p>}
      {product.reviews && (
        <p className="text-sm text-gray-600">{product.reviews} reviews</p>
      )}
      <div className="flex justify-between items-center mt-3">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline"
        >
          View on Amazon
        </a>
        <button
          onClick={() => onToggleFavorite(product)}
          title="Favoritar"
          className="text-xl cursor-pointer"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
