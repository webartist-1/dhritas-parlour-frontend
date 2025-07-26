// src/components/products/ProductsHeader.tsx

import { Plus } from 'lucide-react';
import React from 'react';
import { Skeleton } from '../loading/Skeleton';

interface ProductsHeaderProps {
    onAddProduct: () => void;
    productsCount: number;
    loading: boolean;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
    onAddProduct,
    productsCount,
    loading
}) => {
    if (loading) {
        return (
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton width="w-40" height="h-8" className="mb-2" />
                    <Skeleton width="w-32" height="h-5" />
                </div>
                <Skeleton width="w-32" height="h-10" rounded="lg" />
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                <p className="text-gray-600 mt-1">
                    Manage your product catalog ({productsCount} total)
                </p>
            </div>

            <button
                onClick={onAddProduct}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm"
            >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
            </button>
        </div>
    );
};

export default ProductsHeader;
