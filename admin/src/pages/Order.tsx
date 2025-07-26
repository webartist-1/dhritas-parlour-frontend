// src/pages/Orders.tsx

import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import FiltersModal from '../components/orders/FiltersModal';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import OrdersHeader from '../components/orders/OrdersHeader';
import OrdersList from '../components/orders/OrdersList';
import OrdersTable from '../components/orders/OrdersTable';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import {
    Order,
    ORDER_STATUSES,
    OrderFilters,
    PAYMENT_METHODS,
    PAYMENT_STATUSES
} from '../types/orders';
import { paginate } from '../utils/pagination';

// Simulate API call
const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: 'ORD-2025-001',
        customer: {
            id: 'cust1',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+44 7700 900123',
            address: {
                street: '123 Beauty Lane',
                city: 'London',
                postcode: 'SW1A 1AA',
                country: 'United Kingdom'
            }
        },
        items: [
            {
                id: 'item1',
                productId: 'prod1',
                productName: 'Age Reversal Night Complex Moisturiser',
                productImage: 'https://cdn.ecommercedns.uk/files/2/237032/7/48731977/regima-age-reversal-night-complex-moisturiser-50ml-night-creams_medium.jpg',
                variantId: 'var1',
                size: '50 ml',
                price: 42.95,
                quantity: 2,
                total: 85.90
            },
            {
                id: 'item2',
                productId: 'prod2',
                productName: 'Daily Radiant Boost SPF 25',
                productImage: 'https://cdn.ecommercedns.uk/files/2/237032/7/48731977/regima-age-reversal-night-complex-moisturiser-50ml-night-creams_medium.jpg',
                variantId: 'var2',
                size: '15 ml',
                price: 12.95,
                quantity: 1,
                total: 12.95
            }
        ],
        subtotal: 98.85,
        shipping: 4.99,
        tax: 20.68,
        total: 124.52,
        status: ORDER_STATUSES[1], // Processing
        paymentStatus: PAYMENT_STATUSES[1], // Paid
        paymentMethod: 'Credit Card',
        shippingMethod: 'Standard Delivery',
        notes: 'Customer requested expedited processing',
        createdAt: '2025-01-26T10:30:00Z',
        updatedAt: '2025-01-26T14:15:00Z',
        estimatedDelivery: '2025-01-30'
    },
    {
        id: '2',
        orderNumber: 'ORD-2025-002',
        customer: {
            id: 'cust2',
            name: 'Emma Davis',
            email: 'emma.davis@email.com',
            phone: '+44 7700 900456',
            address: {
                street: '456 Skincare Street',
                city: 'Manchester',
                postcode: 'M1 1AA',
                country: 'United Kingdom'
            }
        },
        items: [
            {
                id: 'item3',
                productId: 'prod3',
                productName: 'Daily Intelligent Sebum Solver Moisturiser SPF 25',
                productImage: 'https://cdn.ecommercedns.uk/files/2/237032/7/48731977/regima-age-reversal-night-complex-moisturiser-50ml-night-creams_medium.jpg',
                variantId: 'var3',
                size: '50 ml',
                price: 39.95,
                quantity: 1,
                total: 39.95
            }
        ],
        subtotal: 39.95,
        shipping: 4.99,
        tax: 8.99,
        total: 53.93,
        status: ORDER_STATUSES[2], // Shipped
        paymentStatus: PAYMENT_STATUSES[1], // Paid
        paymentMethod: 'PayPal',
        shippingMethod: 'Express Delivery',
        createdAt: '2025-01-25T15:45:00Z',
        updatedAt: '2025-01-26T09:20:00Z',
        estimatedDelivery: '2025-01-28'
    },
    {
        id: '3',
        orderNumber: 'ORD-2025-003',
        customer: {
            id: 'cust3',
            name: 'Michael Brown',
            email: 'michael.brown@email.com',
            phone: '+44 7700 900789',
            address: {
                street: '789 Beauty Boulevard',
                city: 'Birmingham',
                postcode: 'B1 1AA',
                country: 'United Kingdom'
            }
        },
        items: [
            {
                id: 'item4',
                productId: 'prod1',
                productName: 'Age Reversal Night Complex Moisturiser',
                productImage: 'https://cdn.ecommercedns.uk/files/2/237032/7/48731977/regima-age-reversal-night-complex-moisturiser-50ml-night-creams_medium.jpg',
                variantId: 'var1',
                size: '15 ml',
                price: 13.95,
                quantity: 3,
                total: 41.85
            }
        ],
        subtotal: 41.85,
        shipping: 0,
        tax: 8.37,
        total: 50.22,
        status: ORDER_STATUSES[0], // Pending
        paymentStatus: PAYMENT_STATUSES[0], // Pending
        paymentMethod: 'Bank Transfer',
        shippingMethod: 'Standard Delivery',
        createdAt: '2025-01-26T16:20:00Z',
        updatedAt: '2025-01-26T16:20:00Z',
        estimatedDelivery: '2025-02-02'
    }
];


