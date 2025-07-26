// src/pages/Services.tsx

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CategoryModal from '../components/services/CategoryModal';
import ServiceModal from '../components/services/ServiceModal';
import ServicesHeader from '../components/services/ServicesHeader';
import ServicesList from '../components/services/ServicesList';
import ServicesToolbar from '../components/services/ServicesToolbar';
import { Service, SERVICE_CATEGORIES, ServiceCategory } from '../types/services';

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categories, setCategories] = useState<ServiceCategory[]>(SERVICE_CATEGORIES);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    // Simulate API call
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockServices: Service[] = [
                {
                    id: '1',
                    name: 'Classic Facial',
                    description: 'Deep cleansing facial with exfoliation and moisturizing treatment for all skin types.',
                    duration: 60,
                    price: 120,
                    category: SERVICE_CATEGORIES[0],
                    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop',
                    isActive: true,
                    createdAt: '2024-01-15',
                    updatedAt: '2024-01-15'
                },
                {
                    id: '2',
                    name: 'Microblading',
                    description: 'Semi-permanent eyebrow enhancement technique for natural-looking brows.',
                    duration: 120,
                    price: 350,
                    category: SERVICE_CATEGORIES[1],
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
                    isActive: true,
                    createdAt: '2024-01-20',
                    updatedAt: '2024-01-20'
                },
                {
                    id: '3',
                    name: 'Chemical Peel',
                    description: 'Professional chemical peel to improve skin texture and reduce fine lines.',
                    duration: 45,
                    price: 150,
                    category: SERVICE_CATEGORIES[2],
                    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
                    isActive: true,
                    createdAt: '2024-01-25',
                    updatedAt: '2024-01-25'
                },
                {
                    id: '4',
                    name: 'Botox Treatment',
                    description: 'Anti-aging injectable treatment to reduce wrinkles and fine lines.',
                    duration: 30,
                    price: 400,
                    category: SERVICE_CATEGORIES[3],
                    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
                    isActive: true,
                    createdAt: '2024-02-01',
                    updatedAt: '2024-02-01'
                }
            ];

            setServices(mockServices);
            setLoading(false);
        };

        fetchServices();
    }, []);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || service.category.id === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleAddService = () => {
        setEditingService(null);
        setShowModal(true);
    };

    const handleEditService = (service: Service) => {
        setEditingService(service);
        setShowModal(true);
    };

    const handleDeleteService = async (serviceId: string) => {
        // Simulate API call
        setServices(prev => prev.filter(service => service.id !== serviceId));
    };

    const handleSaveService = async (serviceData: any) => {
        if (editingService) {
            // Update existing service
            setServices(prev => prev.map(service =>
                service.id === editingService.id
                    ? { ...service, ...serviceData, updatedAt: new Date().toISOString() }
                    : service
            ));
        } else {
            // Add new service
            const newService: Service = {
                id: Date.now().toString(),
                ...serviceData,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setServices(prev => [newService, ...prev]);
        }
        setShowModal(false);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <ServicesHeader
                    onAddService={handleAddService}
                    servicesCount={services.length}
                    loading={loading}
                />

                {/* TOP TOOLBAR */}
                <ServicesToolbar
                    search={searchQuery}
                    setSearch={setSearchQuery}
                    category={selectedCategory}
                    setCategory={setSelectedCategory}
                    categories={categories}
                    loading={loading}
                    onAddCategory={() => setShowCategoryModal(true)}
                />

                {/* SERVICES GRID */}
                <ServicesList
                    services={filteredServices}
                    loading={loading}
                    onEditService={handleEditService}
                    onDeleteService={handleDeleteService}
                />

                {showCategoryModal && (
                    <CategoryModal
                        onSave={(c) => setCategories((prev: any) => [...prev, c])}
                        onClose={() => setShowCategoryModal(false)}
                    />
                )}

                {showModal && (
                    <ServiceModal
                        service={editingService}
                        categories={categories}
                        onSave={handleSaveService}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Services;
