// src/components/orders/OrderCard.tsx

import { Calendar, ChevronDown, CreditCard, Eye, User } from 'lucide-react';
import React from 'react';
import { Order, ORDER_STATUSES } from '../../types/orders';

interface OrderCardProps {
    order: Order;
    onView: () => void;
    onStatusChange: (orderId: string, newStatus: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onView, onStatusChange }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusChangeOptions = () => {
        // Logic to determine which status changes are allowed
        const currentStatusId = order.status.id;

        switch (currentStatusId) {
            case 'pending':
                return ORDER_STATUSES.filter(s => ['processing', 'cancelled'].includes(s.id));
            case 'processing':
                return ORDER_STATUSES.filter(s => ['shipped', 'cancelled'].includes(s.id));
            case 'shipped':
                return ORDER_STATUSES.filter(s => ['delivered'].includes(s.id));
            case 'delivered':
                return ORDER_STATUSES.filter(s => ['refunded'].includes(s.id));
            default:
                return [];
        }
    };

    const statusChangeOptions = getStatusChangeOptions();

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <User className="w-4 h-4 mr-1" />
                        {order.customer.name} • {order.customer.email}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">£{order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
            </div>

            {/* Order Items Preview */}
            <div className="space-y-2 mb-4">
                {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                        <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/api/placeholder/100/100';
                            }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                            <p className="text-xs text-gray-500">{item.size} • Qty: {item.quantity} • £{item.total.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
                {order.items.length > 2 && (
                    <p className="text-xs text-gray-500 ml-15">+{order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}</p>
                )}
            </div>

            {/* Status and Actions Row */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                    {/* Order Status */}
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.status.bgColor} ${order.status.color}`}>
                        {order.status.label}
                    </span>

                    {/* Payment Status */}
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.paymentStatus.bgColor} ${order.paymentStatus.color}`}>
                        {order.paymentStatus.label}
                    </span>

                    {/* Payment Method */}
                    <div className="flex items-center text-xs text-gray-500">
                        <CreditCard className="w-3 h-3 mr-1" />
                        {order.paymentMethod}
                    </div>

                    {/* Created Date */}
                    <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(order.createdAt)}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Quick Status Change */}
                    {statusChangeOptions.length > 0 && (
                        <div className="relative">
                            <select
                                value={order.status.id}
                                onChange={(e) => onStatusChange(order.id, e.target.value)}
                                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                            >
                                <option value={order.status.id}>{order.status.label}</option>
                                {statusChangeOptions.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        Update to {status.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                        </div>
                    )}

                    {/* View Details Button */}
                    <button
                        onClick={onView}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                        <Eye className="w-4 h-4" />
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
