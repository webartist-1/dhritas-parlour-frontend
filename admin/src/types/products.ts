// src/types/products.ts

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  image: string;
  variants: ProductVariant[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  color: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  categoryId: string;
  image: File | string;
  variants: Omit<ProductVariant, 'id'>[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: '1', name: 'Moisturisers', color: 'bg-blue-100 text-blue-800' },
  { id: '2', name: 'Cleansers', color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'Serums', color: 'bg-purple-100 text-purple-800' },
  { id: '4', name: 'Sunscreens', color: 'bg-orange-100 text-orange-800' },
  { id: '5', name: 'Treatments', color: 'bg-pink-100 text-pink-800' },
  { id: '6', name: 'Tools & Accessories', color: 'bg-indigo-100 text-indigo-800' }
];
