import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // This is a simple implementation. In a real app, you'd want to:
  // 1. Check for a valid auth token
  // 2. Verify the user's admin status
  // 3. Handle loading states
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    // Redirect to login while preserving the intended destination
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
