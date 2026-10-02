import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, Building, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

export const AuthModal = () => {
  const { 
    authModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    authError, 
    isSubmitting 
  } = useAuth();
  
  const { addToast } = useUsers();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    department: 'Engineering',
    phone: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  if (!authModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (authMode === 'register') {
      if (!formData.name) errs.name = 'Full name is required';
      if (formData.password !== formData.password_confirmation) {
        errs.password_confirmation = 'Passwords do not match';
      }
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (authMode === 'login') {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        addToast(`Welcome back, ${res.user.name || 'User'}!`, 'success', 'Logged In');
      }
    } else {
      const res = await register(formData);
      if (res.success) {
        addToast(`Account created successfully! Welcome ${res.user.name}.`, 'success', 'Registered');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        
        {/* Header Tabs */}
        <div className="modal-header" style={{ paddingBottom: '0', borderBottom: 'none' }}>
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', width: '100%' }}>
            <button
              type="button"
              className={`nav-item ${authMode === 'login' ? 'active' : ''}`}
              onClick={() => setAuthMode('login')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: authMode === 'login' ? 'var(--primary-color)' : 'var(--text-muted)',
                borderBottom: authMode === 'login' ? '2px solid var(--primary-color)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <LogIn size={18} />
              Login
            </button>
            <button
              type="button"
              className={`nav-item ${authMode === 'register' ? 'active' : ''}`}
              onClick={() => setAuthMode('register')}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 16px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: authMode === 'register' ? 'var(--primary-color)' : 'var(--text-muted)',
                borderBottom: authMode === 'register' ? '2px solid var(--primary-color)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <UserPlus size={18} />
              Sign Up
            </button>
          </div>
          <button className="modal-close" onClick={closeAuthModal} style={{ top: '16px', right: '16px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Global Error Banner */}
        {authError && (
          <div style={{
            margin: '16px 24px 0',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          
          {/* Register: Full Name */}
          {authMode === 'register' && (
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className={`form-input ${validationErrors.name ? 'input-error' : ''}`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {validationErrors.name && <span className="field-error">{validationErrors.name}</span>}
            </div>
          )}

          {/* Email Address */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
          </div>

          {/* Register: Department & Phone */}
          {authMode === 'register' && (
            <>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Department</label>
                <div className="input-with-icon">
                  <Building size={18} className="input-icon" />
                  <select
                    name="department"
                    className="form-input"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Phone Number (Optional)</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="text"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label">Password</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {validationErrors.password && <span className="field-error">{validationErrors.password}</span>}
          </div>

          {/* Register: Confirm Password */}
          {authMode === 'register' && (
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  className={`form-input ${validationErrors.password_confirmation ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
              </div>
              {validationErrors.password_confirmation && (
                <span className="field-error">{validationErrors.password_confirmation}</span>
              )}
            </div>
          )}

          {/* Modal Actions */}
          <div className="modal-footer" style={{ padding: '16px 0 0', marginTop: '24px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeAuthModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {isSubmitting ? (
                <span>Processing...</span>
              ) : authMode === 'login' ? (
                <>
                  <LogIn size={18} />
                  Login to Account
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
