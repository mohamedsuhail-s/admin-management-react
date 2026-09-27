import React, { useState } from 'react';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Shield, 
  Mail, 
  Phone, 
  Building, 
  ChevronLeft, 
  ChevronRight,
  UserCheck,
  UserX,
  FileSpreadsheet
} from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const UserTable = ({ usersList, viewMode }) => {
  const { 
    selectedUserIds, 
    toggleSelectUser, 
    toggleSelectAll,
    setEditingUser,
    setViewingUser,
    setDeletingUser,
    setIsBulkDeleteModalOpen,
    bulkChangeStatus,
    addToast
  } = useUsers();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredIds = usersList.map(u => u.id);
  const isAllSelected = filteredIds.length > 0 && selectedUserIds.length === filteredIds.length;

  // Pagination calculations
  const totalPages = Math.ceil(usersList.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = usersList.slice(startIndex, startIndex + itemsPerPage);

  const getRoleClass = (role) => {
    switch (role) {
      case 'Super Admin': return 'role-super-admin';
      case 'Admin': return 'role-admin';
      case 'Manager': return 'role-manager';
      case 'Editor': return 'role-editor';
      default: return 'role-viewer';
    }
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : 'inactive';
    return (
      <span className={`badge badge-${s}`}>
        <span className="badge-dot"></span>
        <span>{status}</span>
      </span>
    );
  };

  const handleExportCSV = () => {
    const targets = selectedUserIds.length > 0 
      ? usersList.filter(u => selectedUserIds.includes(u.id))
      : usersList;

    const headers = ["ID,Name,Email,Role,Department,Status,Phone,CreatedAt,LastActive\n"];
    const rows = targets.map(u => 
      `"${u.id}","${u.name}","${u.email}","${u.role}","${u.department}","${u.status}","${u.phone || ''}","${u.createdAt}","${u.lastActive}"\n`
    );

    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    addToast(`Exported ${targets.length} user record(s) to CSV.`, 'info', 'CSV Downloaded');
  };

  if (usersList.length === 0) {
    return (
      <div className="table-card empty-state">
        <div className="empty-icon">
          <UserX size={32} />
        </div>
        <h4>No Users Found</h4>
        <p>No user matches your current search criteria or filter settings.</p>
      </div>
    );
  }

  return (
    <div className="table-card">
      {/* Bulk Action Header Bar */}
      {selectedUserIds.length > 0 && (
        <div className="bulk-bar">
          <div className="bulk-info">
            <span className="bulk-badge">{selectedUserIds.length} Selected</span>
            <span>Bulk actions available for selected users</span>
          </div>
          <div className="bulk-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => bulkChangeStatus('Active')}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <UserCheck size={14} color="#10B981" />
              <span>Set Active</span>
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => bulkChangeStatus('Inactive')}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <UserX size={14} color="#F59E0B" />
              <span>Set Inactive</span>
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleExportCSV}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <FileSpreadsheet size={14} />
              <span>Export CSV</span>
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => setIsBulkDeleteModalOpen(true)}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <Trash2 size={14} />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Render Table View */}
      {viewMode === 'table' ? (
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={isAllSelected}
                    onChange={() => toggleSelectAll(filteredIds)}
                  />
                </th>
                <th>User Details</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);
                return (
                  <tr key={user.id} style={isSelected ? { backgroundColor: 'var(--bg-card-hover)' } : {}}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="custom-checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectUser(user.id)}
                      />
                    </td>
                    <td>
                      <div className="user-cell">
                        <img 
                          src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                          alt={user.name} 
                          className="table-avatar" 
                        />
                        <div className="user-cell-info">
                          <h4>{user.name}</h4>
                          <p>{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`role-badge ${getRoleClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {user.department}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(user.status)}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {user.lastActive || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          className="action-btn" 
                          onClick={() => setViewingUser(user)}
                          title="View User Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button 
                          className="action-btn edit" 
                          onClick={() => setEditingUser(user)}
                          title="Edit User"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="action-btn delete" 
                          onClick={() => setDeletingUser(user)}
                          title="Delete User"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Render Grid Card View */
        <div style={{ padding: '20px' }}>
          <div className="user-grid">
            {paginatedUsers.map((user) => {
              const isSelected = selectedUserIds.includes(user.id);
              return (
                <div 
                  key={user.id} 
                  className="user-card-item"
                  style={isSelected ? { borderColor: 'var(--accent-primary)', backgroundColor: 'var(--bg-card-hover)' } : {}}
                >
                  <div className="user-card-header">
                    <img 
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                      alt={user.name} 
                      className="user-card-avatar"
                    />
                    <input 
                      type="checkbox" 
                      className="custom-checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectUser(user.id)}
                    />
                  </div>

                  <div className="user-card-body">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>

                  <div className="user-card-meta">
                    <div className="meta-row">
                      <span className="meta-label">Role:</span>
                      <span className={`role-badge ${getRoleClass(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Department:</span>
                      <span className="meta-val">{user.department}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Status:</span>
                      {getStatusBadge(user.status)}
                    </div>
                  </div>

                  <div className="user-card-footer">
                    <button 
                      className="action-btn" 
                      onClick={() => setViewingUser(user)}
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <button 
                      className="action-btn edit" 
                      onClick={() => setEditingUser(user)}
                      title="Edit User"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => setDeletingUser(user)}
                      title="Delete User"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination Controls Footer */}
      <div className="pagination-bar">
        <div className="pagination-info">
          Showing <b>{startIndex + 1}</b> to <b>{Math.min(startIndex + itemsPerPage, usersList.length)}</b> of <b>{usersList.length}</b> users
        </div>

        <div className="pagination-controls">
          <select 
            className="select-control" 
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ padding: '4px 28px 4px 8px', fontSize: '0.8rem' }}
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
          </select>

          <button 
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: '6px 10px' }}
          >
            <ChevronLeft size={16} />
          </button>

          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', padding: '0 8px' }}>
            Page {currentPage} of {totalPages}
          </span>

          <button 
            className="btn btn-secondary"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: '6px 10px' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
