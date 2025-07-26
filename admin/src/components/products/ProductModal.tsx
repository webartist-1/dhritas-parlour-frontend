// src/components/products/ProductModal.tsx

import { Plus, Trash2, Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Product, ProductCategory, ProductFormData, ProductVariant } from '../../types/products';

interface ProductModalProps {
    product?: Product | null;
    categories: ProductCategory[];
    onSave: (data: any) => void;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
    product,
    categories,
    onSave,
    onClose
}) => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        categoryId: '',
        image: '',
        variants: [{ size: '', price: 0, stock: 0 }]
    });
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                categoryId: product.category.id,
                image: product.image,
                variants: product.variants.map(v => ({ size: v.size, price: v.price, stock: v.stock }))
            });
            setImagePreview(product.image);
        }
    }, [product]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { size: '', price: 0, stock: 0 }]
        }));
    };

    const removeVariant = (index: number) => {
        if (formData.variants.length > 1) {
            setFormData(prev => ({
                ...prev,
                variants: prev.variants.filter((_, i) => i !== index)
            }));
        }
    };

    const updateVariant = (index: number, field: keyof Omit<ProductVariant, 'id'>, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            variants: prev.variants.map((variant, i) =>
                i === index ? { ...variant, [field]: value } : variant
            )
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.categoryId) newErrors.categoryId = 'Category is required';
        if (!formData.image && !product) newErrors.image = 'Image is required';

        // Validate variants
        formData.variants.forEach((variant, index) => {
            if (!variant.size.trim()) newErrors[`variant_${index}_size`] = 'Size is required';
            if (variant.price <= 0) newErrors[`variant_${index}_price`] = 'Price must be greater than 0';
            if (variant.stock < 0) newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const category = categories.find(cat => cat.id === formData.categoryId)!;
            const variants = formData.variants.map((variant, index) => ({
                id: product?.variants[index]?.id || `${Date.now()}_${index}`,
                ...variant
            }));

            onSave({
                ...formData,
                category,
                variants
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Image
                        </label>
                        <div className="flex items-center space-x-4">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                />
                            )}
                            <label className="flex-1 flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter product name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter product description"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Variants */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Product Variants (Size, Price, Stock)
                            </label>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                            >
                                <Plus className="w-4 h-4" />
                                Add Variant
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.variants.map((variant, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
                                        <input
                                            type="text"
                                            value={variant.size}
                                            onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="e.g., 15 ml"
                                        />
                                        {errors[`variant_${index}_size`] && <p className="text-red-500 text-xs mt-1">{errors[`variant_${index}_size`]}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Price (£)</label>
                                        <input
                                            type="number"
                                            value={variant.price}
                                            onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                        {errors[`variant_${index}_price`] && <p className="text-red-500 text-xs mt-1">{errors[`variant_${index}_price`]}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            value={variant.stock}
                                            onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="0"
                                            min="0"
                                        />
                                        {errors[`variant_${index}_stock`] && <p className="text-red-500 text-xs mt-1">{errors[`variant_${index}_stock`]}</p>}
                                    </div>

                                    <div className="flex items-end">
                                        {formData.variants.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="w-full px-3 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        >
                            {product ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
