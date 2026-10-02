import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  AlertCircle,
  ChevronDown,
  Sun,
  Moon,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';

export const SignupPage = () => {
  const { register, authError, isSubmitting, isAuthenticated, loading, theme, toggleTheme } = useAuth();
  const { addToast } = useUsers();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    password: '',
    password_confirmation: '',
    agreeTerms: false,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const isDark = theme === 'dark';

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name) {
      errs.name = 'Full name is required';
    }

    if (!formData.email) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.password_confirmation) {
      errs.password_confirmation = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the terms and conditions';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await register(formData);
    if (res.success) {
      addToast(`Account created successfully! Welcome ${res.user?.name}.`, 'success', 'Account Created');
      navigate('/dashboard');
    }
  };

  return (
    <div className="signup-page-wrapper" style={{
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
      
      {/* Responsive Media Query Styles */}
      <style>{`
        .auth-split-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .left-promo-panel {
          display: flex;
        }
        @media (max-width: 960px) {
          .auth-split-container {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            min-height: auto !important;
          }
          .left-promo-panel {
            display: none !important;
          }
          .right-form-panel {
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

        {/* LEFT PANEL - DARK PROMOTIONAL SIDE */}
        <div className="left-promo-panel" style={{
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

          {/* Center Content & Graphic Mockup */}
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
              Join the <br />
              <span style={{ fontWeight: '400' }}>platform today</span>
            </h1>

            {/* Mobile Device Graphic Mockup */}
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
                <span style={{ fontSize: '0.7rem', color: '#888' }}>Enterprise Access</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  Quick Onboarding
                </div>
              </div>

              {/* Graphic Feature Cards */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '0 4px'
              }}>
                <div style={{ backgroundColor: '#110f0e', padding: '10px', borderRadius: '12px', border: '1px solid #282321', textAlign: 'left', fontSize: '0.75rem', color: '#eee' }}>
                  ✓ Instant Token Access
                </div>
                <div style={{ backgroundColor: '#110f0e', padding: '10px', borderRadius: '12px', border: '1px solid #282321', textAlign: 'left', fontSize: '0.75rem', color: '#eee' }}>
                  ✓ Granular Role Control
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

          {/* Left Footer Icon */}
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

        {/* RIGHT PANEL - CLEAN SIGNUP FORM SIDE */}
        <div className="right-form-panel" style={{
          backgroundColor: isDark ? '#1E1B1A' : '#FFFFFF',
          borderRadius: '32px',
          padding: '44px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: isDark ? '#F8FAFC' : '#1A1A1A',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Top Bar: Brand Logo + Theme Toggle + Sign In Link */}
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

            {/* Right Action Controls: Theme Toggle & Sign In Link */}
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
                  minHeight: '44px',
                  minWidth: '44px',
                  justifyContent: 'center'
                }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link
                to="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isDark ? '#F1F5F9' : '#444444',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  minHeight: '44px'
                }}
              >
                <LogIn size={18} />
                <span>Sign In</span>
              </Link>
            </div>

          </div>

          {/* Form Content */}
          <div style={{ margin: 'auto 0', maxWidth: '440px', width: '100%', alignSelf: 'center' }}>
            
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: isDark ? '#FFFFFF' : '#111111',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Create your account
            </h2>

            {/* Error Notification */}
            {authError && (
              <div role="alert" style={{
                marginBottom: '16px',
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

            <form onSubmit={handleSubmit} noValidate>
              
              {/* Full Name */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="signup-name" style={{ display: 'none' }}>Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.name}
                  aria-describedby={validationErrors.name ? "signup-name-error" : undefined}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '24px',
                    border: validationErrors.name ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    padding: '0 20px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    color: isDark ? '#F8FAFC' : '#1E293B',
                    backgroundColor: isDark ? '#292524' : '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                />
                {validationErrors.name && (
                  <span id="signup-name-error" style={{ fontSize: '0.78rem', color: '#FF4D4F', marginTop: '3px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="signup-email" style={{ display: 'none' }}>Email Address</label>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? "signup-email-error" : undefined}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '24px',
                    border: validationErrors.email ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    padding: '0 20px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    color: isDark ? '#F8FAFC' : '#1E293B',
                    backgroundColor: isDark ? '#292524' : '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                />
                {validationErrors.email && (
                  <span id="signup-email-error" style={{ fontSize: '0.78rem', color: '#FF4D4F', marginTop: '3px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.email}
                  </span>
                )}
              </div>

              {/* Department Selector */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="signup-department" style={{ display: 'none' }}>Department</label>
                <select
                  id="signup-department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '24px',
                    border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    padding: '0 20px',
                    fontSize: '0.92rem',
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

              {/* Password */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="signup-password" style={{ display: 'none' }}>Password</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-invalid={!!validationErrors.password}
                    aria-describedby={validationErrors.password ? "signup-password-error" : undefined}
                    style={{
                      width: '100%',
                      height: '48px',
                      borderRadius: '24px',
                      border: validationErrors.password ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                      padding: '0 46px 0 20px',
                      fontSize: '0.92rem',
                      outline: 'none',
                      color: isDark ? '#F8FAFC' : '#1E293B',
                      backgroundColor: isDark ? '#292524' : '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '6px',
                      minHeight: '44px',
                      minWidth: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <span id="signup-password-error" style={{ fontSize: '0.78rem', color: '#FF4D4F', marginTop: '3px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="signup-confirm-password" style={{ display: 'none' }}>Confirm Password</label>
                <input
                  id="signup-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.password_confirmation}
                  aria-describedby={validationErrors.password_confirmation ? "signup-confirm-error" : undefined}
                  style={{
                    width: '100%',
                    height: '48px',
                    borderRadius: '24px',
                    border: validationErrors.password_confirmation ? '1.5px solid #FF4D4F' : isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                    padding: '0 20px',
                    fontSize: '0.92rem',
                    outline: 'none',
                    color: isDark ? '#F8FAFC' : '#1E293B',
                    backgroundColor: isDark ? '#292524' : '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                />
                {validationErrors.password_confirmation && (
                  <span id="signup-confirm-error" style={{ fontSize: '0.78rem', color: '#FF4D4F', marginTop: '3px', display: 'block', paddingLeft: '16px' }}>
                    {validationErrors.password_confirmation}
                  </span>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: isDark ? '#CBD5E1' : '#475569' }}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: '#FF5722', cursor: 'pointer' }}
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
                {validationErrors.agreeTerms && (
                  <span style={{ fontSize: '0.78rem', color: '#FF4D4F', marginTop: '3px', display: 'block', paddingLeft: '4px' }}>
                    {validationErrors.agreeTerms}
                  </span>
                )}
              </div>

              {/* Primary Gradient CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '25px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #FF4500 0%, #FF6B00 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.98rem',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 25px rgba(255, 69, 0, 0.35)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                {isSubmitting ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Bottom Login Navigation Link */}
              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.88rem', color: isDark ? '#94A3B8' : '#64748B' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#FF5722', fontWeight: 600, textDecoration: 'none' }}>
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: isDark ? '#64748B' : '#94A3B8',
            paddingTop: '16px',
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
