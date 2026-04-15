import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
export const PrivateRoute = ({ children, role }: { children: ReactNode; role?: string }) => {
    const isAuthenticated = true;
    const userRole = 'ADMIN';
    if (!isAuthenticated) return <Navigate to='/login' replace />;
    if (role && userRole !== role) return <Navigate to='/' replace />;
    return <>{children}</>
};
