// src/components/dashboard/QuickActions.tsx

import { Calendar, FileText, Package, Plus } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
    loading: boolean;
}

interface ActionButtonProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    path: string;
    color: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, path, color }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(path)}
            className={`w-full p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group ${color}`}
        >
            <div className="flex flex-col items-center space-y-2">
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {label}
                </span>
            </div>
        </button>
    );
};

const QuickActionsSkeleton: React.FC = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
        </div>
    </div>
);

const QuickActions: React.FC<QuickActionsProps> = ({ loading }) => {
    if (loading) {
        return <QuickActionsSkeleton />;
    }

    const actions = [
        {
            icon: Plus,
            label: 'Add Service',
            path: '/services/new',
            color: 'hover:bg-blue-50'
        },
        {
            icon: Calendar,
            label: 'New Booking',
            path: '/bookings/new',
            color: 'hover:bg-purple-50'
        },
        {
            icon: Package,
            label: 'Add Product',
            path: '/products/new',
            color: 'hover:bg-green-50'
        },
        {
            icon: FileText,
            label: 'View Reports',
            path: '/reports',
            color: 'hover:bg-orange-50'
        }
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
                {actions.map((action, index) => (
                    <ActionButton key={index} {...action} />
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
