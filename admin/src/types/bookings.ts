// src/types/bookings.ts

import { Service } from "./services"

export interface Booking {
    id: string
    service: Service
    customerName: string
    customerEmail: string
    start: Date      // ISO date-time
    end: Date        // ISO date-time
    status: 'scheduled' | 'completed' | 'cancelled'
}

export interface BookingFilters {
    search: string
    dateRange: { from: string; to: string }
    status: string
}
