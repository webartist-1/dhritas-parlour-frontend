// src/components/bookings/FiltersModal.tsx

import { Search, X } from 'lucide-react'
import React from 'react'
import { BookingFilters } from '../../types/bookings'
import { Skeleton } from '../loading/Skeleton'

interface Props {
    open: boolean
    loading: boolean
    filters: BookingFilters
    onChange: (f: Partial<BookingFilters>) => void
    onClose: () => void
}

const FiltersModal: React.FC<Props> = ({ open, loading, filters, onChange, onClose }) => {
    if (!open) return null
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Skeleton width="w-96" height="h-96" rounded="lg" />
            </div>
        )
    }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm">Status</label>
                    <select
                        value={filters.status}
                        onChange={e => onChange({ status: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">All</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        value={filters.dateRange.from}
                        onChange={e => onChange({ dateRange: { ...filters.dateRange, from: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="date"
                        value={filters.dateRange.to}
                        onChange={e => onChange({ dateRange: { ...filters.dateRange, to: e.target.value } })}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <button
                        onClick={() => onChange({
                            search: '',
                            status: '',
                            dateRange: { from: '', to: '' }
                        })}
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FiltersModal
