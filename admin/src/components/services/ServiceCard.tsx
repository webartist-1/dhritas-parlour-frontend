// src/components/services/ServiceCard.tsx

import { Clock, DollarSign, Edit, Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Service } from '../../types/services';
import ServiceDetailsModal from './ServiceDetailsModal';

interface ServiceCardProps {
    service: Service;
    onEdit: () => void;
    onDelete: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        onDelete();
        setShowDeleteConfirm(false);
    };

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
                {/* Service Image */}
                <div className="relative h-48 bg-gray-100">
                    <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/300/200';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={() => setShowDetails(true)}
                            className="bg-white text-gray-800 px-3 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>
                    </div>
                </div>

                {/* Service Info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{service.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${service.category.color}`}>
                            {service.category.name}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {service.duration} min
                            </div>
                            <div className="flex items-center text-lg font-semibold text-gray-900">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {service.price}
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={onEdit}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="Edit service"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Delete service"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Details Modal */}
            {showDetails && (
                <ServiceDetailsModal
                    service={service}
                    onClose={() => setShowDetails(false)}
                    onEdit={onEdit}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Service</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{service.name}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServiceCard;
