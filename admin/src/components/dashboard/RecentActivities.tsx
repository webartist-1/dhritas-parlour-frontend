// src/components/dashboard/RecentActivities.tsx

import { Calendar, CheckCircle, Clock, ShoppingBag, User } from 'lucide-react';
import React from 'react';
import { Activity } from '../../types/dashboard';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';

interface RecentActivitiesProps {
    activities?: Activity[];
    loading: boolean;
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
    const getIcon = () => {
        switch (activity.type) {
            case 'order':
                return ShoppingBag;
            case 'booking':
                return Calendar;
            case 'customer':
                return User;
            default:
                return Clock;
        }
    };

    const getStatusColor = () => {
        switch (activity.status) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'info':
                return 'bg-blue-100 text-blue-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const Icon = getIcon();

    return (
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className={`p-2 rounded-lg ${getStatusColor()}`}>
                <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>

            {activity.status === 'completed' && (
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            )}
        </div>
    );
};

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, loading }) => {
    if (loading) {
        return (
            <SkeletonContainer>
                <div className="flex items-center justify-between mb-4">
                    <Skeleton width="w-32" height="h-6" />
                    <Skeleton width="w-16" />
                </div>

                <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3">
                            <Skeleton width="w-8" height="h-8" rounded="lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton width="w-3/4" />
                                <Skeleton width="w-1/2" height="h-3" />
                                <Skeleton width="w-1/4" height="h-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </SkeletonContainer>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all
                </button>
            </div>

            <div className="space-y-1">
                {activities?.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;
