// src/routes/routes.tsx

import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import Orders from '../pages/Order';
import Products from '../pages/Products';
import Services from '../pages/Services';
import SignUpPage from '../pages/SignUpPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import { ProtectedRoute } from './ProtectedRoute';
import Bookings from '../pages/Bookings';


export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'regular']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services"
        element={
          <ProtectedRoute allowedRoles={['admin', 'regular']}>
            <Services />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={['admin', 'regular']}>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRoles={['admin', 'regular']}>
            <Bookings />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['admin', 'regular']}>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Default Route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}