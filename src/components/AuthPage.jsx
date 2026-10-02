import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Building, 
  Phone, 
  AlertCircle,
  ChevronDown,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

export const AuthPage = ({ initialMode = 'login' }) => {
  const { login, register, authError, isSubmitting, isAuthenticated, loading, theme, toggleTheme } = useAuth();
  const { addToast } = useUsers();
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
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

  const isDark = theme === 'dark';

  // If already logged in, redirect to protected dashboard
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email or username is required';
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
        navigate('/dashboard');
      }
    } else {
      const res = await register(formData);
      if (res.success) {
        addToast(`Account created successfully! Welcome ${res.user?.name}.`, 'success', 'Account Created');
        navigate('/dashboard');
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
    <div className="auth-page-wrapper" style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: isDark ? '#1E1B1A' : '#E2E8F0',
      background: isDark 
        ? 'linear-gradient(135deg, #2A2422 0%, #161313 100%)' 
        : 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      boxSizing: 'border-box'
    }}>
      
      {/* Inject Responsive CSS Styles */}
      <style>{`
        .auth-split-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .left-auth-panel {
          display: flex;
        }
        @media (max-width: 960px) {
          .auth-split-container {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            min-height: auto !important;
          }
          .left-auth-panel {
            display: none !important;
          }
          .right-auth-panel {
            padding: 36px 28px !important;
            border-radius: 28px !important;
          }
        }
      `}</style>

      {/* Main Split-Screen Container */}
      <div className="auth-split-container" style={{
        width: '100%',
        maxWidth: '1200px',
        minHeight: '680px',
        backgroundColor: isDark ? '#181514' : '#FFFFFF',
        borderRadius: '32px',
        boxShadow: isDark ? '0 30px 60px rgba(0, 0, 0, 0.55)' : '0 20px 40px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>

        {/* LEFT PANEL - DARK SHOWCASE SIDE (INSPIRED BY REFERENCE IMAGE) */}
        <div className="left-auth-panel" style={{
          padding: '48px 56px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          backgroundColor: '#161313',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}>
          {/* Top Tagline */}
          <div style={{
            fontSize: '0.85rem',
            color: '#a39b98',
            letterSpacing: '0.01em',
            fontWeight: 400
          }}>
            Global management made simple – online solutions for you.
          </div>

          {/* Center Content & Graphic */}
          <div style={{ margin: '30px 0 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <h1 style={{
              fontSize: '3.4rem',
              fontWeight: '700',
              color: '#ffffff',
              lineHeight: '1.08',
              letterSpacing: '-0.03em',
              marginBottom: '28px',
              textAlign: 'center'
            }}>
              Manage <br />
              <span style={{ fontWeight: '400' }}>your system</span>
            </h1>

            {/* Mobile / Graphic Card Preview Mockup */}
            <div style={{
              width: '250px',
              height: '330px',
              margin: '0 auto',
              backgroundColor: '#1d1918',
              borderRadius: '36px',
              border: '4px solid #332d2a',
              padding: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(255,255,255,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Notch */}
              <div style={{
                width: '70px',
                height: '14px',
                backgroundColor: '#0d0b0b',
                borderRadius: '10px',
                margin: '0 auto 12px'
              }} />

              {/* Card Mini Header */}
              <div style={{ textAlign: 'left', padding: '0 8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#888' }}>Week 4 - 10 July</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  $14,897.00
                </div>
              </div>

              {/* Chart Mockup */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '85px',
                padding: '0 8px',
                gap: '6px'
              }}>
                {[40, 65, 30, 90, 75, 50, 85].map((h, idx) => (
                  <div key={idx} style={{
                    width: '12%',
                    height: `${h}%`,
                    backgroundColor: idx === 3 ? '#FF4500' : '#2d2725',
                    borderRadius: '4px'
                  }} />
                ))}
              </div>

              {/* Dark Sub-cards */}
              <div style={{
                backgroundColor: '#110f0e',
                borderRadius: '16px',
                padding: '12px',
                textAlign: 'left',
                border: '1px solid #282321'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#aaa' }}>
                  <span>Active Users</span>
                  <span style={{ color: '#FF5722', fontWeight: 600 }}>+24.5%</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                  2,840 Active
                </div>
              </div>

              {/* Multi-color Circle Logo Icon */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'conic-gradient(#FF4500 0deg 90deg, #FFD700 90deg 180deg, #00E5FF 180deg 270deg, #D500F9 270deg 360deg)',
                margin: '0 auto',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#181514' }} />
              </div>
            </div>

          </div>

          {/* Left Footer Accessibility Icon */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1.5px solid #ff5722',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff5722',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              🚹
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - CLEAN FORM SIDE (MATCHES INSPIRATION) */}
        <div className="right-auth-panel" style={{
          backgroundColor: isDark ? '#1E1B1A' : '#FFFFFF',
          borderRadius: '32px',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: isDark ? '#F8FAFC' : '#1A1A1A',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Top Bar: Brand Logo + Theme Toggle + Switch Mode Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'conic-gradient(#FF4500 0deg 90deg, #FFB300 90deg 180deg, #00E5FF 180deg 270deg, #E040FB 270deg 360deg)',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: isDark ? '#1E1B1A' : '#FFFFFF' }} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: isDark ? '#FFFFFF' : '#111111', letterSpacing: '-0.02em' }}>
                AdminPulse
              </span>
            </div>

            {/* Right Action Icons: Theme Toggle + Mode Switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                onClick={toggleTheme}
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#CBD5E1' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                  borderRadius: '50%',
                  transition: 'background-color 0.2s'
                }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextMode = mode === 'login' ? 'register' : 'login';
                  setMode(nextMode);
                  setValidationErrors({});
                  navigate(nextMode === 'login' ? '/login' : '/signup');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isDark ? '#F1F5F9' : '#444444',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'color 0.2s ease'
                }}
              >
                {mode === 'login' ? (
                  <>
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Form Content */}
          <div style={{ margin: 'auto 0', maxWidth: '440px', width: '100%', alignSelf: 'center' }}>
            
            <h2 style={{
              fontSize: '2.4rem',
              fontWeight: '700',
              color: isDark ? '#FFFFFF' : '#111111',
              marginBottom: '28px',
              letterSpacing: '-0.02em'
            }}>
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </h2>

            {/* Error Notification */}
            {authError && (
              <div style={{
                marginBottom: '20px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FFF1F0',
                border: `1px solid ${isDark ? '#EF4444' : '#FFCCC7'}`,
                color: isDark ? '#FCA5A5' : '#FF4D4F',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* Register: Full Name */}
              {mode === 'register' && (
                <div style={{ marginBottom: '18px' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '26px',
                      border: validationErrors.name ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                      padding: '0 24px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      color: isDark ? '#F8FAFC' : '#1E293B',
                      backgroundColor: isDark ? '#292524' : '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  />
                  {validationErrors.name && (
                    <span style={{ fontSize: '0.8rem', color: '#FF4D4F', marginTop: '4px', display: 'block', paddingLeft: '16px' }}>
                      {validationErrors.name}
                    </span>
                  )}
                </div>
              )}

              {/* Email / Username Field */}
              <div style={{ marginBottom: '18px' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email or Username"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: '52px',
                    borderRadius: '26px',
                    border: validationErrors.email ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    padding: '0 24px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: isDark ? '#F8FAFC' : '#1E293B',
                    backgroundColor: isDark ? '#292524' : '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                />
                {validationErrors.email && (
                  <span style={{ fontSize: '0.8rem', color: '#FF4D4F', marginTop: '4px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.email}
                  </span>
                )}
              </div>

              {/* Register: Department */}
              {mode === 'register' && (
                <div style={{ marginBottom: '18px' }}>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '26px',
                      border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                      padding: '0 24px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      color: isDark ? '#F8FAFC' : '#1E293B',
                      backgroundColor: isDark ? '#292524' : '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Engineering">Engineering Department</option>
                    <option value="Product">Product Management</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales & Business</option>
                  </select>
                </div>
              )}

              {/* Password Field */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '26px',
                      border: validationErrors.password ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                      padding: '0 50px 0 24px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      color: isDark ? '#F8FAFC' : '#1E293B',
                      backgroundColor: isDark ? '#292524' : '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <span style={{ fontSize: '0.8rem', color: '#FF4D4F', marginTop: '4px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.password}
                  </span>
                )}
              </div>

              {/* Register: Confirm Password */}
              {mode === 'register' && (
                <div style={{ marginBottom: '18px' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      height: '52px',
                      borderRadius: '26px',
                      border: validationErrors.password_confirmation ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                      padding: '0 24px',
                      fontSize: '0.95rem',
                      outline: 'none',
                      color: isDark ? '#F8FAFC' : '#1E293B',
                      backgroundColor: isDark ? '#292524' : '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  />
                  {validationErrors.password_confirmation && (
                    <span style={{ fontSize: '0.8rem', color: '#FF4D4F', marginTop: '4px', display: 'block', paddingLeft: '16px' }}>
                      {validationErrors.password_confirmation}
                    </span>
                  )}
                </div>
              )}

              {/* Forgot Password Link & Demo Credentials Helper */}
              {mode === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '0 4px' }}>
                  <button
                    type="button"
                    onClick={fillDemoLogin}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6366F1',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: 0
                    }}
                  >
                    <Sparkles size={14} />
                    Fill Demo Credentials
                  </button>

                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert('Demo: Use email admin@example.com / password123'); }}
                    style={{
                      color: '#FF5722',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '52px',
                  borderRadius: '26px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #FF4500 0%, #FF6B00 100%)',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 25px rgba(255, 69, 0, 0.35)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  marginTop: mode === 'register' ? '8px' : '0'
                }}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : mode === 'login' ? (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: isDark ? '#64748B' : '#94A3B8',
            paddingTop: '20px',
            borderTop: isDark ? '1px solid #292524' : '1px solid #F1F5F9'
          }}>
            <span>© 2026 AdminPulse Inc.</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="#contact" onClick={(e) => e.preventDefault()} style={{ color: isDark ? '#94A3B8' : '#64748B', textDecoration: 'none' }}>
                Contact Us
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <span>English</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
