// src/components/products/ProductsList.tsx

import React from 'react';
import { Product } from '../../types/products';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';
import ProductCard from './ProductCard';

interface ProductsListProps {
    products: Product[];
    loading: boolean;
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (productId: string) => void;
}

const ProductCardSkeleton: React.FC = () => (
    <SkeletonContainer>
        <Skeleton width="w-full" height="h-48" rounded="lg" className="mb-4" />
        <div className="space-y-3">
            <div className="flex justify-between items-start">
                <Skeleton width="w-32" height="h-6" />
                <Skeleton width="w-16" height="h-5" rounded="full" />
            </div>
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-3/4" height="h-4" />
            <div className="space-y-2 pt-2">
                <Skeleton width="w-20" height="h-4" />
                <div className="flex justify-between">
                    <Skeleton width="w-16" height="h-5" />
                    <Skeleton width="w-12" height="h-5" />
                </div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <Skeleton width="w-20" height="h-4" />
                <div className="flex space-x-2">
                    <Skeleton width="w-16" height="h-8" rounded="md" />
                    <Skeleton width="w-16" height="h-8" rounded="md" />
                </div>
            </div>
        </div>
    </SkeletonContainer>
);

const ProductsList: React.FC<ProductsListProps> = ({
    products,
    loading,
    onEditProduct,
    onDeleteProduct
}) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <ProductCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => onEditProduct(product)}
                    onDelete={() => onDeleteProduct(product.id)}
                />
            ))}
        </div>
    );
};

export default ProductsList;
