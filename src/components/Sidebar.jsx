import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  UserCheck, 
  UserX, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Lock, 
  Sun, 
  Moon,
  Sparkles,
  Database
} from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { users, theme, toggleTheme, setIsCreateModalOpen, resetData } = useUsers();

  const activeCount = users.filter(u => u.status === 'Active').length;
  const adminCount = users.filter(u => u.role.includes('Admin')).length;

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon">
          <ShieldCheck size={22} />
        </div>
        <div className="brand-text">
          <h1>Nexus Admin</h1>
          <p>Management Platform</p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="sidebar-menu">
        <div className="menu-section">
          <div className="menu-title">Main Navigation</div>
          
          <button 
            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            <div className="menu-item-left">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </div>
          </button>

          {/* Primary User Management Menu */}
          <button 
            className={`menu-item ${activeMenu === 'users' ? 'active' : ''}`}
            onClick={() => setActiveMenu('users')}
          >
            <div className="menu-item-left">
              <Users size={18} />
              <span>User Management</span>
            </div>
            <span className="badge-count">{users.length}</span>
          </button>

          <button 
            className={`menu-item ${activeMenu === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveMenu('analytics')}
          >
            <div className="menu-item-left">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </div>
          </button>
        </div>

        <div className="menu-section">
          <div className="menu-title">System & Security</div>
          
          <button 
            className={`menu-item ${activeMenu === 'security' ? 'active' : ''}`}
            onClick={() => setActiveMenu('security')}
          >
            <div className="menu-item-left">
              <Lock size={18} />
              <span>Roles & Access</span>
            </div>
          </button>

          <button 
            className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('settings')}
          >
            <div className="menu-item-left">
              <Settings size={18} />
              <span>System Settings</span>
            </div>
          </button>
        </div>

        {/* Quick User Actions Highlight Panel */}
        <div className="sidebar-action-card">
          <h4>User Quick Actions</h4>
          <p>Perform key user operations directly</p>
          <div className="quick-crud-list">
            <button className="quick-crud-btn" onClick={() => setIsCreateModalOpen(true)}>
              <UserPlus size={14} color="#6366F1" />
              <span>+ Create New User</span>
            </button>
            <button className="quick-crud-btn" onClick={() => setActiveMenu('users')}>
              <UserCheck size={14} color="#10B981" />
              <span>Edit / View ({activeCount} Active)</span>
            </button>
            <button className="quick-crud-btn" onClick={resetData} title="Reset to default mock dataset">
              <Database size={14} color="#F59E0B" />
              <span>Reset User Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer with Profile & Theme Selector */}
      <div className="sidebar-footer">
        <div className="user-profile-summary">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
            alt="Admin" 
            className="profile-avatar" 
          />
          <div className="profile-info">
            <h5>Admin Admin</h5>
            <span>Super Administrator</span>
          </div>
        </div>

        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </aside>
  );
};
