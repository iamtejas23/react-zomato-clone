import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';
import { useApp } from '../../../context/AppContext';
import './Toast.css';

const ICONS = {
  success: FiCheckCircle,
  error:   FiAlertCircle,
  info:    FiInfo,
  warning: FiAlertTriangle,
};

const Toast = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="toast-container" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map(toast => {
        const Icon = ICONS[toast.type] || FiInfo;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`} role="alert">
            <Icon className="toast__icon" size={18} aria-hidden="true" />
            <p className="toast__message">{toast.message}</p>
            <button
              className="toast__close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <FiX size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
