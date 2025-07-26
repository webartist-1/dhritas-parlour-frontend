// src/components/orders/ViewToggle.tsx
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';

interface Props {
    view: 'card' | 'table';
    setView: (v: 'card' | 'table') => void;
}

const ViewToggle: React.FC<Props> = ({ view, setView }) => (

    <div className="inline-flex border rounded-lg overflow-hidden"> <button onClick={() => setView('card')} className={`p-2 ${view === 'card' ? 'bg-purple-600 text-white' : 'bg-white hover:bg-gray-50'}`} > <LayoutGrid className="w-4 h-4" /> </button> <button onClick={() => setView('table')} className={`p-2 ${view === 'table' ? 'bg-purple-600 text-white' : 'bg-white hover:bg-gray-50'}`} > <List className="w-4 h-4" /> </button> </div>);
export default ViewToggle;