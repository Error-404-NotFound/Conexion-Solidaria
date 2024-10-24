import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info (or token)
    const [loading, setLoading] = useState(true);

    // Function to check if the user is authenticated
    const checkAuth = async () => {
        try {
            const response = await api.get("/is-LoggedIn");
            // console.log(response.data.user);
            setUser(response.data.user);  // Assuming your backend returns user info on protected endpoints
        } catch (error) {
            console.log("Got Error:" + error);
            setUser(null);  // In case of error (user not authenticated)
        } finally {
            setLoading(false);
        }
    };

    // Use useEffect to check auth status on app load
    useEffect(() => {
        console.log("useEffect");
        checkAuth();  // Check authentication when the app mounts
    }, []);


    const login = (userData) => {
        // console.log(userData);
        setUser(userData); // Save user data or token
    };

    const logout = async () => {
        try {
            // Send a request to the backend to log out and clear the cookie
            const response = await api.post("/logout");
            if (response.data.message == "Logged out successfully") {
                setUser(null);
            }
            else {
                console.log("Logout failed:", error);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
