// src/components/bookings/BookingToolbar.tsx

import clsx from 'clsx';
import { Calendar as Cal, Download, LayoutGrid, Search, X } from 'lucide-react';
import React from 'react';
import { BookingFilters } from '../../types/bookings';

interface Props {
    view: 'calendar' | 'table';
    setView: (v: 'calendar' | 'table') => void;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filters: BookingFilters;
    onFiltersChange: (f: Partial<BookingFilters>) => void;
}

const BookingToolbar: React.FC<Props> = ({
    view,
    setView,
    searchValue = '',
    onSearchChange,
    filters,
    onFiltersChange,
}) => {
    const hasActiveFilters = filters.status || filters.dateRange.from || filters.dateRange.to;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Main Toolbar */}
            <div className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    {/* Left Section - Search & View Toggle */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">

                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search bookings, customers, services..."
                                value={searchValue}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-3">

                        {/* Export Button */}
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>

                        {/* Quick Stats */}
                        <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-gray-200">
                            <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">12</div>
                                <div className="text-xs text-gray-500">Today</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-semibold text-gray-900">47</div>
                                <div className="text-xs text-gray-500">This Week</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="px-4 pb-4 border-t border-gray-100">
                <div className="flex items-center justify-between pt-4">
                    {/* View Toggle */}
                    <div className="flex rounded-lg overflow-hidden">
                        <button
                            onClick={() => setView('calendar')}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                                view === 'calendar'
                                    ? 'bg-white text-purple-700 shadow-sm border border-gray-200'
                                    : 'text-gray-600 hover:text-gray-800'
                            )}
                        >
                            <Cal className="w-4 h-4" />
                            <span className="hidden sm:inline">Calendar</span>
                        </button>
                        <button
                            onClick={() => setView('table')}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                                view === 'table'
                                    ? 'bg-white text-purple-700 shadow-sm border border-gray-200'
                                    : 'text-gray-600 hover:text-gray-800'
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            <span className="hidden sm:inline">Table</span>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
                            <select
                                value={filters.status}
                                onChange={e => onFiltersChange({ status: e.target.value })}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Date Range Filters */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From:</label>
                            <input
                                type="date"
                                value={filters.dateRange.from}
                                onChange={e => onFiltersChange({
                                    dateRange: { ...filters.dateRange, from: e.target.value }
                                })}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To:</label>
                            <input
                                type="date"
                                value={filters.dateRange.to}
                                onChange={e => onFiltersChange({
                                    dateRange: { ...filters.dateRange, to: e.target.value }
                                })}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={() => onFiltersChange({
                                    status: '',
                                    dateRange: { from: '', to: '' }
                                })}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BookingToolbar;
