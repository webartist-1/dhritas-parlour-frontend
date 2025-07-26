// src/components/orders/OrderDetailsModal.tsx

import { Calendar, CreditCard, Edit2, MapPin, Package, Save, Truck, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Order, OrderStatus } from '../../types/orders';

interface OrderDetailsModalProps {
    order: Order;
    onClose: () => void;
    onStatusChange: (orderId: string, newStatus: string) => void;
    availableStatuses: OrderStatus[];
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
    order,
    onClose,
    onStatusChange,
    availableStatuses
}) => {
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(order.status.id);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleStatusSave = () => {
        if (selectedStatus !== order.status.id) {
            onStatusChange(order.id, selectedStatus);
        }
        setIsEditingStatus(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{order.orderNumber}</h2>
                        <p className="text-gray-600 mt-1">Order details and management</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Status and Key Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Order Status</span>
                                {!isEditingStatus ? (
                                    <button
                                        onClick={() => setIsEditingStatus(true)}
                                        className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                                    >
                                        <Edit2 className="w-3 h-3 text-gray-500" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleStatusSave}
                                        className="p-1 hover:bg-green-100 rounded transition-colors duration-200"
                                    >
                                        <Save className="w-3 h-3 text-green-600" />
                                    </button>
                                )}
                            </div>
                            {isEditingStatus ? (
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    {availableStatuses.map((status) => (
                                        <option key={status.id} value={status.id}>{status.label}</option>
                                    ))}
                                </select>
                            ) : (
                                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${order.status.bgColor} ${order.status.color}`}>
                                    {order.status.label}
                                </span>
                            )}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <span className="text-sm font-medium text-gray-600">Payment Status</span>
                            <div className="mt-2">
                                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${order.paymentStatus.bgColor} ${order.paymentStatus.color}`}>
                                    {order.paymentStatus.label}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <span className="text-sm font-medium text-gray-600">Total Amount</span>
                            <p className="text-2xl font-bold text-gray-900 mt-2">£{order.total.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Customer Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-gray-900">{order.customer.name}</h4>
                                <p className="text-gray-600">{order.customer.email}</p>
                                <p className="text-gray-600">{order.customer.phone}</p>
                            </div>
                            <div>
                                <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    Shipping Address
                                </h5>
                                <p className="text-gray-600">
                                    {order.customer.address.street}<br />
                                    {order.customer.address.city}<br />
                                    {order.customer.address.postcode}<br />
                                    {order.customer.address.country}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Package className="w-5 h-5 mr-2" />
                            Order Items
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/api/placeholder/100/100';
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{item.productName}</h4>
                                        <p className="text-gray-600">{item.size}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">£{item.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-600">Total: £{item.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="space-y-2 text-right">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="text-gray-900">£{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="text-gray-900">£{order.shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax:</span>
                                    <span className="text-gray-900">£{order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                                    <span className="text-gray-900">Total:</span>
                                    <span className="text-gray-900">£{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment & Shipping Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Payment Information
                            </h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                                <p><span className="font-medium">Status:</span>
                                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${order.paymentStatus.bgColor} ${order.paymentStatus.color}`}>
                                        {order.paymentStatus.label}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Truck className="w-5 h-5 mr-2" />
                                Shipping Information
                            </h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Method:</span> {order.shippingMethod}</p>
                                {order.estimatedDelivery && (
                                    <p><span className="font-medium">Estimated Delivery:</span> {formatDate(order.estimatedDelivery)}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-yellow-800 mb-2">Order Notes</h3>
                            <p className="text-yellow-700">{order.notes}</p>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Order Timeline
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-600">Order created - {formatDate(order.createdAt)}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-600">Last updated - {formatDate(order.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
