import React from 'react';
import { X, Mail, Phone, Calendar, Clock, ShieldCheck, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const UserDetailModal = ({ user, onClose }) => {
  const { setEditingUser, setDeletingUser } = useUsers();

  if (!user) return null;

  const permissions = user.permissions || ["user_manage", "view_only"];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3>
            <ShieldCheck color="var(--accent-primary)" size={20} />
            <span>User Profile Overview</span>
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', gap: '20px' }}>
          {/* Avatar and Main Info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt={user.name} 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--accent-primary)',
                boxShadow: '0 4px 12px var(--accent-glow)'
              }}
            />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</h3>
            <span className="role-badge role-admin">{user.role}</span>
          </div>

          {/* Details Table List */}
          <div style={{
            backgroundColor: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Email:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.email}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Department:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.department}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Status:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.status}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.phone || 'Not provided'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date Created:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.createdAt || '2024-01-01'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Last Activity:</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.lastActive || 'Just now'}</span>
            </div>
          </div>

          {/* Permissions Tag Cloud */}
          <div style={{ textAlign: 'left' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Granted Permissions
            </h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {permissions.map((perm, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)'
                }}>
                  ✓ {perm}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              onClose();
              setDeletingUser(user);
            }}
          >
            <Trash2 size={16} />
            <span>Delete User</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                onClose();
                setEditingUser(user);
              }}
            >
              <Edit3 size={16} />
              <span>Edit User</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
