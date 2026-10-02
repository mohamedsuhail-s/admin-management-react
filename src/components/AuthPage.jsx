import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Building, 
  Phone, 
  AlertCircle, 
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

export const AuthPage = () => {
  const { login, register, authError, isSubmitting } = useAuth();
  const { addToast } = useUsers();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';

    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (mode === 'register') {
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

    if (mode === 'login') {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        addToast(`Welcome back, ${res.user?.name || 'User'}!`, 'success', 'Login Successful');
      }
    } else {
      const res = await register(formData);
      if (res.success) {
        addToast(`Account created successfully! Welcome ${res.user?.name}.`, 'success', 'Account Created');
      }
    }
  };

  const fillDemoLogin = () => {
    setFormData(prev => ({
      ...prev,
      email: 'admin@example.com',
      password: 'password123'
    }));
    setValidationErrors({});
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-main)',
      background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1), transparent 60%), var(--bg-main)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.08)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(6, 182, 212, 0.08)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Card Container */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-muted)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.1)',
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        zIndex: 10,
        animation: 'fadeIn 0.4s ease-out'
      }}>
        
        {/* Header Header Brand */}
        <div style={{
          padding: '32px 32px 24px',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px var(--accent-glow)',
            marginBottom: '16px'
          }}>
            <Shield size={30} color="#FFFFFF" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Admin Management
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: 0 }}>
            {mode === 'login' ? 'Welcome back! Sign in to access your dashboard' : 'Create a new admin account to get started'}
          </p>

          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex',
            marginTop: '24px',
            backgroundColor: 'var(--bg-input)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setValidationErrors({}); }}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: mode === 'login' ? 'var(--accent-primary)' : 'transparent',
                color: mode === 'login' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: mode === 'login' ? '0 4px 12px var(--accent-glow)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <LogIn size={16} />
              Login
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setValidationErrors({}); }}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: mode === 'register' ? 'var(--accent-primary)' : 'transparent',
                color: mode === 'register' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: mode === 'register' ? '0 4px 12px var(--accent-glow)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <UserPlus size={16} />
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '28px 32px 32px' }}>

          {/* Global Backend Auth Error */}
          {authError && (
            <div style={{
              marginBottom: '20px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-danger-bg)',
              border: '1px solid var(--accent-danger)',
              color: 'var(--accent-danger)',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          {/* Register: Full Name */}
          {mode === 'register' && (
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className={`form-input ${validationErrors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {validationErrors.name && <span className="field-error">{validationErrors.name}</span>}
            </div>
          )}

          {/* Email Address */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
          </div>

          {/* Register: Department & Phone */}
          {mode === 'register' && (
            <>
              <div className="form-group" style={{ marginBottom: '18px' }}>
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

              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label">Phone Number (Optional)</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="text"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              {mode === 'login' && (
                <button 
                  type="button" 
                  onClick={fillDemoLogin}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={12} />
                  Demo Credentials
                </button>
              )}
            </div>
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
          {mode === 'register' && (
            <div className="form-group" style={{ marginBottom: '22px' }}>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-primary-hover))',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 8px 20px var(--accent-glow)',
              transition: 'all 0.2s ease',
              marginTop: mode === 'login' ? '12px' : '0'
            }}
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : mode === 'login' ? (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <span>Create Account</span>
                <CheckCircle size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div style={{
          padding: '16px 32px',
          backgroundColor: 'var(--bg-main)',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          Protected by Token-Based Authentication (Laravel Sanctum API)
        </div>

      </div>
    </div>
  );
};
