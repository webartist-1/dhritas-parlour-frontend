import {
    Check,
    ChevronDown,
    Download,
    Filter,
    Grid3X3,
    List,
    RefreshCw,
    RotateCcw,
    Search,
    X
} from 'lucide-react';
import React, { useState } from 'react';

// Types from parent
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

// Component type definitions
interface OrderStatus {
    id: string;
    label: string;
}

interface PaymentStatus {
    id: string;
    label: string;
}

interface SortOption {
    value: string;
    label: string;
}

type ViewType = 'grid' | 'list';

interface ViewToggleProps {
    view: ViewType;
    setView: (view: ViewType) => void;
}

interface FilterOption {
    id?: string;
    value?: string;
    label: string;
}

interface FilterDropdownProps {
    value: string;
    options: (string | FilterOption)[];
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
}

interface OrdersToolbarProps {
    filters: OrderFilters;
    onFiltersChange: (filters: Partial<OrderFilters>) => void;
    orderStatuses: OrderStatus[];
    paymentStatuses: PaymentStatus[];
    paymentMethods: string[];
    loading?: boolean;
    onExport?: () => void;
    onRefresh?: () => void;
    view: ViewType;
    onViewChange: (view: ViewType) => void;
}

// Sort options
const sortOptions: SortOption[] = [
    { value: 'date_desc', label: 'Latest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'amount_desc', label: 'Highest Amount' },
    { value: 'amount_asc', label: 'Lowest Amount' },
    { value: 'customer_asc', label: 'Customer A-Z' },
    { value: 'customer_desc', label: 'Customer Z-A' }
];

const ViewToggle: React.FC<ViewToggleProps> = ({ view, setView }) => {
    return (
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                title="Grid view"
                type="button"
            >
                <Grid3X3 className="w-4 h-4" />
            </button>
            <button
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${view === 'list'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                title="List view"
                type="button"
            >
                <List className="w-4 h-4" />
            </button>
        </div>
    );
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    value,
    options,
    onChange,
    placeholder,
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedOption = options.find((opt: string | FilterOption) => {
        if (typeof opt === 'string') {
            return opt === value;
        }
        return opt.id === value || opt.value === value;
    });

    const getOptionValue = (option: string | FilterOption): string => {
        if (typeof option === 'string') return option;
        return option.id || option.value || '';
    };

    const getOptionLabel = (option: string | FilterOption): string => {
        if (typeof option === 'string') return option;
        return option.label;
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 text-left border rounded-lg transition-all duration-200 text-sm ${value && value !== ''
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                type="button"
            >
                <span className="truncate">
                    {selectedOption
                        ? getOptionLabel(selectedOption)
                        : placeholder
                    }
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                        <div className="p-1">
                            {options.map((option: string | FilterOption, index: number) => {
                                const optionValue = getOptionValue(option);
                                const optionLabel = getOptionLabel(option);
                                const isSelected = value === optionValue;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            onChange(optionValue);
                                            setIsOpen(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-50 rounded ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                            }`}
                                        type="button"
                                    >
                                        <span className="truncate">{optionLabel}</span>
                                        {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
    filters,
    onFiltersChange,
    orderStatuses,
    paymentStatuses,
    paymentMethods,
    loading = false,
    onExport,
    onRefresh,
    view,
    onViewChange
}) => {
    const [searchValue, setSearchValue] = useState(filters.search);

    const updateFilters = (newFilters: Partial<OrderFilters>): void => {
        onFiltersChange(newFilters);
    };

    const resetFilters = (): void => {
        const defaultFilters: OrderFilters = {
            search: '',
            status: '',
            paymentStatus: '',
            paymentMethod: '',
            sort: 'date_desc',
            dateRange: { from: '', to: '' }
        };
        setSearchValue('');
        onFiltersChange(defaultFilters);
    };

    const handleSearch = (e: React.FormEvent): void => {
        e.preventDefault();
        updateFilters({ search: searchValue });
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchValue(value);
        // Real-time search - update filters as user types
        updateFilters({ search: value });
    };

    const clearSearch = (): void => {
        setSearchValue('');
        updateFilters({ search: '' });
    };

    const handleExport = (): void => {
        if (onExport) {
            onExport();
        }
    };

    const handleRefresh = (): void => {
        if (onRefresh) {
            onRefresh();
        }
    };

    const hasActiveFilters: boolean = Boolean(
        filters.search ||
        filters.status ||
        filters.paymentStatus ||
        filters.paymentMethod ||
        filters.dateRange.from ||
        filters.dateRange.to
    );

    // Sync search value with filters when they change externally (like reset)
    React.useEffect(() => {
        setSearchValue(filters.search);
    }, [filters.search]);

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="h-10 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders, customers, products..."
                            value={searchValue}
                            onChange={handleSearchInputChange}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-base"
                        />
                        {searchValue && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                                type="button"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white rounded-lg border border-gray-200 py-3 px-4">
                <div className="flex items-center justify-between">
                    {/* Left side filters */}
                    <div className="flex items-center gap-3">
                        <ViewToggle view={view} setView={onViewChange} />

                        <div className="h-6 w-px bg-gray-200" />

                        <FilterDropdown
                            value={filters.status}
                            options={[{ value: '', label: 'All Status' }, ...orderStatuses]}
                            onChange={(value: string) => updateFilters({ status: value })}
                            placeholder="All Status"
                            className="min-w-[120px]"
                        />

                        <FilterDropdown
                            value={filters.paymentStatus}
                            options={[{ value: '', label: 'Payment Status' }, ...paymentStatuses]}
                            onChange={(value: string) => updateFilters({ paymentStatus: value })}
                            placeholder="Payment Status"
                            className="min-w-[130px]"
                        />

                        <FilterDropdown
                            value={filters.paymentMethod}
                            options={[
                                { value: '', label: 'Payment Method' },
                                ...paymentMethods.map(method => ({ value: method, label: method }))
                            ]}
                            onChange={(value: string) => updateFilters({ paymentMethod: value })}
                            placeholder="Payment Method"
                            className="min-w-[130px]"
                        />

                        {hasActiveFilters && (
                            <>
                                <div className="h-6 w-px bg-gray-200" />
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                                    title="Reset all filters"
                                    type="button"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Reset
                                </button>
                            </>
                        )}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-3">
                        <FilterDropdown
                            value={filters.sort}
                            options={sortOptions}
                            onChange={(value: string) => updateFilters({ sort: value })}
                            placeholder="Sort by"
                            className="min-w-[140px]"
                        />

                        <div className="h-6 w-px bg-gray-200" />

                        {onRefresh && (
                            <button
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                title="Refresh"
                                onClick={handleRefresh}
                                type="button"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        )}

                        {onExport && (
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                onClick={handleExport}
                                type="button"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Active Filters Indicator */}
            {hasActiveFilters && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700 font-medium">
                        {[
                            filters.search,
                            filters.status,
                            filters.paymentStatus,
                            filters.paymentMethod,
                            filters.dateRange.from,
                            filters.dateRange.to
                        ].filter(Boolean).length} filter(s) applied
                    </span>
                    <div className="flex gap-2 ml-2 flex-wrap">
                        {filters.search && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Search: "{filters.search.slice(0, 20)}{filters.search.length > 20 ? '...' : ''}"
                                <button
                                    onClick={() => {
                                        setSearchValue('');
                                        updateFilters({ search: '' });
                                    }}
                                    className="hover:bg-blue-200 rounded-full"
                                    type="button"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.status && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Status: {orderStatuses.find((s: OrderStatus) => s.id === filters.status)?.label}
                                <button
                                    onClick={() => updateFilters({ status: '' })}
                                    className="hover:bg-blue-200 rounded-full"
                                    type="button"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.paymentStatus && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Payment: {paymentStatuses.find((s: PaymentStatus) => s.id === filters.paymentStatus)?.label}
                                <button
                                    onClick={() => updateFilters({ paymentStatus: '' })}
                                    className="hover:bg-blue-200 rounded-full"
                                    type="button"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.paymentMethod && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Method: {filters.paymentMethod}
                                <button
                                    onClick={() => updateFilters({ paymentMethod: '' })}
                                    className="hover:bg-blue-200 rounded-full"
                                    type="button"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {(filters.dateRange.from || filters.dateRange.to) && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Date: {filters.dateRange.from && new Date(filters.dateRange.from).toLocaleDateString()}
                                {filters.dateRange.from && filters.dateRange.to && ' - '}
                                {filters.dateRange.to && new Date(filters.dateRange.to).toLocaleDateString()}
                                <button
                                    onClick={() => updateFilters({ dateRange: { from: '', to: '' } })}
                                    className="hover:bg-blue-200 rounded-full"
                                    type="button"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                    </div>
                    <button
                        onClick={resetFilters}
                        className="ml-auto text-xs text-blue-600 hover:text-blue-800 font-medium"
                        type="button"
                    >
                        Clear all
                    </button>
                </div>
            )}

        </div>
    );
};

export default OrdersToolbar;