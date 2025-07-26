// src/components/dashboard/StatsCards.tsx

import { Calendar, DollarSign, ShoppingBag, TrendingDown, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { StatsData } from '../../types/dashboard';
import { Skeleton, SkeletonContainer } from '../loading/Skeleton';

interface StatsCardsProps {
  stats?: StatsData;
  loading: boolean;
}

interface StatCardProps {
  title: string;
  value: string;
  growth: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, growth, icon: Icon, color }) => {
  const isPositive = growth >= 0;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(growth)}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <SkeletonContainer key={index}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Skeleton width="w-24" className="mb-3" />
                <Skeleton width="w-20" height="h-8" />
              </div>
              <Skeleton width="w-12" height="h-12" rounded="lg" />
            </div>
            <div className="flex items-center mt-4">
              <Skeleton width="w-4" height="h-4" className="mr-2" />
              <Skeleton width="w-16" />
            </div>
          </SkeletonContainer>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statsConfig = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      growth: stats.revenueGrowth,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      growth: stats.ordersGrowth,
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toString(),
      growth: stats.bookingsGrowth,
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toString(),
      growth: stats.customersGrowth,
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsConfig.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