const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [filters, setFilters] = useState<OrderFilters & { sort: string }>({
        search: '',
        status: '',
        paymentStatus: '',
        paymentMethod: '',
        dateRange: { from: '', to: '' },
        sort: 'date_desc'
    });

    const [view, setView] = useState<'grid' | 'list'>('list');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // Fetch mock orders
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 1500));
            setOrders(mockOrders);
            setLoading(false);
        };
        fetchOrders();
    }, []);

    // Filter logic
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const ms = filters.search.toLowerCase();
            const matchesSearch =
                !filters.search ||
                order.orderNumber.toLowerCase().includes(ms) ||
                order.customer.name.toLowerCase().includes(ms) ||
                order.customer.email.toLowerCase().includes(ms) ||
                order.items.some(item => 
                    item.productName.toLowerCase().includes(ms)
                );

            const matchesStatus = !filters.status || order.status.id === filters.status;
            const matchesPaymentStatus =
                !filters.paymentStatus || order.paymentStatus.id === filters.paymentStatus;
            const matchesPaymentMethod =
                !filters.paymentMethod || order.paymentMethod === filters.paymentMethod;

            let matchesDate = true;
            if (filters.dateRange.from) {
                matchesDate =
                    matchesDate && new Date(order.createdAt) >= new Date(filters.dateRange.from);
            }
            if (filters.dateRange.to) {
                const toDate = new Date(filters.dateRange.to + 'T23:59:59');
                matchesDate =
                    matchesDate && new Date(order.createdAt) <= toDate;
            }

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPaymentStatus &&
                matchesPaymentMethod &&
                matchesDate
            );
        });
    }, [orders, filters]);

    // Sort logic
    const sortedOrders = useMemo(() => {
        if (!filters.sort) return filteredOrders;
        
        const [field, direction] = filters.sort.split('_');
        
        return [...filteredOrders].sort((a, b) => {
            let comparison = 0;
            
            switch (field) {
                case 'date':
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case 'amount':
                    comparison = a.total - b.total;
                    break;
                case 'customer':
                    comparison = a.customer.name.localeCompare(b.customer.name);
                    break;
                default:
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            
            return direction === 'asc' ? comparison : -comparison;
        });
    }, [filteredOrders, filters.sort]);

    // Pagination
    const paginatedOrders = useMemo(() => {
        return paginate(sortedOrders, page, pageSize);
    }, [sortedOrders, page, pageSize]);

    // Handlers
    const handleStatusChange = (orderId: string, newStatus: string) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === orderId
                    ? {
                        ...o,
                        status:
                            ORDER_STATUSES.find((s) => s.id === newStatus) || o.status,
                        updatedAt: new Date().toISOString()
                    }
                    : o
            )
        );
    };

    const updateFilters = (newFilters: Partial<OrderFilters & { sort: string }>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setPage(1);
    };

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleExport = () => {
        // Create CSV content
        const csvContent = [
            ['Order Number', 'Customer', 'Email', 'Status', 'Payment Status', 'Total', 'Date'].join(','),
            ...sortedOrders.map(order => [
                order.orderNumber,
                order.customer.name,
                order.customer.email,
                order.status.label,
                order.paymentStatus.label,
                `£${order.total.toFixed(2)}`,
                new Date(order.createdAt).toLocaleDateString()
            ].join(','))
        ].join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <OrdersHeader ordersCount={orders.length} loading={loading} />

                {/* View Toggle & Filter Button */}
                <OrdersToolbar
                    view={view}
                    onViewChange={setView}
                    filters={filters}
                    onFiltersChange={updateFilters}
                    orderStatuses={ORDER_STATUSES}
                    paymentStatuses={PAYMENT_STATUSES}
                    paymentMethods={PAYMENT_METHODS}
                    loading={loading}
                    onRefresh={handleRefresh}
                    onExport={handleExport}
                />

                {/* Card or Table View */}
                {view === 'grid' ? (
                    <OrdersList
                        orders={paginatedOrders}
                        loading={loading}
                        onViewOrder={setSelectedOrder}
                        onStatusChange={handleStatusChange}
                    />
                ) : (
                    <OrdersTable
                        orders={paginatedOrders}
                        onView={setSelectedOrder}
                        onStatusSave={handleStatusChange}
                    />
                )}

                {/* Pagination */}
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    total={sortedOrders.length}
                    onPageChange={setPage}
                />

                {/* Filters & Sort Modal */}
                <FiltersModal
                    open={showFilters}
                    loading={loading}
                    onClose={() => setShowFilters(false)}
                    filters={filters}
                    onChange={updateFilters}
                    statuses={ORDER_STATUSES}
                    paymentStatuses={PAYMENT_STATUSES}
                />

                {/* Order Details Modal */}
                {selectedOrder && (
                    <OrderDetailsModal
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                        onStatusChange={handleStatusChange}
                        availableStatuses={ORDER_STATUSES}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Orders;