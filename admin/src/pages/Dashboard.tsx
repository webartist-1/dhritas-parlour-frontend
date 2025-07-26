// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import ChartSection from '../components/dashboard/ChartSection';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivities from '../components/dashboard/RecentActivities';
import StatsCards from '../components/dashboard/StatsCards';
import { DashboardData } from '../types/dashboard';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockData: DashboardData = {
        stats: {
          totalRevenue: 45250,
          totalOrders: 156,
          totalBookings: 89,
          totalCustomers: 234,
          revenueGrowth: 12.5,
          ordersGrowth: 8.3,
          bookingsGrowth: 15.7,
          customersGrowth: 6.9
        },
        chartData: {
          revenue: [
            { month: 'Jan', amount: 4200 },
            { month: 'Feb', amount: 3800 },
            { month: 'Mar', amount: 5100 },
            { month: 'Apr', amount: 4600 },
            { month: 'May', amount: 5400 },
            { month: 'Jun', amount: 4525 }
          ],
          bookings: [
            { month: 'Jan', count: 12 },
            { month: 'Feb', count: 19 },
            { month: 'Mar', count: 15 },
            { month: 'Apr', count: 22 },
            { month: 'May', count: 18 },
            { month: 'Jun', count: 25 }
          ]
        },
        recentActivities: [
          {
            id: '1',
            type: 'order',
            title: 'New order received',
            description: 'Order #1234 from Sarah Johnson',
            time: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'booking',
            title: 'Appointment booked',
            description: 'Facial treatment on July 28, 2025',
            time: '15 minutes ago',
            status: 'info'
          },
          {
            id: '3',
            type: 'customer',
            title: 'New customer registered',
            description: 'Emma Davis joined the platform',
            time: '1 hour ago',
            status: 'success'
          },
          {
            id: '4',
            type: 'order',
            title: 'Order completed',
            description: 'Order #1230 has been delivered',
            time: '2 hours ago',
            status: 'completed'
          }
        ]
      };

      setDashboardData(mockData);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader loading={loading} />

        <StatsCards
          stats={dashboardData?.stats}
          loading={loading}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ChartSection
              chartData={dashboardData?.chartData}
              loading={loading}
            />
          </div>

          <div className="space-y-6">
            <QuickActions loading={loading} />
            <RecentActivities
              activities={dashboardData?.recentActivities}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
