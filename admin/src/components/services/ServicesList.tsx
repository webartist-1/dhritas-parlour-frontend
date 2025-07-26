// src/components/services/ServicesList.tsx

import React from 'react';
import { Service } from '../../types/services';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';
import ServiceCard from './ServiceCard';

interface ServicesListProps {
    services: Service[];
    loading: boolean;
    onEditService: (service: Service) => void;
    onDeleteService: (serviceId: string) => void;
}

const ServiceCardSkeleton: React.FC = () => (
    <SkeletonContainer>
        <Skeleton width="w-full" height="h-48" rounded="lg" className="mb-4" />
        <div className="space-y-3">
            <div className="flex justify-between items-start">
                <Skeleton width="w-32" height="h-6" />
                <Skeleton width="w-16" height="h-5" rounded="full" />
            </div>
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-3/4" height="h-4" />
            <div className="flex justify-between items-center pt-2">
                <div className="space-y-1">
                    <Skeleton width="w-20" height="h-4" />
                    <Skeleton width="w-16" height="h-6" />
                </div>
                <div className="flex space-x-2">
                    <Skeleton width="w-16" height="h-8" rounded="md" />
                    <Skeleton width="w-16" height="h-8" rounded="md" />
                </div>
            </div>
        </div>
    </SkeletonContainer>
);

const ServicesList: React.FC<ServicesListProps> = ({
    services,
    loading,
    onEditService,
    onDeleteService
}) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <ServiceCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={() => onEditService(service)}
                    onDelete={() => onDeleteService(service.id)}
                />
            ))}
        </div>
    );
};

export default ServicesList;
