import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login, preserving the attempted location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
