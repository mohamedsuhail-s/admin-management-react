import React, { useState, useEffect } from 'react';
import { X, User, Mail, Shield, Building, Phone, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useUsers } from '../context/UserContext';
import { ROLES, DEPARTMENTS, STATUSES } from '../data/mockUsers';

export const UserModal = ({ isOpen, onClose, initialData = null }) => {
  const { addUser, updateUser } = useUsers();

  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Editor',
    department: 'Engineering',
    status: 'Active',
    phone: '',
    password: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'Editor',
        department: initialData.department || 'Engineering',
        status: initialData.status || 'Active',
        phone: initialData.phone || '',
        password: '',
        avatar: initialData.avatar || ''
      });
    } else {
      const seed = Math.random().toString(36).substring(7);
      setFormData({
        name: '',
        email: '',
        role: 'Editor',
        department: 'Engineering',
        status: 'Active',
        phone: '',
        password: '',
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleRandomAvatar = () => {
    const avatarList = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80"
    ];
    const nextAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];
    setFormData(prev => ({ ...prev, avatar: nextAvatar }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email format';
    }
    if (!isEditMode && !formData.password.trim()) {
      errs.password = 'Initial password is required';
    } else if (!isEditMode && formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode) {
      updateUser(initialData.id, formData);
    } else {
      addUser(formData);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <User color="var(--accent-primary)" size={20} />
            <span>{isEditMode ? 'Edit User Details' : 'Create New User Account'}</span>
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Avatar Selection Preview */}
            <div className="avatar-selector">
              <img 
                src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || 'User'}`} 
                alt="Avatar Preview" 
                className="preview-avatar" 
              />
              <div style={{ flex: 1 }}>
                <label className="form-label">Avatar Image URL</label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="https://..."
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={handleRandomAvatar}
                    title="Randomize Avatar"
                    style={{ padding: '8px 12px' }}
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Form Row: Name & Email */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={errors.name ? { borderColor: 'var(--accent-danger)' } : {}}
                />
                {errors.name && <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email"
                  className="form-input"
                  placeholder="jane.doe@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={errors.email ? { borderColor: 'var(--accent-danger)' } : {}}
                />
                {errors.email && <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.email}</span>}
              </div>
            </div>

            {/* Form Row: Role & Department */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">System Role</label>
                <select 
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department</label>
                <select 
                  className="form-input"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Row: Status & Phone */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Account Status</label>
                <select 
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Password input for new users or password reset */}
            {(!isEditMode || formData.password) && (
              <div className="form-group">
                <label className="form-label">{isEditMode ? 'New Password (leave blank to keep current)' : 'Initial Password *'}</label>
                <input 
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={errors.password ? { borderColor: 'var(--accent-danger)' } : {}}
                />
                {errors.password && <span style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>{errors.password}</span>}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>{isEditMode ? 'Save User Changes' : 'Create User Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
