import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}
export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role && user) {
    const userRole = user.roleId === 2 ? 'ADMIN' : 'USER';

    if (userRole !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

