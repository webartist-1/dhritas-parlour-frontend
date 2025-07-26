// src/types/services.ts

export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    category: ServiceCategory;
    image: string;
    isActive: boolean;
    createdAt: Date | string; // ISO date-time
    updatedAt: Date | string; // ISO date-time
}

export interface ServiceCategory {
    id: string;
    name: string;
    color: string;
}

export interface ServiceFormData {
    name: string;
    description: string;
    duration: number;
    price: number;
    categoryId: string;
    image: File | string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
    { id: '1', name: 'Facial Treatments', color: 'bg-pink-100 text-pink-800' },
    { id: '2', name: 'Eyebrow Services', color: 'bg-purple-100 text-purple-800' },
    { id: '3', name: 'Skin Care', color: 'bg-green-100 text-green-800' },
    { id: '4', name: 'Anti-Aging', color: 'bg-blue-100 text-blue-800' },
    { id: '5', name: 'Body Treatments', color: 'bg-orange-100 text-orange-800' },
    { id: '6', name: 'Special Packages', color: 'bg-indigo-100 text-indigo-800' }
];
