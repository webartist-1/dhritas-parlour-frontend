// src/components/orders/OrdersTable.tsx
import { Eye, Pencil, Save, X } from 'lucide-react';
import React, { useState } from 'react';
import { Order, ORDER_STATUSES } from '../../types/orders';

interface RowProps {
    order: Order;
    onView: () => void;
    onStatusSave: (id: string, status: string) => void;
}

const Row: React.FC<RowProps> = ({ order, onView, onStatusSave }) => {
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState(order.status.id);

    const save = () => {
        if (selected !== order.status.id) onStatusSave(order.id, selected);
        setEditing(false);
    };

    return (
        <tr className="border-b last:border-0 text-sm">
            <td className="py-3 px-2">{order.orderNumber}</td>
            <td className="py-3 px-2">{order.customer.name}</td>
            <td className="py-3 px-2">{order.customer.phone}</td>
            <td className="py-3 px-2">
                {!editing ? (
                    <span
                        className={`px-2 py-1 rounded-full ${order.status.bgColor} ${order.status.color}`}
                    >
                        {order.status.label}
                    </span>
                ) : (
                    <select
                        className="px-2 py-1 border rounded"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        {ORDER_STATUSES.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                )}
            </td>

            <td className="py-3 px-2">
                <span
                    className={`px-2 py-1 rounded-full ${order.paymentStatus.bgColor} ${order.paymentStatus.color}`}
                >
                    {order.paymentStatus.label}
                </span>
            </td>

            <td className="py-3 px-2 font-medium">£{order.total.toFixed(2)}</td>

            <td className="py-3 px-2">
                {!editing ? (
                    <>
                        <button
                            onClick={() => setEditing(true)}
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Edit Status"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={onView}
                            className="p-2 hover:bg-gray-100 rounded"
                            title="View"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={save}
                            className="p-2 hover:bg-green-100 rounded"
                            title="Save"
                        >
                            <Save className="w-4 h-4 text-green-600" />
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Cancel"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

interface Props {
    orders: Order[];
    onView: (o: Order) => void;
    onStatusSave: (id: string, status: string) => void;
}

const OrdersTable: React.FC<Props> = ({ orders, onView, onStatusSave }) => (

    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg"> <table className="min-w-full text-left"> <thead className="bg-gray-50 text-xs uppercase text-gray-500"> <tr> <th className="py-3 px-2">Order #</th> <th className="py-3 px-2">Customer</th> <th className="py-3 px-2">Phone</th> <th className="py-3 px-2">Status</th> <th className="py-3 px-2">Payment</th> <th className="py-3 px-2">Total</th> <th className="py-3 px-2 w-24">Actions</th> </tr> </thead> <tbody> {orders.map((o) => (<Row key={o.id} order={o} onView={() => onView(o)} onStatusSave={onStatusSave} />))} </tbody> </table> </div>);
export default OrdersTable;