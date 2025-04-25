import React from "react";

interface SearchBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
  loading: boolean;
  fetchProducts: () => void;
}

const SearchBar = ({
  keyword,
  setKeyword,
  loading,
  fetchProducts,
}: SearchBarProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Enter the keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-72"
      />
      <button
        onClick={fetchProducts}
        disabled={!keyword.trim() || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
