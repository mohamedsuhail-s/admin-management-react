import React from 'react';
import { UserPlus, Bell, Search, Shield, ChevronRight } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const Header = ({ activeMenu, searchGlobal, setSearchGlobal }) => {
  const { setIsCreateModalOpen, users } = useUsers();

  const getMenuTitle = () => {
    switch (activeMenu) {
      case 'users': return 'User Management';
      case 'analytics': return 'Analytics & Insights';
      case 'security': return 'Roles & Access Control';
      case 'settings': return 'System Settings';
      default: return 'Admin Overview';
    }
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
      </div>
    </header>
  );
};
