import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UserManagementView } from './components/UserManagementView';
import { ToastContainer } from './components/ToastContainer';
import { AuthPage } from './components/AuthPage';
import { Shield, Loader2 } from 'lucide-react';

const AppContent = () => {
  const [activeMenu, setActiveMenu] = useState('users'); // Default menu set to User Management
  const [searchGlobal, setSearchGlobal] = useState('');

  return (
    <div className="app-container">
      {/* Sidebar with highlighted User Management single main menu */}
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

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
};

// Gatekeeper Component: Renders AuthPage first if unauthenticated, or Dashboard if logged in
const MainRouter = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-primary)',
        gap: '16px'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 20px var(--accent-glow)'
        }}>
          <Shield size={30} color="#FFFFFF" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', color: 'var(--text-secondary)' }}>
          <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
          <span>Verifying authentication session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}
