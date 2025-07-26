// src/pages/Bookings.tsx

import { Plus } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import BookingCalendar from '../components/bookings/BookingCalendar';
import BookingModal from '../components/bookings/BookingModal';
import BookingsTable from '../components/bookings/BookingsTable';
import BookingToolbar from '../components/bookings/BookingToolbar';
import FiltersModal from '../components/bookings/FiltersModal';
import Layout from '../components/Layout';
import { Skeleton } from '../components/loading/Skeleton';
import Pagination from '../components/Pagination';
import { Booking, BookingFilters } from '../types/bookings';
import { Service, SERVICE_CATEGORIES } from '../types/services';
import { paginate } from '../utils/pagination';

const pageSize = 10;
type View = 'calendar' | 'table';

// Mock services data
const mockServices: Service[] = [
    { id: '1', name: 'Classic Facial', duration: 60, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
    { id: '2', name: 'Microblading', duration: 120, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
    { id: '3', name: 'Chemical Peel', duration: 45, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
    { id: '4', name: 'Botox Treatment', duration: 30, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
    { id: '5', name: 'Dermal Fillers', duration: 45, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
    { id: '6', name: 'Eyebrow Tinting', duration: 30, description: 'A relaxing facial treatment.', price: 80, category: SERVICE_CATEGORIES[0], isActive: true, createdAt: new Date(), updatedAt: new Date(), image: '' },
];

// Mock bookings data
const mockBookings: Booking[] = [
    {
        id: 'b1',
        service: mockServices[0],
        customerName: 'Alice Smith',
        customerEmail: 'alice@example.com',
        start: new Date(2025, 6, 23, 10, 0), // Today 10 AM
        end: new Date(2025, 6, 23, 11, 0),   // Today 11 AM
        status: 'scheduled'
    },
    {
        id: 'b2',
        service: mockServices[1],
        customerName: 'Emma Johnson',
        customerEmail: 'emma@example.com',
        start: new Date(2025, 6, 26, 14, 0), // Today 2 PM
        end: new Date(2025, 6, 26, 16, 0),   // Today 4 PM
        status: 'scheduled'
    },
    {
        id: 'b3',
        service: mockServices[2],
        customerName: 'Sarah Wilson',
        customerEmail: 'sarah@example.com',
        start: new Date(2025, 6, 26, 11, 0), // Yesterday 11 AM
        end: new Date(2025, 6, 26, 11, 45),  // Yesterday 11:45 AM
        status: 'completed'
    },
    {
        id: 'b4',
        service: mockServices[3],
        customerName: 'Lisa Brown',
        customerEmail: 'lisa@example.com',
        start: new Date(2025, 6, 28, 9, 30),  // Tomorrow 9:30 AM
        end: new Date(2025, 6, 28, 10, 0),    // Tomorrow 10 AM
        status: 'scheduled'
    },
    {
        id: 'b5',
        service: mockServices[4],
        customerName: 'Maria Garcia',
        customerEmail: 'maria@example.com',
        start: new Date(2025, 6, 25, 15, 0),  // 2 days ago 3 PM
        end: new Date(2025, 6, 25, 15, 45),   // 2 days ago 3:45 PM
        status: 'cancelled'
    }
];

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<BookingFilters>({
        search: '',
        dateRange: { from: '', to: '' },
        status: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Booking | null>(null);
    const [slot, setSlot] = useState<{ start: Date; end: Date } | null>(null);
    const [view, setView] = useState<View>('calendar');
    const [sortField, setSortField] = useState<'start' | 'customer' | 'service' | 'status'>('start');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulate API call
    useEffect(() => {
        (async () => {
            setLoading(true);
            await new Promise(r => setTimeout(r, 1000));
            setBookings(mockBookings);
            setLoading(false);
        })();
    }, []);

    // Update the filtered memo to include search
    const filtered = useMemo(() => {
        return bookings.filter(b => {
            const searchTerm = searchQuery.trim().toLowerCase();
            const matchSearch = !searchTerm ||
                b.customerName.toLowerCase().includes(searchTerm) ||
                b.customerEmail.toLowerCase().includes(searchTerm) ||
                b.service.name.toLowerCase().includes(searchTerm);

            const ms = filters.search.trim().toLowerCase();
            const matchFilterSearch =
                b.customerName.toLowerCase().includes(ms) ||
                b.customerEmail.toLowerCase().includes(ms) ||
                b.service.name.toLowerCase().includes(ms);

            let matchDate = true;
            if (filters.dateRange.from) {
                matchDate &&= new Date(b.start) >= new Date(filters.dateRange.from);
            }
            if (filters.dateRange.to) {
                matchDate &&= new Date(b.start) <= new Date(filters.dateRange.to);
            }

            const matchStatus = !filters.status || b.status === filters.status;
            return matchSearch && matchFilterSearch && matchDate && matchStatus;
        });
    }, [bookings, filters, searchQuery]);

    // Sort bookings
    const sorted = useMemo(() => {
        return [...filtered].sort((a, b) => {
            const dir = sortDir === 'asc' ? 1 : -1;
            switch (sortField) {
                case 'customer':
                    return a.customerName.localeCompare(b.customerName) * dir;
                case 'service':
                    return a.service.name.localeCompare(b.service.name) * dir;
                case 'status':
                    return a.status.localeCompare(b.status) * dir;
                default:
                    return (new Date(a.start).getTime() - new Date(b.start).getTime()) * dir;
            }
        });
    }, [filtered, sortField, sortDir]);

    // Paginate for table view
    const paged = paginate(sorted, page, pageSize);

    const handleSave = (data: Booking) => {
        setBookings(prev => {
            if (editing) {
                return prev.map(b => (b.id === editing.id ? data : b));
            }
            return [...prev, { ...data, id: Date.now().toString() }];
        });
        setShowModal(false);
        setEditing(null);
        setSlot(null);
    };

    const handleSort = (field: 'start' | 'customer' | 'service' | 'status') => {
        setSortField(field);
        setSortDir(d => (field === sortField ? (d === 'asc' ? 'desc' : 'asc') : 'asc'));
    };

    const handleNewBooking = () => {
        setEditing(null);
        setSlot(null);
        setShowModal(true);
    };

    const handleEditBooking = (booking: Booking) => {
        setEditing(booking);
        setSlot(null);
        setShowModal(true);
    };

    const handleSlotSelect = (slotInfo: any) => {
        setSlot({ start: slotInfo.start, end: slotInfo.end });
        setEditing(null);
        setShowModal(true);
    };

    return (
        <Layout>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                        <p className="text-gray-600 mt-1">
                            Manage customer appointments and schedule services
                        </p>
                    </div>
                    <button
                        onClick={handleNewBooking}
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Booking
                    </button>
                </div>

                {/* Toolbar */}
                <BookingToolbar
                    view={view}
                    setView={setView}
                    searchValue={searchQuery}
                    onSearchChange={setSearchQuery}
                    filters={filters}
                    onFiltersChange={(f) => {
                        setFilters(prev => ({ ...prev, ...f }));
                        setPage(1);
                    }}
                />

                {/* Main Content */}
                {loading ? (
                    <Skeleton height="h-96" rounded="lg" />
                ) : view === 'calendar' ? (
                    <BookingCalendar
                        bookings={filtered}
                        onSelectEvent={handleEditBooking}
                        onSelectSlot={handleSlotSelect}
                    />
                ) : (
                    <>
                        <BookingsTable
                            data={paged}
                            onRowClick={handleEditBooking}
                            onSort={handleSort}
                            sortField={sortField}
                            sortDir={sortDir}
                        />
                        <Pagination
                            page={page}
                            pageSize={pageSize}
                            total={sorted.length}
                            onPageChange={setPage}
                        />
                    </>
                )}

                {/* Filters Modal */}
                <FiltersModal
                    open={showFilters}
                    loading={loading}
                    filters={filters}
                    onChange={(f) => {
                        setFilters(prev => ({ ...prev, ...f }));
                        setPage(1);
                    }}
                    onClose={() => setShowFilters(false)}
                />

                {/* Booking Modal */}
                {showModal && (
                    <BookingModal
                        booking={editing}
                        slot={slot}
                        services={mockServices}
                        onSave={handleSave}
                        onClose={() => {
                            setShowModal(false);
                            setEditing(null);
                            setSlot(null);
                        }}
                        onGoogleSync={(event) => {
                            // Optional: integrate with Google Calendar API here
                            console.log('Sync to Google Calendar:', event);
                        }}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Bookings;
