// src/components/orders/OrdersList.tsx

import React from 'react';
import { Order } from '../../types/orders';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';
import OrderCard from './OrderCard';

interface OrdersListProps {
    orders: Order[];
    loading: boolean;
    onViewOrder: (order: Order) => void;
    onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrderCardSkeleton: React.FC = () => (
    <SkeletonContainer>
        <div className="flex justify-between items-start mb-4">
            <div className="space-y-2">
                <Skeleton width="w-32" height="h-6" />
                <Skeleton width="w-48" height="h-4" />
            </div>
            <div className="text-right space-y-2">
                <Skeleton width="w-20" height="h-6" />
                <Skeleton width="w-16" height="h-4" />
            </div>
        </div>
        <div className="space-y-3">
            <div className="flex items-center space-x-3">
                <Skeleton width="w-12" height="h-12" rounded="lg" />
                <div className="flex-1 space-y-1">
                    <Skeleton width="w-3/4" height="h-4" />
                    <Skeleton width="w-1/2" height="h-3" />
                </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
                <div className="flex space-x-2">
                    <Skeleton width="w-16" height="h-6" rounded="full" />
                    <Skeleton width="w-16" height="h-6" rounded="full" />
                </div>
                <Skeleton width="w-20" height="h-8" rounded="md" />
            </div>
        </div>
    </SkeletonContainer>
);

const OrdersList: React.FC<OrdersListProps> = ({
    orders,
    loading,
    onViewOrder,
    onStatusChange
}) => {
    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <OrderCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onView={() => onViewOrder(order)}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    );
};

export default OrdersList;
