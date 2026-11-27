import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (role && user.tipoCadastro !== role) {
    return <Navigate to={user.tipoCadastro === 'empresa' ? '/empresa' : '/vagas'} replace />;
  }
  return children;
}
