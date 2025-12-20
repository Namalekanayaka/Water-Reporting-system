import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component for routes that require authentication and optionally a specific role.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authenticated
 * @param {String} props.allowedRole - (Optional) The specific role required (e.g., 'authority', 'citizen')
 */
const ProtectedRoute = ({ children, allowedRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    // While checking authentication status (if checking a persistent token)
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-md-surface">
                <div className="animate-spin h-10 w-10 border-4 border-md-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    // Not authenticated -> Redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Authenticated but wrong role -> Redirect to home or unauthorized page
    if (allowedRole && user?.role !== allowedRole) {
        // Decide where to send users who don't have permission
        // Citizens trying to access Authority pages -> Redirect to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
