import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';
import { UserStats } from './UserStats';
import { UserControls } from './UserControls';
import { UserTable } from './UserTable';
import { UserModal } from './UserModal';
import { UserDetailModal } from './UserDetailModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const UserManagementView = ({ searchGlobal }) => {
  const { 
    users, 
    isCreateModalOpen, 
    setIsCreateModalOpen,
    editingUser, 
    setEditingUser,
    viewingUser, 
    setViewingUser,
    deletingUser, 
    setDeletingUser,
    isBulkDeleteModalOpen, 
    setIsBulkDeleteModalOpen
  } = useUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table');

  // Combine local search query and global search bar from header
  const activeSearch = searchGlobal || searchQuery;

  // Filter users based on query and dropdown filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = !activeSearch || 
      user.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(activeSearch.toLowerCase()) ||
      user.department.toLowerCase().includes(activeSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
    const matchesDept = deptFilter === 'ALL' || user.department === deptFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesDept;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setRoleFilter('ALL');
    setStatusFilter('ALL');
    setDeptFilter('ALL');
  };

  return (
    <div className="dashboard-body">
      {/* High level user statistics */}
      <UserStats />

      {/* Control filters bar */}
      <UserControls 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        deptFilter={deptFilter}
        setDeptFilter={setDeptFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        resetFilters={resetFilters}
      />

      {/* Primary User Data Presentation */}
      <UserTable 
        usersList={filteredUsers}
        viewMode={viewMode}
      />

      {/* Create User Modal */}
      <UserModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit User Modal */}
      {editingUser && (
        <UserModal 
          isOpen={true}
          initialData={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* View Details Modal */}
      {viewingUser && (
        <UserDetailModal 
          user={viewingUser}
          onClose={() => setViewingUser(null)}
        />
      )}

      {/* Delete Confirmation Modal (Single or Bulk) */}
      {(deletingUser || isBulkDeleteModalOpen) && (
        <DeleteConfirmModal 
          userToDelete={deletingUser}
          isBulk={isBulkDeleteModalOpen}
          onClose={() => {
            setDeletingUser(null);
            setIsBulkDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
