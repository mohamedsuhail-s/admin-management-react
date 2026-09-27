import React from 'react';
import { Users, UserCheck, Shield, Clock, TrendingUp } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const UserStats = () => {
  const { users } = useUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const adminUsers = users.filter(u => u.role.includes('Admin')).length;
  const pendingUsers = users.filter(u => u.status === 'Pending').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <span>Total Users</span>
          <h3>{totalUsers}</h3>
          <div className="stat-trend positive">
            <TrendingUp size={12} />
            <span>+12% from last month</span>
          </div>
        </div>
        <div className="stat-icon indigo">
          <Users size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span>Active Users</span>
          <h3>{activeUsers}</h3>
          <div className="stat-trend positive">
            <TrendingUp size={12} />
            <span>{Math.round((activeUsers / (totalUsers || 1)) * 100)}% active rate</span>
          </div>
        </div>
        <div className="stat-icon emerald">
          <UserCheck size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span>Administrators</span>
          <h3>{adminUsers}</h3>
          <div className="stat-trend neutral">
            <span>Privileged accounts</span>
          </div>
        </div>
        <div className="stat-icon cyan">
          <Shield size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span>Pending Invites</span>
          <h3>{pendingUsers}</h3>
          <div className="stat-trend neutral">
            <Clock size={12} />
            <span>Awaiting activation</span>
          </div>
        </div>
        <div className="stat-icon amber">
          <Clock size={24} />
        </div>
      </div>
    </div>
  );
};
