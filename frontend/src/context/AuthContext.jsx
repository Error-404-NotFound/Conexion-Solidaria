import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info (or token)
    const [loading, setLoading] = useState(true);

    // Function to check if the user is authenticated
    const checkAuth = async () => {
        try {
            const response = await axios.get("http://localhost:3000/protected", { withCredentials: true });
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
        setUser(userData); // Save user data or token
        // sessionStorage.setItem('user', JSON.stringify(userData)); // Save to sessionStorage
    };

    const logout = () => {
        setUser(null);
        // sessionStorage.removeItem('user'); // Clear from sessionStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
