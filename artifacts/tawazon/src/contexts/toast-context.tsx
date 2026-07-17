import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'xp';
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const COLORS: Record<Toast['type'], { bg: string; border: string; icon: string }> = {
  success: { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',   icon: '✅' },
  info:    { bg: 'rgba(0,240,255,0.10)',   border: 'rgba(0,240,255,0.30)',   icon: 'ℹ️' },
  warning: { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)',   icon: '⚠️' },
  xp:      { bg: 'rgba(180,77,255,0.12)', border: 'rgba(180,77,255,0.35)',   icon: '⚡' },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast stack — bottom-center */}
      <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column-reverse', gap: 10, alignItems: 'center', pointerEvents: 'none' }}>
        {toasts.map((toast, i) => {
          const c = COLORS[toast.type];
          return (
            <div
              key={toast.id}
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                backdropFilter: 'blur(16px)',
                borderRadius: 14,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'white',
                fontWeight: 600,
                fontSize: 14,
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                animation: 'toastIn 0.3s ease',
                fontFamily: 'inherit',
              }}
            >
              <span>{c.icon}</span>
              <span>{toast.message}</span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
