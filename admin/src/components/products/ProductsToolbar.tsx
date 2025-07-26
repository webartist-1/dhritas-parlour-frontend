// src/components/products/ProductsToolbar.tsx

import { PlusCircle, Search } from 'lucide-react';
import React from 'react';
import { ProductCategory } from '../../types/products';
import { Skeleton } from '../loading/Skeleton';

interface ProductsToolbarProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    categories: ProductCategory[];
    loading: boolean;
    onAddCategory: () => void;
}

const ProductsToolbar: React.FC<ProductsToolbarProps> = ({
    search,
    setSearch,
    category,
    setCategory,
    categories,
    loading,
    onAddCategory
}) => {
    if (loading) {
        return (
            <div className="space-y-3">
                <Skeleton height="h-10" />
                <Skeleton height="h-10" />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
            {/* Search */}
            <label className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </label>

            {/* Category Filter */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-56 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
                <option value="">All categories</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* Add Category Button */}
            <button
                type="button"
                onClick={onAddCategory}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden md:inline">New category</span>
            </button>
        </div>
    );
};

export default ProductsToolbar;
