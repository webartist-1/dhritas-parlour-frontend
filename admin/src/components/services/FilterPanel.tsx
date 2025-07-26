// src/components/services/FilterPanel.tsx

import { Filter, Search, X } from 'lucide-react';
import React from 'react';
import { ServiceCategory } from '../../types/services';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';

interface FilterPanelProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    onCategoryChange: (categoryId: string) => void;
    categories: ServiceCategory[];
    loading: boolean;
    isVisible: boolean;
    onToggle: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
    loading,
    isVisible,
    onToggle
}) => {
    if (loading) {
        return (
            <SkeletonContainer>
                <Skeleton width="w-20" height="h-6" className="mb-4" />
                <Skeleton width="w-full" height="h-10" rounded="lg" className="mb-6" />
                <Skeleton width="w-24" height="h-5" className="mb-3" />
                <div className="space-y-2">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} width="w-full" height="h-8" rounded="md" />
                    ))}
                </div>
            </SkeletonContainer>
        );
    }

    return (
        <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={onToggle}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            {/* Filter Panel */}
            <div className={`bg-white rounded-lg border border-gray-200 p-4 ${isVisible ? 'block' : 'hidden lg:block'
                }`}>
                <div className="flex items-center justify-between mb-4 lg:justify-start">
                    <h3 className="font-semibold text-gray-900">Filters</h3>
                    <button
                        onClick={onToggle}
                        className="lg:hidden p-1 hover:bg-gray-100 rounded"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value=""
                                checked={selectedCategory === ''}
                                onChange={() => onCategoryChange('')}
                                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">All Categories</span>
                        </label>
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.id}
                                    checked={selectedCategory === category.id}
                                    onChange={() => onCategoryChange(category.id)}
                                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                {(searchQuery || selectedCategory) && (
                    <button
                        onClick={() => {
                            onSearchChange('');
                            onCategoryChange('');
                        }}
                        className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                        Clear Filters
                    </button>
                )}
            </div>
        </>
    );
};

export default FilterPanel;
