import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const DeleteConfirmModal = ({ 
  userToDelete, 
  isBulk, 
  onClose 
}) => {
  const { deleteUser, bulkDeleteUsers, selectedUserIds } = useUsers();

  if (!userToDelete && !isBulk) return null;

  const handleConfirm = () => {
    if (isBulk) {
      bulkDeleteUsers();
    } else if (userToDelete) {
      deleteUser(userToDelete.id);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        <div className="modal-header" style={{ borderBottomColor: 'var(--accent-danger-bg)' }}>
          <h3 style={{ color: 'var(--accent-danger)' }}>
            <AlertTriangle size={20} />
            <span>{isBulk ? 'Confirm Bulk Deletion' : 'Confirm User Deletion'}</span>
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '24px 20px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-danger-bg)',
            color: 'var(--accent-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <Trash2 size={28} />
          </div>

          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            {isBulk ? `Delete ${selectedUserIds.length} Selected Users?` : `Delete "${userToDelete?.name}"?`}
          </h4>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {isBulk 
              ? `Are you sure you want to permanently remove these ${selectedUserIds.length} users? This action cannot be undone and will strip all system permissions.`
              : `Are you sure you want to delete user account (${userToDelete?.email})? All data and access rights will be permanently purged.`
            }
          </p>
        </div>

        <div className="modal-footer" style={{ backgroundColor: 'var(--bg-card)' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            <Trash2 size={16} />
            <span>{isBulk ? `Delete ${selectedUserIds.length} Users` : 'Permanently Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
