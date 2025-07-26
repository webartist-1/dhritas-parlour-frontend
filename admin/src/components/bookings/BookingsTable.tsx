// src/components/bookings/BookingsTable.tsx

import clsx from 'clsx';
import { Calendar, ChevronDown, ChevronUp, Clock, MapPin, User } from 'lucide-react';
import React from 'react';
import { Booking } from '../../types/bookings';

interface Props {
    data: Booking[];
    onRowClick: (b: Booking) => void;
    onSort: (field: 'start' | 'customer' | 'service' | 'status') => void;
    sortField: string;
    sortDir: 'asc' | 'desc';
}

const TableHeader: React.FC<{
    label: string;
    field?: Props['sortField'];
    sortField: string;
    sortDir: 'asc' | 'desc';
    onSort?: any;
    icon?: React.ReactNode;
}> = ({ label, field, sortField, sortDir, onSort, icon }) => (
    <th
        onClick={() => field && onSort(field)}
        className={clsx(
            'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
            field && 'cursor-pointer hover:bg-gray-100 select-none transition-colors duration-200'
        )}
    >
        <div className="flex items-center gap-2">
            {icon && <span className="text-gray-400">{icon}</span>}
            <span>{label}</span>
            {field && (
                <span className="ml-auto">
                    {sortField === field ? (
                        sortDir === 'asc' ? (
                            <ChevronUp className="w-4 h-4 text-purple-600" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-purple-600" />
                        )
                    ) : (
                        <div className="w-4 h-4 opacity-30">
                            <ChevronUp className="w-4 h-4" />
                        </div>
                    )}
                </span>
            )}
        </div>
    </th>
);

const StatusBadge: React.FC<{ status: Booking['status'] }> = ({ status }) => {
    const styles = {
        scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
        completed: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    const icons = {
        scheduled: '🗓️',
        completed: '✅',
        cancelled: '❌'
    };

    return (
        <span className={clsx(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
            styles[status]
        )}>
            <span>{icons[status]}</span>
            <span className="capitalize">{status}</span>
        </span>
    );
};

const BookingsTable: React.FC<Props> = ({ data, onRowClick, onSort, sortField, sortDir }) => {
    if (data.length === 0) {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">Try adjusting your filters or create a new booking</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <TableHeader
                                label="Date & Time"
                                field="start"
                                sortField={sortField}
                                sortDir={sortDir}
                                onSort={onSort}
                                icon={<Clock className="w-4 h-4" />}
                            />
                            <TableHeader
                                label="Customer"
                                field="customer"
                                sortField={sortField}
                                sortDir={sortDir}
                                onSort={onSort}
                                icon={<User className="w-4 h-4" />}
                            />
                            <TableHeader
                                label="Service"
                                field="service"
                                sortField={sortField}
                                sortDir={sortDir}
                                onSort={onSort}
                                icon={<MapPin className="w-4 h-4" />}
                            />
                            <TableHeader
                                label="Status"
                                field="status"
                                sortField={sortField}
                                sortDir={sortDir}
                                onSort={onSort}
                            />
                            <TableHeader
                                label="Duration"
                                field="status"
                                sortField={sortField}
                                sortDir={sortDir}
                                onSort={onSort}
                            />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((booking, index) => (
                            <tr
                                key={booking.id}
                                onClick={() => onRowClick(booking)}
                                className={clsx(
                                    'cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-sm',
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                                )}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium text-gray-900">
                                            {new Date(booking.start).toLocaleDateString('en-GB', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(booking.start).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })} - {new Date(booking.end).toLocaleTimeString('en-GB', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            })}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                                                <span className="text-sm font-medium text-white">
                                                    {booking.customerName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.customerName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {booking.customerEmail}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {booking.service.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={booking.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{booking.service.duration} min</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsTable;
