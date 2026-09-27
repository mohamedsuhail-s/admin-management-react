import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../data/mockUsers';

const UserContext = createContext();

const STORAGE_KEY = 'admin_management_users_v1';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load users from localStorage", e);
    }
    return INITIAL_USERS;
  });

  const [toasts, setToasts] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('admin_theme') || 'dark';
  });

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users to localStorage", e);
    }
  }, [users]);

  // Apply theme to body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('admin_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addToast = (message, type = 'info', title = '') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type, title }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: "Just now",
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`
    };

    setUsers(prev => [newUser, ...prev]);
    addToast(`User "${newUser.name}" has been created successfully.`, 'success', 'User Created');
    setIsCreateModalOpen(false);
  };

  const updateUser = (id, updatedData) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedData } : u));
    addToast(`User "${updatedData.name || 'information'}" updated successfully.`, 'success', 'User Updated');
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    const target = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    setSelectedUserIds(prev => prev.filter(selectedId => selectedId !== id));
    if (target) {
      addToast(`User "${target.name}" was permanently deleted.`, 'danger', 'User Deleted');
    }
    setDeletingUser(null);
  };

  const bulkDeleteUsers = () => {
    const count = selectedUserIds.length;
    setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
    setSelectedUserIds([]);
    addToast(`${count} users have been deleted from the system.`, 'danger', 'Bulk Deletion Complete');
    setIsBulkDeleteModalOpen(false);
  };

  const bulkChangeStatus = (newStatus) => {
    setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: newStatus } : u));
    addToast(`Status of ${selectedUserIds.length} users updated to ${newStatus}.`, 'info', 'Status Batch Updated');
    setSelectedUserIds([]);
  };

  const resetData = () => {
    setUsers(INITIAL_USERS);
    setSelectedUserIds([]);
    localStorage.removeItem(STORAGE_KEY);
    addToast('System data reset to initial default state.', 'info', 'Data Reset');
  };

  const toggleSelectUser = (id) => {
    setSelectedUserIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (filteredUserIds) => {
    if (selectedUserIds.length === filteredUserIds.length && filteredUserIds.length > 0) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUserIds);
    }
  };

  return (
    <UserContext.Provider value={{
      users,
      toasts,
      theme,
      toggleTheme,
      addToast,
      removeToast,
      addUser,
      updateUser,
      deleteUser,
      bulkDeleteUsers,
      bulkChangeStatus,
      resetData,
      selectedUserIds,
      toggleSelectUser,
      toggleSelectAll,
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
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
