// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
