"use client";

import { Crown, Heart, Paintbrush, Scissors, Search, Sparkles, Star, Users, Waves, Zap } from "lucide-react";
import ServiceCard from "../component/services/ServiceCard";
import { Key, useMemo, useState } from "react";
import CategoryBadge from "../component/CategoryBadge";
import SearchAndFilter from "../component/SearchAndFilter";
import HeroSection from "../component/HeroSection";

// Main Services Page Component
type Service = {
    name: string;
    category: string;
    price: string;
    duration: string;
    description: string;
    image: string;
    note?: string;
};

const ServicesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Mock image URLs - in a real app, these would come from your image storage
    const serviceCategories = [
        'Anti-Wrinkle',
        'Dermal Fillers',
        'Skin Boosters',
        'Mesotherapy',
        'Skin Peels',
        'Advanced Facials',
        'Waxing',
        'Threading',
        'Lash & Brow',
        'Semi Permanent',
        'Nails',
        'Make-up',
        'Packages'
    ] as const;
    type ServiceCategory = typeof serviceCategories[number];

    const getServiceImage = (category: string) => {
        const images: Record<ServiceCategory, string> = {
            'Anti-Wrinkle': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
            'Dermal Fillers': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
            'Skin Boosters': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
            'Mesotherapy': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
            'Skin Peels': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            'Advanced Facials': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            'Waxing': 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&h=300&fit=crop',
            'Threading': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
            'Lash & Brow': 'https://images.unsplash.com/photo-1583001931096-959e22d5a761?w=400&h=300&fit=crop',
            'Semi Permanent': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
            'Nails': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
            'Make-up': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
            'Packages': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop'
        };
        if ((serviceCategories as readonly string[]).includes(category)) {
            return images[category as ServiceCategory];
        }
        return 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop';
    };

    const services = [
        // Anti-Wrinkle Injections
        { name: "Free Consultation", category: "Anti-Wrinkle", price: "FREE", duration: "30min", description: "Professional consultation to determine the best treatment plan for your needs", image: getServiceImage('Anti-Wrinkle') },
        { name: "Forehead Treatment", category: "Anti-Wrinkle", price: "£150", duration: "45min", description: "Smooth forehead lines and wrinkles with precision injections", image: getServiceImage('Anti-Wrinkle') },
        { name: "Frown Lines", category: "Anti-Wrinkle", price: "£150", duration: "45min", description: "Reduce frown lines between the eyebrows for a refreshed look", image: getServiceImage('Anti-Wrinkle') },
        { name: "Crows Feet", category: "Anti-Wrinkle", price: "£150", duration: "45min", description: "Minimize laugh lines around the eyes for a youthful appearance", image: getServiceImage('Anti-Wrinkle') },
        { name: "Under Eyes", category: "Anti-Wrinkle", price: "£140", duration: "45min", description: "Treat delicate under-eye area to reduce fine lines", image: getServiceImage('Anti-Wrinkle') },
        { name: "3 Areas Package", category: "Anti-Wrinkle", price: "£250", duration: "60min", description: "Comprehensive treatment for forehead, frown, and crows feet", image: getServiceImage('Anti-Wrinkle') },

        // Dermal Fillers
        { name: "Lip Filler 0.55ml", category: "Dermal Fillers", price: "£150", duration: "45min", description: "Subtle lip enhancement for natural-looking fullness", image: getServiceImage('Dermal Fillers') },
        { name: "Lip Filler 1ml", category: "Dermal Fillers", price: "£220", duration: "45min", description: "Enhanced lip volume and definition with premium fillers", image: getServiceImage('Dermal Fillers') },
        { name: "Russian Lips 1ml", category: "Dermal Fillers", price: "£220", duration: "45min", description: "Dramatic lip enhancement with the trending Russian technique", image: getServiceImage('Dermal Fillers') },
        { name: "Cheek Contouring 1ml", category: "Dermal Fillers", price: "£220", duration: "45min", description: "Sculpt and define cheekbones for enhanced facial structure", image: getServiceImage('Dermal Fillers') },
        { name: "Mini Facelift", category: "Dermal Fillers", price: "£700", duration: "90min", description: "Non-surgical facelift using up to 5ml of premium fillers", image: getServiceImage('Dermal Fillers') },

        // Skin Boosters
        { name: "Profhilo Treatment", category: "Skin Boosters", price: "£250", duration: "30min", description: "Revolutionary skin remodeling treatment for hydration and firmness", image: getServiceImage('Skin Boosters') },
        { name: "Hyal 70 Treatment", category: "Skin Boosters", price: "£150", duration: "30min", description: "Intensive hydration treatment for glowing, youthful skin", image: getServiceImage('Skin Boosters') },
        { name: "Vitamin B12 Shot", category: "Skin Boosters", price: "£30", duration: "15min", description: "Energy-boosting injection for overall wellness and skin health", image: getServiceImage('Skin Boosters') },

        // Advanced Facials
        { name: "Hydra Facial", category: "Advanced Facials", price: "£80", duration: "60min", description: "Multi-step treatment for instant glow and skin rejuvenation", image: getServiceImage('Advanced Facials'), note: "Course of 3 £215" },
        { name: "Microneedling", category: "Advanced Facials", price: "£175", duration: "60min", description: "Collagen-stimulating treatment for improved skin texture", image: getServiceImage('Advanced Facials') },
        { name: "LED Light Therapy", category: "Advanced Facials", price: "£50", duration: "60min", description: "Therapeutic light treatment for acne and anti-aging", image: getServiceImage('Advanced Facials') },
        { name: "Radiofrequency", category: "Advanced Facials", price: "£75", duration: "60min", description: "Skin tightening treatment using advanced RF technology", image: getServiceImage('Advanced Facials') },

        // Lash & Brow
        { name: "Russian Volume Lashes", category: "Lash & Brow", price: "£65", duration: "1hr30min", description: "Dramatic volume lashes with multiple extensions per natural lash", image: getServiceImage('Lash & Brow') },
        { name: "Classic Lashes", category: "Lash & Brow", price: "£50", duration: "1hr30min", description: "Natural-looking lash extensions for everyday elegance", image: getServiceImage('Lash & Brow') },
        { name: "Brow Lamination", category: "Lash & Brow", price: "£45", duration: "45min", description: "Trending brow treatment for fuller, more defined eyebrows", image: getServiceImage('Lash & Brow') },
        { name: "Lash Lift & Tint", category: "Lash & Brow", price: "£40", duration: "60min", description: "Curl and darken natural lashes for a mascara-like effect", image: getServiceImage('Lash & Brow') },

        // Semi Permanent Make-up
        { name: "Microblading", category: "Semi Permanent", price: "£350", duration: "2hrs", description: "Hair-stroke technique for naturally defined eyebrows", image: getServiceImage('Semi Permanent') },
        { name: "Ombré Brows", category: "Semi Permanent", price: "£350", duration: "1hr30min", description: "Gradient powder brows for a soft, makeup-like finish", image: getServiceImage('Semi Permanent') },
        { name: "3D Brows with Shading", category: "Semi Permanent", price: "£375", duration: "2hrs", description: "Combination technique for the most natural-looking brows", image: getServiceImage('Semi Permanent') },

        // Nails
        { name: "Gel Manicure", category: "Nails", price: "£30", duration: "45min", description: "Long-lasting gel polish manicure with perfect finish", image: getServiceImage('Nails') },
        { name: "Gel Pedicure", category: "Nails", price: "£30", duration: "60min", description: "Relaxing pedicure with durable gel polish", image: getServiceImage('Nails') },

        // Make-up
        { name: "Bridal Make-up", category: "Make-up", price: "£90", duration: "90min", description: "Flawless bridal look for your special day", image: getServiceImage('Make-up') },
        { name: "Evening Make-up", category: "Make-up", price: "£50", duration: "60min", description: "Glamorous evening look for special occasions", image: getServiceImage('Make-up') },

        // Packages
        { name: "Mini Indulgence", category: "Packages", price: "£150", duration: "90min", description: "Complete pampering package: massage, facial, manicure & pedicure", image: getServiceImage('Packages') },
        { name: "Holiday Package", category: "Packages", price: "£70", duration: "90min", description: "Get holiday-ready: brow shape, bikini wax, half leg wax & pedicure", image: getServiceImage('Packages') }
    ];

    const categories = Array.from(new Set(services.map(service => service.category)));

    const categoryIcons = {
        'Anti-Wrinkle': Zap,
        'Dermal Fillers': Sparkles,
        'Skin Boosters': Waves,
        'Advanced Facials': Star,
        'Lash & Brow': Users,
        'Semi Permanent': Crown,
        'Nails': Paintbrush,
        'Make-up': Heart,
        'Packages': Scissors
    };

    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === '' || service.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const getCategoryCount = (category: string) => {
        return services.filter(service => service.category === category).length;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <HeroSection
                title="Our Services"
                subtitle="Experience the Art of Beauty"
                description="Discover our comprehensive range of premium beauty treatments designed to enhance your natural beauty"
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
                        const Icon = categoryIcons[category as keyof typeof categoryIcons] || Star;
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

            {/* Services Grid */}
            <div className="container mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index: Key | null | undefined) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
                        <p className="text-gray-500">Try adjusting your search terms or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;