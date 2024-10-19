// src/components/ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // If loading is true, we return null to wait for the context to load
    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner could go here
    }


    return user ? children : <Navigate to="/login" />;
    // return (
    //     <Route
    //         {...rest}
    //         element={user ? element : <Navigate to="/login" replace />}
    //     />
    // );
};

export default ProtectedRoute;
