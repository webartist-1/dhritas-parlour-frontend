// src/components/dashboard/DashboardHeader.tsx

import { Bell, Calendar } from 'lucide-react';
import React from 'react';

interface DashboardHeaderProps {
    loading: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ loading }) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    if (loading) {
        return (
            <div className="flex justify-between items-center">
                <div>
                    <div className="h-8 bg-gray-200 rounded w-64 animate-pulse mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">{currentDate}</p>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Calendar className="w-5 h-5 text-gray-600" />
                </button>

                <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </div>
    );
};

export default DashboardHeader;
