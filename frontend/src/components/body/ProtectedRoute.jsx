import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // If loading is true, we return null to wait for the context to load
    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner could go here
    }

    if (!user) {
        // Show an alert if the user is not logged in
        window.alert('You need to be logged in to access this page.');
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
