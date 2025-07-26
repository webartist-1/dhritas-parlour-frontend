// src/components/products/ProductDetailsModal.tsx

import { Edit, Package, X } from 'lucide-react';
import React from 'react';
import { Product } from '../../types/products';

interface ProductDetailsModalProps {
    product: Product;
    onClose: () => void;
    onEdit: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
    product,
    onClose,
    onEdit
}) => {
    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/600/400';
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${product.category.color}`}>
                                {product.category.name}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                onEdit();
                                onClose();
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                    {/* Variants */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Available Variants
                        </h3>
                        <div className="space-y-3">
                            {product.variants.map((variant) => (
                                <div key={variant.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <span className="font-medium text-gray-900">{variant.size}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-lg font-bold text-gray-900">£{variant.price}</span>
                                        <span className="text-sm text-gray-500">Stock: {variant.stock}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm text-gray-600">Total Variants</span>
                                <p className="text-xl font-bold text-gray-900">{product.variants.length}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Total Stock</span>
                                <p className="text-xl font-bold text-gray-900">{totalStock}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                        <p>Created: {new Date(product.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;
