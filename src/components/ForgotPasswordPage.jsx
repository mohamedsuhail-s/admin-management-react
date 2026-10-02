import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound,
  AlertCircle,
  ChevronDown,
  Sun,
  Moon,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import api from '../api/axios';

export const ForgotPasswordPage = () => {
  const { isAuthenticated, loading, theme, toggleTheme } = useAuth();
  const userCtx = useUsers();
  const addToast = userCtx?.addToast || (() => {});
  const navigate = useNavigate();

  // Steps: 1 = Request OTP, 2 = Verify OTP, 3 = Reset Password
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  // Form Fields
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Resend OTP Countdown Timer
  const [countdown, setCountdown] = useState(0);

  const isDark = theme === 'dark';

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Step 1: Send OTP via Resend API
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await api.post('/forgot-password', { email });
      addToast(res.data.message || 'OTP verification code sent to your email.', 'success', 'OTP Sent');
      if (res.data.otp_debug) {
        setDebugOtp(res.data.otp_debug);
      }
      setStep(2);
      setCountdown(60);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to send OTP code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP via Resend Platform
  const handleResendOtp = async () => {
    if (countdown > 0 || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await api.post('/resend-otp', { email });
      addToast('A fresh OTP code has been sent via Resend to your email.', 'info', 'OTP Resent');
      if (res.data.otp_debug) {
        setDebugOtp(res.data.otp_debug);
      }
      setCountdown(60);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await api.post('/verify-otp', { email, otp });
      addToast(res.data.message || 'OTP verified successfully.', 'success', 'Verified');
      setStep(3);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid or expired OTP code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await api.post('/reset-password', {
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      });
      addToast(res.data.message || 'Password reset successfully! Please sign in.', 'success', 'Password Reset');
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-page-wrapper" style={{
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

        {/* LEFT PANEL - DARK SHOWCASE SIDE */}
        <div className="left-promo-panel" style={{
          padding: '48px 56px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          backgroundColor: '#161313',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#a39b98', letterSpacing: '0.01em', fontWeight: 400 }}>
            Global management made simple – online solutions for you.
          </div>

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
              Recover <br />
              <span style={{ fontWeight: '400' }}>your account</span>
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
              <div style={{ width: '70px', height: '14px', backgroundColor: '#0d0b0b', borderRadius: '10px', margin: '0 auto 12px' }} />

              <div style={{ textAlign: 'left', padding: '0 8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#888' }}>Resend Email OTP</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  Secure Recovery
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 4px' }}>
                <div style={{ backgroundColor: '#110f0e', padding: '10px', borderRadius: '12px', border: '1px solid #282321', textAlign: 'left', fontSize: '0.75rem', color: '#eee' }}>
                  🔒 6-Digit Encrypted OTP
                </div>
                <div style={{ backgroundColor: '#110f0e', padding: '10px', borderRadius: '12px', border: '1px solid #282321', textAlign: 'left', fontSize: '0.75rem', color: '#eee' }}>
                  📧 Delivered via Resend
                </div>
              </div>

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

        {/* RIGHT PANEL - FORGOT PASSWORD FORM SIDE */}
        <div className="right-form-panel" style={{
          backgroundColor: isDark ? '#1E1B1A' : '#FFFFFF',
          borderRadius: '32px',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: isDark ? '#F8FAFC' : '#1A1A1A',
          transition: 'all 0.3s ease'
        }}>
          
          {/* Top Bar: Brand Logo + Theme Toggle + Back to Login */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <ArrowLeft size={18} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>

          {/* Form Content Steps */}
          <div style={{ margin: 'auto 0', maxWidth: '440px', width: '100%', alignSelf: 'center' }}>
            
            {/* STEP 1: Enter Email */}
            {step === 1 && (
              <>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#111111', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  Forgot Password
                </h2>
                <p style={{ fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>
                  Enter your registered email address to receive a 6-digit OTP verification code via Resend.
                </p>

                {errorMsg && (
                  <div role="alert" style={{ marginBottom: '18px', padding: '12px 16px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FFF1F0', border: `1px solid ${isDark ? '#EF4444' : '#FFCCC7'}`, color: isDark ? '#FCA5A5' : '#FF4D4F', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRequestOtp}>
                  <div style={{ marginBottom: '20px' }}>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    />
                  </div>

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
                      boxShadow: '0 10px 25px rgba(255, 69, 0, 0.35)'
                    }}
                  >
                    {isSubmitting ? <span>Sending OTP...</span> : <span>Send OTP Verification Code</span>}
                  </button>
                </form>
              </>
            )}

            {/* STEP 2: Verify OTP Code */}
            {step === 2 && (
              <>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#111111', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  Verify Email OTP
                </h2>
                <p style={{ fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>
                  We sent a 6-digit code to <strong style={{ color: isDark ? '#FFF' : '#000' }}>{email}</strong>
                </p>

                {debugOtp && (
                  <div style={{ marginBottom: '16px', padding: '10px 14px', backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid #6366F1', borderRadius: '12px', color: '#6366F1', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} />
                    <span>Demo Mode OTP: <strong>{debugOtp}</strong></span>
                  </div>
                )}

                {errorMsg && (
                  <div role="alert" style={{ marginBottom: '18px', padding: '12px 16px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FFF1F0', border: `1px solid ${isDark ? '#EF4444' : '#FFCCC7'}`, color: isDark ? '#FCA5A5' : '#FF4D4F', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleVerifyOtp}>
                  <div style={{ marginBottom: '20px' }}>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-Digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      style={{
                        width: '100%',
                        height: '56px',
                        borderRadius: '28px',
                        border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                        padding: '0 24px',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        letterSpacing: '8px',
                        textAlign: 'center',
                        outline: 'none',
                        color: isDark ? '#F8FAFC' : '#1E293B',
                        backgroundColor: isDark ? '#292524' : '#FFFFFF',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

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
                      marginBottom: '16px'
                    }}
                  >
                    {isSubmitting ? <span>Verifying Code...</span> : <span>Verify OTP Code</span>}
                  </button>

                  <div style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={countdown > 0 || isSubmitting}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: countdown > 0 ? '#94A3B8' : '#FF5722',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RefreshCw size={14} />
                      {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP Email via Resend'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* STEP 3: Reset Password */}
            {step === 3 && (
              <>
                <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: isDark ? '#FFFFFF' : '#111111', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                  New Password
                </h2>
                <p style={{ fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#64748B', marginBottom: '20px', lineHeight: '1.5' }}>
                  OTP verified! Enter your new password below.
                </p>

                {errorMsg && (
                  <div role="alert" style={{ marginBottom: '18px', padding: '12px 16px', borderRadius: '12px', backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FFF1F0', border: `1px solid ${isDark ? '#EF4444' : '#FFCCC7'}`, color: isDark ? '#FCA5A5' : '#FF4D4F', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleResetPassword}>
                  <div style={{ marginBottom: '16px', position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        height: '50px',
                        borderRadius: '25px',
                        border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                        padding: '0 46px 0 24px',
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
                      style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm New Password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      style={{
                        width: '100%',
                        height: '50px',
                        borderRadius: '25px',
                        border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                        padding: '0 24px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        color: isDark ? '#F8FAFC' : '#1E293B',
                        backgroundColor: isDark ? '#292524' : '#FFFFFF',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

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
                      boxShadow: '0 10px 25px rgba(255, 69, 0, 0.35)'
                    }}
                  >
                    {isSubmitting ? <span>Updating Password...</span> : <span>Reset Password & Sign In</span>}
                  </button>
                </form>
              </>
            )}

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
