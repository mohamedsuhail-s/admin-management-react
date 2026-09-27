import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUsers();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={20} color="var(--accent-success)" />;
      case 'danger': return <XCircle size={20} color="var(--accent-danger)" />;
      case 'warning': return <AlertCircle size={20} color="var(--accent-warning)" />;
      default: return <Info size={20} color="var(--accent-info)" />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {getIcon(toast.type)}
          <div className="toast-content" style={{ flex: 1 }}>
            {toast.title && <h5>{toast.title}</h5>}
            <p>{toast.message}</p>
          </div>
          <button 
            onClick={() => removeToast(toast.id)} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
