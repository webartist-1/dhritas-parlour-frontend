// src/components/services/ServiceDetailsModal.tsx

import { Clock, DollarSign, Edit, X } from 'lucide-react';
import React from 'react';
import { Service } from '../../types/services';

interface ServiceDetailsModalProps {
    service: Service;
    onClose: () => void;
    onEdit: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
    service,
    onClose,
    onEdit
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/600/400';
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h2>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${service.category.color}`}>
                                {service.category.name}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                onEdit();
                                onClose();
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center text-gray-700 mb-2">
                                <Clock className="w-5 h-5 mr-2" />
                                <span className="font-medium">Duration</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{service.duration} min</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center text-gray-700 mb-2">
                                <DollarSign className="w-5 h-5 mr-2" />
                                <span className="font-medium">Price</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">${service.price}</p>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                        <p>Created: {new Date(service.createdAt).toLocaleDateString()}</p>
                        <p>Last updated: {new Date(service.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsModal;
