import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Bell, Search, ChevronRight, LogOut, Sun, Moon } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

export const Header = ({ activeMenu, searchGlobal, setSearchGlobal }) => {
  const { setIsCreateModalOpen } = useUsers();
  const { user, isAuthenticated, logout, theme, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const getMenuTitle = () => {
    switch (activeMenu) {
      case 'users': return 'User Management';
      case 'analytics': return 'Analytics & Insights';
      case 'security': return 'Roles & Access Control';
      case 'settings': return 'System Settings';
      default: return 'Admin Overview';
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="page-title">
          <div className="breadcrumb">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span>Management</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{getMenuTitle()}</span>
          </div>
          <h2>{getMenuTitle()}</h2>
        </div>
      </div>

      <div className="header-right">
        {/* Global Search */}
        <div className="search-box" style={{ maxWidth: '280px' }}>
          <Search size={16} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search users, roles..."
            value={searchGlobal}
            onChange={(e) => setSearchGlobal(e.target.value)}
          />
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="btn-icon-only" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Icon */}
        <button className="btn-icon-only" title="Notifications">
          <Bell size={18} />
        </button>

        {/* Primary Action Button */}
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <UserPlus size={18} />
          <span>Add User</span>
        </button>

        {/* Authenticated User Profile & Logout - NO LOGIN/SIGNUP BUTTONS */}
        {isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px', paddingLeft: '12px', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`} 
                alt={user?.name}
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid var(--primary-color)', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.2' }}>
                  {user?.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {user?.role || 'Admin'}
                </span>
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={handleLogout}
              title="Logout"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
