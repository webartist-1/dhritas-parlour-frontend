// src/pages/Products.tsx

import React, { useEffect, useState } from 'react';
import CategoryModal from '../components/products/CategoryModal';
import ProductModal from '../components/products/ProductModal';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductsList from '../components/products/ProductsList';
import ProductsToolbar from '../components/products/ProductsToolbar';
import { Product, PRODUCT_CATEGORIES, ProductCategory } from '../types/products';
import Layout from '../components/Layout';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categories, setCategories] = useState<ProductCategory[]>(PRODUCT_CATEGORIES);
    const [showModal, setShowModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Simulate API call
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockProducts: Product[] = [
                {
                    id: '1',
                    name: 'Age Reversal Night Complex Moisturiser',
                    description: 'Advanced anti-aging moisturizer with peptides and retinol for overnight skin renewal.',
                    category: PRODUCT_CATEGORIES[0],
                    image: 'https://cdn.ecommercedns.uk/files/2/237032/7/48731977/regima-age-reversal-night-complex-moisturiser-50ml-night-creams_medium.jpg',
                    variants: [
                        { id: '1a', size: '15 ml', price: 13.95, stock: 25 },
                        { id: '1b', size: '50 ml', price: 42.95, stock: 15 }
                    ],
                    isActive: true,
                    createdAt: '2024-01-15',
                    updatedAt: '2024-01-15'
                },
                {
                    id: '2',
                    name: 'Daily Intelligent Sebum Solver Moisturiser SPF 25',
                    description: 'Oil-controlling moisturizer with SPF protection, perfect for combination and oily skin.',
                    category: PRODUCT_CATEGORIES[0],
                    image: 'https://cdn.ecommercedns.uk/files/2/237032/1/48732251/regima-daily-intelligent-sebum-solver-moisturiser-spf-25---50ml_medium.jpg',
                    variants: [
                        { id: '2a', size: '15 ml', price: 12.95, stock: 30 },
                        { id: '2b', size: '50 ml', price: 39.95, stock: 20 }
                    ],
                    isActive: true,
                    createdAt: '2024-01-20',
                    updatedAt: '2024-01-20'
                },
                {
                    id: '3',
                    name: 'Daily Radiant Boost SPF 25',
                    description: 'Brightening moisturizer with vitamin C and SPF protection for radiant, protected skin.',
                    category: PRODUCT_CATEGORIES[0],
                    image: 'https://cdn.ecommercedns.uk/files/2/237032/6/48475616/eve-taylor-anti-ageing-gift-set---ellabonita-exclusive-worth-72_medium.jpg',
                    variants: [
                        { id: '3a', size: '15 ml', price: 12.95, stock: 18 },
                        { id: '3b', size: '50 ml', price: 39.95, stock: 12 }
                    ],
                    isActive: true,
                    createdAt: '2024-01-25',
                    updatedAt: '2024-01-25'
                }
            ];

            setProducts(mockProducts);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category.id === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = async (productId: string) => {
        setProducts(prev => prev.filter(product => product.id !== productId));
    };

    const handleSaveProduct = async (productData: any) => {
        if (editingProduct) {
            // Update existing product
            setProducts(prev => prev.map(product =>
                product.id === editingProduct.id
                    ? { ...product, ...productData, updatedAt: new Date().toISOString() }
                    : product
            ));
        } else {
            // Add new product
            const newProduct: Product = {
                id: Date.now().toString(),
                ...productData,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setProducts(prev => [newProduct, ...prev]);
        }
        setShowModal(false);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <ProductsHeader
                    onAddProduct={handleAddProduct}
                    productsCount={products.length}
                    loading={loading}
                />

                <ProductsToolbar
                    search={searchQuery}
                    setSearch={setSearchQuery}
                    category={selectedCategory}
                    setCategory={setSelectedCategory}
                    categories={categories}
                    loading={loading}
                    onAddCategory={() => setShowCategoryModal(true)}
                />

                <ProductsList
                    products={filteredProducts}
                    loading={loading}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                />

                {showModal && (
                    <ProductModal
                        product={editingProduct}
                        categories={categories}
                        onSave={handleSaveProduct}
                        onClose={() => setShowModal(false)}
                    />
                )}

                {showCategoryModal && (
                    <CategoryModal
                        onSave={(category) => setCategories(prev => [...prev, category])}
                        onClose={() => setShowCategoryModal(false)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Products;
