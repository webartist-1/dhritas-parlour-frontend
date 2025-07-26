/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import apiService from '../services/apiService'; // Import API service
import { UserRole } from '../types/auth';

// Define the type for the user
interface User {
    role: UserRole;
    email: string;
    uid: string;
    username?: string; // Optional field for username
}

// Define the context's state
interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check localStorage for a stored user on app mount (persist login)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user'); // Clear corrupted data
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response = await apiService.login(email, password); // API call
            console.log(response)
            if (!response || !response.user_type || !response.email || !response.token) {
                throw new Error('Invalid response from API');
            }

            const userData: User = {
                role: response.user_type,
                email: response.email,
                uid: response.token,
                username: response.username,
            };

            console.log(userData)

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // Store user
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user
        setIsLoading(false);
    };

    // Memoized context value
    const authContextValue = useMemo(() => ({ user, login, logout, isLoading }), [user, isLoading]);

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
