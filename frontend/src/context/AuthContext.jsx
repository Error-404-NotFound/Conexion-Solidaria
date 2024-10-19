import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info (or token)
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);


    const login = (userData) => {
        setUser(userData); // Save user data or token
        localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
