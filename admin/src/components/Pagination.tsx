// src/components/common/Pagination.tsx

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

interface Props {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ page, pageSize, total, onPageChange }) => {
    const pages = Math.ceil(total / pageSize);
    if (pages <= 1) return null;

    return (
        <div className="flex items-center justify-end space-x-2 mt-4 select-none">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-2 disabled:opacity-40"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(pages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-8 h-8 rounded-lg text-sm ${page === i + 1 ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pages}
                className="p-2 disabled:opacity-40"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;