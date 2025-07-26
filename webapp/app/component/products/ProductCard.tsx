"use client";

import { Crown, Heart, Paintbrush, Scissors, Search, Sparkles, Star, Users, Waves, Zap, ShoppingBag, Package, Gift } from "lucide-react";
import Image from "next/image";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useMemo, useState } from "react";

// Define the Product type
type Product = {
    name: string;
    category: string;
    price: string;
    originalPrice?: string;
    discount?: number;
    brand: string;
    stock: string;
    description: string;
    image: string;
    features?: string[];
    badge?: string;
    note?: string;
};


// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
            <div className="relative overflow-hidden">
                <Image 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {product.badge && (
                    <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {product.badge}
                    </div>
                )}
                {product.discount && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        -{product.discount}%
                    </div>
                )}
            </div>
            
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-rose-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="text-right">
                        <div className="font-bold text-xl text-rose-600">{product.price}</div>
                        {product.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">{product.originalPrice}</div>
                        )}
                    </div>
                </div>
                
                <div className="text-sm text-rose-500 font-medium mb-2">{product.category}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-500">
                        <span className="font-medium">Brand:</span> {product.brand}
                    </div>
                    <div className="text-xs text-gray-500">
                        <span className="font-medium">Stock:</span> {product.stock}
                    </div>
                </div>

                {product.features && product.features.length > 0 && (
                    <div className="mb-4">
                        <div className="text-xs font-medium text-gray-700 mb-1">Key Features:</div>
                        <div className="flex flex-wrap gap-1">
                            {product.features.map((feature: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, idx: Key | null | undefined) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Add to Cart
                </button>
                
                {product.note && (
                    <p className="text-xs text-gray-500 mt-2 italic">{product.note}</p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;