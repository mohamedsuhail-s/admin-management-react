import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify token on app load if token exists
  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.get('/me');
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('user_data', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.error("Auth check failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  // Login action
  const login = async (email, password) => {
    setIsSubmitting(true);
    setAuthError('');
    try {
      const res = await api.post('/login', { email, password });
      const { user: userData, token: authToken } = res.data;
      
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      setAuthModalOpen(false);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials or connection error.';
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Register action
  const register = async (formData) => {
    setIsSubmitting(true);
    setAuthError('');
    try {
      const res = await api.post('/register', formData);
      const { user: userData, token: authToken } = res.data;

      setUser(userData);
      setToken(authToken);
      localStorage.setItem('auth_token', authToken);
      localStorage.setItem('user_data', JSON.stringify(userData));

      setAuthModalOpen(false);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(', ')
        : 'Registration failed. Please try again.';
      setAuthError(msg);
      return { success: false, error: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout action
  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (err) {
      console.warn("Logout API warning:", err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  };

  const openLogin = () => {
    setAuthMode('login');
    setAuthError('');
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setAuthError('');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthError('');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!user && !!token,
      authModalOpen,
      authMode,
      setAuthMode,
      authError,
      setAuthError,
      isSubmitting,
      login,
      register,
      logout,
      openLogin,
      openRegister,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
