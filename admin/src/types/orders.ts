// src/types/orders.ts

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    variantId: string;
    size: string;
    price: number;
    quantity: number;
    total: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        postcode: string;
        country: string;
    };
}

export interface Order {
    id: string;
    orderNumber: string;
    customer: Customer;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    shippingMethod: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    estimatedDelivery?: string;
}

export interface OrderStatus {
    id: string;
    label: string;
    color: string;
    bgColor: string;
}

export interface PaymentStatus {
    id: string;
    label: string;
    color: string;
    bgColor: string;
}

// Configurable status options
export const ORDER_STATUSES: OrderStatus[] = [
    { id: 'pending', label: 'Pending', color: 'text-yellow-800', bgColor: 'bg-yellow-100' },
    { id: 'processing', label: 'Processing', color: 'text-blue-800', bgColor: 'bg-blue-100' },
    { id: 'shipped', label: 'Shipped', color: 'text-purple-800', bgColor: 'bg-purple-100' },
    { id: 'delivered', label: 'Delivered', color: 'text-green-800', bgColor: 'bg-green-100' },
    { id: 'cancelled', label: 'Cancelled', color: 'text-red-800', bgColor: 'bg-red-100' },
    { id: 'refunded', label: 'Refunded', color: 'text-gray-800', bgColor: 'bg-gray-100' }
];

export const PAYMENT_STATUSES: PaymentStatus[] = [
    { id: 'pending', label: 'Pending', color: 'text-orange-800', bgColor: 'bg-orange-100' },
    { id: 'paid', label: 'Paid', color: 'text-green-800', bgColor: 'bg-green-100' },
    { id: 'failed', label: 'Failed', color: 'text-red-800', bgColor: 'bg-red-100' },
    { id: 'refunded', label: 'Refunded', color: 'text-gray-800', bgColor: 'bg-gray-100' }
];

export const PAYMENT_METHODS = [
    'Credit Card',
    'PayPal',
    'Bank Transfer',
    'Apple Pay',
    'Google Pay'
];

export interface OrderFilters {
    search: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    sort: string;
    dateRange: {
        from: string;
        to: string;
    };
}
