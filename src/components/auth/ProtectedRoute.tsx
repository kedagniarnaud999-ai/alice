import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier que l'email est vérifié pour les utilisateurs locaux
  // Les utilisateurs OAuth (Google) ont déjà un email vérifié
  if (user && !user.emailVerified) {
    return <Navigate to="/verify-email-sent" replace />;
  }

  return <>{children}</>;
};
