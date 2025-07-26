// src/components/products/CategoryModal.tsx

import { X } from 'lucide-react';
import React, { useState } from 'react';
import { ProductCategory } from '../../types/products';

interface CategoryModalProps {
    onSave: (category: ProductCategory) => void;
    onClose: () => void;
}

const randomColor = () => {
    const colors = [
        'bg-pink-100 text-pink-800',
        'bg-purple-100 text-purple-800',
        'bg-green-100 text-green-800',
        'bg-blue-100 text-blue-800',
        'bg-orange-100 text-orange-800',
        'bg-indigo-100 text-indigo-800',
        'bg-red-100 text-red-800',
        'bg-yellow-100 text-yellow-800',
        'bg-cyan-100 text-cyan-800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const CategoryModal: React.FC<CategoryModalProps> = ({ onSave, onClose }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({
            id: Date.now().toString(),
            name: name.trim(),
            color: randomColor()
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-sm">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-semibold text-lg">Add New Category</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
