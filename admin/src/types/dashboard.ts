// src/types/dashboard.ts

export interface StatsData {
  totalRevenue: number;
  totalOrders: number;
  totalBookings: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
  bookingsGrowth: number;
  customersGrowth: number;
}

export interface ChartDataPoint {
  month: string;
  amount?: number;
  count?: number;
}

export interface ChartData {
  revenue: ChartDataPoint[];
  bookings: ChartDataPoint[];
}

export interface Activity {
  id: string;
  type: 'order' | 'booking' | 'customer' | 'service';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'info' | 'warning' | 'completed';
}

export interface DashboardData {
  stats: StatsData;
  chartData: ChartData;
  recentActivities: Activity[];
}
