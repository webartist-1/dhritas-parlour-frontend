// src/routes/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../types/auth';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; // Optional allowed roles
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth(); 
  if (isLoading) {
    return <div>Checking authentication...</div>; 
  }

  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/login" replace />; 
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return <>{children}</>; 
}