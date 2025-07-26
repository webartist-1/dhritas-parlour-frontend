// src/components/orders/FiltersModal.tsx
import { Search, X } from 'lucide-react';
import React from 'react';
import { OrderFilters, OrderStatus, PAYMENT_METHODS, PaymentStatus } from '../../types/orders';
import { Skeleton } from '../loading/Skeleton';

interface Props {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    filters: OrderFilters;
    onChange: (f: Partial<OrderFilters>) => void;
    statuses: OrderStatus[];
    paymentStatuses: PaymentStatus[];
}

const dateInput = (value: string, cb: (v: string) => void) => (
    <input
        type="date"
        value={value}
        onChange={(e) => cb(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg"
    />
);

const FiltersModal: React.FC<Props> = ({
    open,
    loading,
    onClose,
    filters,
    onChange,
    statuses,
    paymentStatuses
}) => {
    if (!open) return null;

    if (loading)
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Skeleton height="h-96" width="w-96" rounded="lg" />
            </div>
        );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Filters & Sort</h2>
                    <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Search */}
                <label className="relative block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={filters.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        placeholder="Search orders, customers..."
                        className="w-full pl-10 pr-3 py-2 border rounded-lg"
                    />
                </label>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                        value={filters.status}
                        onChange={(e) => onChange({ status: e.target.value })}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.paymentStatus}
                        onChange={(e) => onChange({ paymentStatus: e.target.value })}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="">Payment Status</option>
                        {paymentStatuses.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.paymentMethod}
                        onChange={(e) => onChange({ paymentMethod: e.target.value })}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="">Payment Method</option>
                        {PAYMENT_METHODS.map((m) => (
                            <option key={m}>{m}</option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={filters.sort || ''}
                        onChange={(e) => onChange({ sort: e.target.value })}
                        className="px-3 py-2 border rounded-lg"
                    >
                        <option value="">Sort by</option>
                        <option value="date_desc">Date ↓</option>
                        <option value="date_asc">Date ↑</option>
                        <option value="total_desc">Total ↓</option>
                        <option value="total_asc">Total ↑</option>
                    </select>
                </div>

                {/* Date-range */}
                <div className="grid grid-cols-2 gap-4">
                    {dateInput(filters.dateRange.from, (v) =>
                        onChange({ dateRange: { ...filters.dateRange, from: v } })
                    )}
                    {dateInput(filters.dateRange.to, (v) =>
                        onChange({ dateRange: { ...filters.dateRange, to: v } })
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={() =>
                            onChange({
                                search: '',
                                status: '',
                                paymentStatus: '',
                                paymentMethod: '',
                                dateRange: { from: '', to: '' },
                                sort: ''
                            })
                        }
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltersModal;