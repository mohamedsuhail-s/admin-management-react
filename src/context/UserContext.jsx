import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Fetch users exclusively from Laravel API when authenticated
  const fetchUsers = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/users');
      const fetchedData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setUsers(fetchedData);
    } catch (err) {
      console.error("API Error fetching users:", err);
      setError("Failed to load users from backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  // Add user via API
  const addUser = async (userData) => {
    try {
      const payload = {
        name: userData.name,
        email: userData.email,
        role: userData.role || 'Viewer',
        department: userData.department || 'General',
        status: userData.status || 'Active',
        phone: userData.phone || '',
        avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`
      };

      const res = await api.post('/users', payload);
      const createdUser = res.data?.data || res.data;
      
      setUsers(prev => [createdUser, ...prev]);
      addToast(`User "${createdUser.name}" created successfully via API.`, 'success', 'User Created');
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating user:", err);
      addToast("Failed to create user on backend.", 'danger', 'API Error');
    }
  };

  // Update user via API
  const updateUser = async (id, updatedData) => {
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      const updatedUser = res.data?.data || { ...users.find(u => u.id === id), ...updatedData };

      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
      addToast(`User "${updatedUser.name || 'information'}" updated successfully.`, 'success', 'User Updated');
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
      addToast("Failed to update user on backend.", 'danger', 'API Error');
    }
  };

  // Delete user via API
  const deleteUser = async (id) => {
    const target = users.find(u => u.id === id);
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      setSelectedUserIds(prev => prev.filter(selectedId => selectedId !== id));

      if (target) {
        addToast(`User "${target.name}" was deleted permanently from server.`, 'danger', 'User Deleted');
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      addToast("Failed to delete user on backend.", 'danger', 'API Error');
    } finally {
      setDeletingUser(null);
    }
  };

  // Bulk delete users via API
  const bulkDeleteUsers = async () => {
    const count = selectedUserIds.length;
    try {
      await Promise.all(selectedUserIds.map(id => api.delete(`/users/${id}`)));
      setUsers(prev => prev.filter(u => !selectedUserIds.includes(u.id)));
      setSelectedUserIds([]);
      addToast(`${count} users deleted from backend.`, 'danger', 'Bulk Deletion Complete');
    } catch (err) {
      console.error("Bulk delete error:", err);
      addToast("Error performing bulk deletion.", 'danger', 'API Error');
    } finally {
      setIsBulkDeleteModalOpen(false);
    }
  };

  // Bulk status update via API
  const bulkChangeStatus = async (newStatus) => {
    try {
      await Promise.all(selectedUserIds.map(id => api.put(`/users/${id}`, { status: newStatus })));
      setUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, status: newStatus } : u));
      addToast(`Status of ${selectedUserIds.length} users updated to ${newStatus}.`, 'info', 'Status Batch Updated');
      setSelectedUserIds([]);
    } catch (err) {
      console.error("Bulk status error:", err);
      addToast("Error updating user statuses.", 'danger', 'API Error');
    }
  };

  const resetData = () => {
    fetchUsers();
    setSelectedUserIds([]);
    addToast('Refreshed user data from Railway API.', 'info', 'Data Refreshed');
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
      loading,
      error,
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
      fetchUsers,
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
