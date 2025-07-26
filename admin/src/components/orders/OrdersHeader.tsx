// src/components/orders/OrdersHeader.tsx

import { ShoppingCart, TrendingUp } from 'lucide-react';
import React from 'react';
import { Skeleton } from '../loading/Skeleton';

interface OrdersHeaderProps {
    ordersCount: number;
    loading: boolean;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ ordersCount, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton width="w-32" height="h-8" className="mb-2" />
                    <Skeleton width="w-48" height="h-5" />
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton width="w-24" height="h-16" rounded="lg" />
                    <Skeleton width="w-24" height="h-16" rounded="lg" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-600 mt-1">
                    Manage customer orders and track fulfillment
                </p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <ShoppingCart className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">{ordersCount}</p>
                    <p className="text-xs text-gray-500">Total Orders</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-gray-900">£2.1K</p>
                    <p className="text-xs text-gray-500">Today's Sales</p>
                </div>
            </div>
        </div>
    );
};

export default OrdersHeader;
