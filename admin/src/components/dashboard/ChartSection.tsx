// src/components/dashboard/ChartSection.tsx

import { BarChart3 } from 'lucide-react';
import React, { useState } from 'react';
import { ChartData } from '../../types/dashboard';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';

interface ChartSectionProps {
    chartData?: ChartData;
    loading: boolean;
}

const ChartSection: React.FC<ChartSectionProps> = ({ chartData, loading }) => {
    const [activeTab, setActiveTab] = useState<'revenue' | 'bookings'>('revenue');

    if (loading) {
        return (
            <SkeletonContainer>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Skeleton width="w-9" height="h-9" rounded="lg" />
                        <Skeleton width="w-40" height="h-6" />
                    </div>
                    <Skeleton width="w-32" height="h-10" rounded="lg" />
                </div>

                <div className="h-80 flex items-end space-x-2">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton
                            key={index}
                            width="flex-1"
                            height={`h-${Math.floor(Math.random() * 60) + 20}`}
                            rounded="none"
                            className="rounded-t-lg"
                        />
                    ))}
                </div>
            </SkeletonContainer>
        );
    }

    if (!chartData) return null;

    const currentData = chartData[activeTab];
    const maxValue = Math.max(...currentData.map(item =>
        activeTab === 'revenue' ? (item.amount || 0) : (item.count || 0)
    ));

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Overview</h3>
                </div>

                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('revenue')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${activeTab === 'revenue'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Revenue
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${activeTab === 'bookings'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Bookings
                    </button>
                </div>
            </div>

            <div className="h-80">
                <div className="flex items-end justify-between h-full space-x-2">
                    {currentData.map((item, index) => {
                        const value = activeTab === 'revenue' ? (item.amount || 0) : (item.count || 0);
                        const height = (value / maxValue) * 100;

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex items-end justify-center mb-2" style={{ height: '280px' }}>
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ease-out ${activeTab === 'revenue' ? 'bg-green-500' : 'bg-purple-500'
                                            } hover:opacity-80 cursor-pointer relative group`}
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {activeTab === 'revenue' ? `$${value.toLocaleString()}` : value}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 mt-2">{item.month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChartSection;
