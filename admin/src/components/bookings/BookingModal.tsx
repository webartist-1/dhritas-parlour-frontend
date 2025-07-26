// src/components/bookings/BookingModal.tsx

import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Booking } from '../../types/bookings'
import { Service } from '../../types/services'

interface Props {
    booking: Booking | null
    slot: { start: Date; end: Date } | null
    services: Service[]
    onSave: (b: Booking) => void
    onClose: () => void
    onGoogleSync?: (b: Booking) => void
}

const BookingModal: React.FC<Props> = ({
    booking,
    slot,
    services,
    onSave,
    onClose,
    onGoogleSync
}) => {
    const [customerName, setCustomerName] = useState(booking?.customerName || '')
    const [customerEmail, setCustomerEmail] = useState(booking?.customerEmail || '')
    const [serviceId, setServiceId] = useState(booking?.service.id || services[0]?.id)
    const [start, setStart] = useState<string>(booking?.start || slot?.start.toISOString() || '')
    const [end, setEnd] = useState<string>(booking?.end || slot?.end.toISOString() || '')
    const [status, setStatus] = useState<Booking['status']>(booking?.status || 'scheduled')

    useEffect(() => {
        if (!booking && slot && serviceId) {
            const svc = services.find(s => s.id === serviceId)!
            const s = new Date(slot.start)
            const e = new Date(s.getTime() + svc.duration * 60000)
            setStart(s.toISOString().slice(0, 16))
            setEnd(e.toISOString().slice(0, 16))
        }
    }, [serviceId, slot])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const svc = services.find(s => s.id === serviceId)!
        const b: Booking = {
            id: booking?.id || Date.now().toString(),
            service: svc,
            customerName,
            customerEmail,
            start: new Date(start).toISOString(),
            end: new Date(end).toISOString(),
            status
        }
        onSave(b)
        onGoogleSync?.(b)
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md overflow-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">
                        {booking ? 'Edit Booking' : 'New Booking'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block mb-1 text-sm">Customer Name</label>
                        <input
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Customer Email</label>
                        <input
                            type="email"
                            value={customerEmail}
                            onChange={e => setCustomerEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Service</label>
                        <select
                            value={serviceId}
                            onChange={e => setServiceId(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            {services.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm">Start</label>
                            <input
                                type="datetime-local"
                                value={start.slice(0, 16)}
                                onChange={e => setStart(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm">End</label>
                            <input
                                type="datetime-local"
                                value={end.slice(0, 16)}
                                onChange={e => setEnd(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value as any)}
                            className="w-full px-3 py-2 border rounded-lg"
                        >
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Save Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookingModal
