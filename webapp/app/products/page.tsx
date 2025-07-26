"use client";

import { Crown, Gift, Heart, Package, Paintbrush, Scissors, Search, ShoppingBag, Sparkles, Star, Users, Waves, Zap } from "lucide-react";
import { Key, useMemo, useState } from "react";
import HeroSection from "../component/HeroSection";
import SearchAndFilter from "../component/SearchAndFilter";
import CategoryBadge from "../component/CategoryBadge";
import ProductCard from "../component/products/ProductCard";

// Main Products Page Component
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

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const productCategories = [
        'Skincare Serums',
        'Anti-Aging Creams',
        'Cleansers & Toners',
        'Moisturizers',
        'Eye Care',
        'Sun Protection',
        'Professional Tools',
        'Makeup',
        'Hair Care',
        'Body Care',
        'Gift Sets',
        'Supplements'
    ] as const;
    type ProductCategory = typeof productCategories[number];

    const getProductImage = (category: string) => {
        const images: Record<ProductCategory, string> = {
            'Skincare Serums': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop',
            'Anti-Aging Creams': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
            'Cleansers & Toners': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop',
            'Moisturizers': 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=300&fit=crop',
            'Eye Care': 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop',
            'Sun Protection': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
            'Professional Tools': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
            'Makeup': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
            'Hair Care': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=300&fit=crop',
            'Body Care': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
            'Gift Sets': 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=400&h=300&fit=crop',
            'Supplements': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
        };
        if ((productCategories as readonly string[]).includes(category)) {
            return images[category as ProductCategory];
        }
        return 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop';
    };

    const products = [
        // Skincare Serums
        { name: "Vitamin C Brightening Serum", category: "Skincare Serums", price: "£45", brand: "GlowTech", stock: "In Stock", description: "Powerful antioxidant serum with 20% Vitamin C for radiant, even-toned skin", image: getProductImage('Skincare Serums'), features: ["20% Vitamin C", "Antioxidants", "Brightening"], badge: "Bestseller" },
        { name: "Hyaluronic Acid Hydra Serum", category: "Skincare Serums", price: "£38", brand: "AquaLux", stock: "In Stock", description: "Intensive hydrating serum with multiple molecular weights of hyaluronic acid", image: getProductImage('Skincare Serums'), features: ["Multi-HA", "Deep Hydration", "Plumping"] },
        { name: "Retinol Renewal Serum", category: "Skincare Serums", price: "£52", originalPrice: "£65", discount: 20, brand: "YouthRx", stock: "Limited", description: "Advanced retinol formula for anti-aging and skin texture improvement", image: getProductImage('Skincare Serums'), features: ["0.5% Retinol", "Anti-Aging", "Texture Refining"] },

        // Anti-Aging Creams
        { name: "Collagen Boost Night Cream", category: "Anti-Aging Creams", price: "£68", brand: "TimelessBeauty", stock: "In Stock", description: "Rich night cream with peptides and collagen boosters for youthful skin", image: getProductImage('Anti-Aging Creams'), features: ["Peptides", "Collagen Boosters", "Night Recovery"] },
        { name: "24K Gold Eye Cream", category: "Anti-Aging Creams", price: "£85", brand: "LuxeGlow", stock: "In Stock", description: "Luxurious eye cream with 24K gold flakes and anti-aging compounds", image: getProductImage('Anti-Aging Creams'), features: ["24K Gold", "Eye Area", "Luxury Formula"], badge: "Premium" },

        // Cleansers & Toners
        { name: "Gentle Foam Cleanser", category: "Cleansers & Toners", price: "£28", brand: "PureClean", stock: "In Stock", description: "pH-balanced foam cleanser suitable for all skin types", image: getProductImage('Cleansers & Toners'), features: ["pH Balanced", "All Skin Types", "Gentle Formula"] },
        { name: "Rose Water Toner", category: "Cleansers & Toners", price: "£32", brand: "BotanicBliss", stock: "In Stock", description: "Refreshing toner with pure rose water and botanical extracts", image: getProductImage('Cleansers & Toners'), features: ["Rose Water", "Botanicals", "Refreshing"] },

        // Moisturizers
        { name: "Daily Defense Moisturizer SPF 30", category: "Moisturizers", price: "£42", brand: "ShieldSkin", stock: "In Stock", description: "Lightweight daily moisturizer with broad-spectrum SPF protection", image: getProductImage('Moisturizers'), features: ["SPF 30", "Daily Use", "Lightweight"] },
        { name: "Overnight Repair Moisturizer", category: "Moisturizers", price: "£55", brand: "NightGlow", stock: "In Stock", description: "Rich overnight moisturizer with ceramides and repair complexes", image: getProductImage('Moisturizers'), features: ["Overnight", "Ceramides", "Repair Complex"] },

        // Eye Care
        { name: "Dark Circle Corrector", category: "Eye Care", price: "£48", brand: "BrightEyes", stock: "In Stock", description: "Targeted treatment for dark circles with caffeine and vitamin K", image: getProductImage('Eye Care'), features: ["Caffeine", "Vitamin K", "Dark Circles"] },
        { name: "Lash Growth Serum", category: "Eye Care", price: "£75", brand: "LashLux", stock: "Limited", description: "Clinically proven serum for longer, fuller lashes in 8 weeks", image: getProductImage('Eye Care'), features: ["Lash Growth", "8 Week Results", "Clinically Proven"], badge: "Trending" },

        // Professional Tools
        { name: "Jade Facial Roller", category: "Professional Tools", price: "£25", brand: "ZenTools", stock: "In Stock", description: "Authentic jade facial roller for lymphatic drainage and relaxation", image: getProductImage('Professional Tools'), features: ["Authentic Jade", "Lymphatic Drainage", "Relaxing"] },
        { name: "LED Light Therapy Mask", category: "Professional Tools", price: "£185", originalPrice: "£220", discount: 16, brand: "TechSkin", stock: "In Stock", description: "Professional-grade LED mask with red and blue light therapy", image: getProductImage('Professional Tools'), features: ["LED Therapy", "Professional Grade", "Red & Blue Light"] },

        // Makeup
        { name: "HD Foundation Palette", category: "Makeup", price: "£65", brand: "ProMakeup", stock: "In Stock", description: "Professional HD foundation palette with 12 customizable shades", image: getProductImage('Makeup'), features: ["12 Shades", "HD Formula", "Professional"] },
        { name: "Waterproof Mascara Set", category: "Makeup", price: "£35", brand: "GlamLash", stock: "In Stock", description: "Long-lasting waterproof mascara for volume and length", image: getProductImage('Makeup'), features: ["Waterproof", "Volume", "Length"] },

        // Gift Sets
        { name: "Complete Skincare Starter Kit", category: "Gift Sets", price: "£125", originalPrice: "£165", discount: 24, brand: "SkinEssentials", stock: "In Stock", description: "5-piece skincare routine perfect for beginners or as a gift", image: getProductImage('Gift Sets'), features: ["5 Products", "Complete Routine", "Gift Ready"], badge: "Gift Set" },
        { name: "Luxury Spa Experience Box", category: "Gift Sets", price: "£95", brand: "SpaLux", stock: "Limited", description: "Premium spa products for an at-home luxury experience", image: getProductImage('Gift Sets'), features: ["Spa Experience", "Luxury", "At-Home"], note: "Limited holiday edition" },

        // Supplements
        { name: "Collagen Beauty Capsules", category: "Supplements", price: "£45", brand: "BeautyVitals", stock: "In Stock", description: "Marine collagen supplements for skin, hair, and nail health", image: getProductImage('Supplements'), features: ["Marine Collagen", "Beauty From Within", "90 Capsules"] },
        { name: "Hair Growth Vitamins", category: "Supplements", price: "£38", brand: "HairVitality", stock: "In Stock", description: "Biotin-rich formula for stronger, healthier hair growth", image: getProductImage('Supplements'), features: ["Biotin", "Hair Growth", "60 Tablets"] }
    ];

    const categories = Array.from(new Set(products.map(product => product.category)));

    const categoryIcons = {
        'Skincare Serums': Sparkles,
        'Anti-Aging Creams': Crown,
        'Cleansers & Toners': Waves,
        'Moisturizers': Heart,
        'Eye Care': Users,
        'Sun Protection': Star,
        'Professional Tools': Scissors,
        'Makeup': Paintbrush,
        'Hair Care': Zap,
        'Body Care': Waves,
        'Gift Sets': Gift,
        'Supplements': Package
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const getCategoryCount = (category: string) => {
        return products.filter(product => product.category === category).length;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <HeroSection
                title="Our Products"
                subtitle="Premium Beauty Products"
                description="Discover our curated collection of professional-grade beauty and skincare products"
            />

            <SearchAndFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />

            {/* Category Overview */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {categories.map(category => {
                        const Icon = categoryIcons[category as keyof typeof categoryIcons] || ShoppingBag;
                        return (
                            <CategoryBadge
                                key={category}
                                category={category}
                                icon={Icon}
                                count={getCategoryCount(category)}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, index: Key | null | undefined) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search terms or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;