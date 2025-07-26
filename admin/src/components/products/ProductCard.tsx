// src/components/products/ProductCard.tsx

import { Edit, Eye, Package, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Product } from '../../types/products';
import ProductDetailsModal from './ProductDetailsModal';

interface ProductCardProps {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        onDelete();
        setShowDeleteConfirm(false);
    };

    // Get price range
    const prices = product.variants.map(v => v.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceDisplay = minPrice === maxPrice ? `£${minPrice}` : `£${minPrice} - £${maxPrice}`;

    // Get total stock
    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/300/300';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-smbg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => setShowDetails(true)}
                            className="bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.category.color}`}>
                            {product.category.name}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    {/* Variants Info */}
                    <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-500 flex items-center">
                            <Package className="w-4 h-4 mr-1" />
                            {product.variants.length} size{product.variants.length !== 1 ? 's' : ''} available
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">{priceDisplay}</span>
                            <span className="text-sm text-gray-500">Stock: {totalStock}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                            {product.variants.length > 1 ? 'Multiple sizes' : product.variants[0]?.size}
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={onEdit}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Edit product"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Delete product"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Modal */}
            {showDetails && (
                <ProductDetailsModal
                    product={product}
                    onClose={() => setShowDetails(false)}
                    onEdit={onEdit}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Product</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
