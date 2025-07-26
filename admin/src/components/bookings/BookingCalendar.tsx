// src/components/bookings/BookingCalendar.tsx

import moment from 'moment';
import React, { useState } from 'react';
import { Calendar as BigCalendar, EventPropGetter, momentLocalizer, SlotInfo, View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Booking } from '../../types/bookings';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: Booking;
}

interface Props {
    bookings: Booking[];
    onSelectEvent: (b: Booking) => void;
    onSelectSlot: (slot: SlotInfo) => void;
}

const BookingCalendar: React.FC<Props> = ({ bookings, onSelectEvent, onSelectSlot }) => {
    const [view, setView] = useState<View>(Views.WEEK);

    const events: CalendarEvent[] = bookings.map(b => ({
        id: b.id,
        title: `${b.service.name} - ${b.customerName}`,
        start: new Date(b.start),
        end: new Date(b.end),
        resource: b
    }));

    const eventStyle: EventPropGetter<CalendarEvent> = (event) => {
        const booking = event.resource;
        let backgroundColor = '#7c3aed'; // default purple

        // Color code by status
        switch (booking.status) {
            case 'scheduled':
                backgroundColor = '#3b82f6'; // blue
                break;
            case 'completed':
                backgroundColor = '#10b981'; // green
                break;
            case 'cancelled':
                backgroundColor = '#ef4444'; // red
                break;
            default:
                backgroundColor = '#7c3aed'; // purple
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                color: 'white',
                padding: '2px 4px',
                border: 'none',
                fontSize: '12px'
            }
        };
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <BigCalendar
                localizer={localizer}
                events={events}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                view={view}
                onView={(v) => setView(v)}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectEvent={(evt) => onSelectEvent(evt.resource)}
                onSelectSlot={onSelectSlot}
                style={{ height: '600px' }}
                eventPropGetter={eventStyle}
                step={15} // 15-minute intervals
                timeslots={4} // 4 slots per hour
                min={new Date(0, 0, 0, 10, 0)} // 10 AM
                max={new Date(0, 0, 0, 17, 0)} // 5 PM
                defaultDate={new Date()}
                popup
                tooltipAccessor={(event) => {
                    const booking = event.resource;
                    return `${booking.service.name}\nCustomer: ${booking.customerName}\nStatus: ${booking.status}`;
                }}
            />
        </div>
    );
};

export default BookingCalendar;
