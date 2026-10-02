import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UserManagementView } from './components/UserManagementView';
import { ToastContainer } from './components/ToastContainer';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppContent = () => {
  const [activeMenu, setActiveMenu] = useState('users'); // Default menu set to User Management
  const [searchGlobal, setSearchGlobal] = useState('');

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="main-content">
        {/* Header Navigation */}
        <Header 
          activeMenu={activeMenu} 
          searchGlobal={searchGlobal} 
          setSearchGlobal={setSearchGlobal} 
        />

        {/* Dynamic Content View */}
        {activeMenu === 'users' ? (
          <UserManagementView searchGlobal={searchGlobal} />
        ) : (
          <div className="dashboard-body" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="table-card empty-state" style={{ maxWidth: '480px', width: '100%' }}>
              <h4>{activeMenu.toUpperCase()} View</h4>
              <p>You can switch back to <b>User Management</b> using the menu on the left to perform full Create, Edit, and Delete operations on system users.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setActiveMenu('users')}
                style={{ marginTop: '12px' }}
              >
                Go to User Management Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <Routes>
            {/* Separate Dedicated Login Page Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Separate Dedicated Signup Page Route */}
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <AppContent />
                </ProtectedRoute>
              } 
            />

            {/* Default Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

          {/* Root Level Notifications */}
          <ToastContainer />
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
