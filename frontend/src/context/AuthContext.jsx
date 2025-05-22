import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in when component mounts
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            // You can check localStorage or make an API call to validate token
            const token = localStorage.getItem('token');
            if (token) {
                // Optional: Verify token with backend
                setIsAuthenticated(true);
                // You might want to fetch user data here
                // setUser(userData);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('Auth status check failed:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            // Make API call to login endpoint
            // const response = await api.post('/login', credentials);
            // const { token, user } = response.data;
            
            // For demo, we'll just set a dummy token
            localStorage.setItem('token', 'dummy-token');
            setIsAuthenticated(true);
            // setUser(user);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};