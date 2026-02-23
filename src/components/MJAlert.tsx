import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { Info, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import * as styles from './styles/MJAlert.css';

export type AlertVariant = 'info' | 'success' | 'error' | 'warning';

export interface AlertItem {
  id: string;
  variant: AlertVariant;
  message: string;
  isClosing: boolean;
}

interface AlertContextValue {
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

const AUTO_DISMISS_MS = 4000;
const ICONS = {
  info: Info,
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
};

export interface MJAlertItemProps {
  item: AlertItem;
  onAnimationEnd: (id: string) => void;
}

export const MJAlertItem: React.FC<MJAlertItemProps> = ({
  item,
  onAnimationEnd,
}) => {
  const Icon = ICONS[item.variant];
  const wrapperClass = [
    styles.variantWrapper[item.variant],
    item.isClosing ? styles.alertWrapperClosing : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (e.target !== e.currentTarget) return;
      if (item.isClosing) onAnimationEnd(item.id);
    },
    [item.id, item.isClosing, onAnimationEnd],
  );

  return (
    <div
      className={wrapperClass}
      onAnimationEnd={handleAnimationEnd}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.alertInner}>
        <span className={styles.iconBox}>
          <Icon
            size={24}
            className={styles.variantIcon[item.variant]}
            aria-hidden
          />
        </span>
        <p className={styles.message}>{item.message}</p>
      </div>
    </div>
  );
};

let idCounter = 0;
function generateId() {
  idCounter += 1;
  return `alert-${idCounter}`;
}

export interface AlertProviderProps {
  children: React.ReactNode;
  autoDismissMs?: number;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({
  children,
  autoDismissMs = AUTO_DISMISS_MS,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    const t = timersRef.current.get(id);
    if (t) {
      clearTimeout(t);
      timersRef.current.delete(id);
    }
  }, []);

  const startClose = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isClosing: true } : a)),
    );
  }, []);

  const addAlert = useCallback(
    (variant: AlertVariant, message: string) => {
      const id = generateId();
      const item: AlertItem = {
        id,
        variant,
        message,
        isClosing: false,
      };
      setAlerts((prev) => [...prev, item]);

      const timer = setTimeout(() => {
        startClose(id);
      }, autoDismissMs);
      timersRef.current.set(id, timer);
    },
    [autoDismissMs, startClose],
  );

  const handleAnimationEnd = useCallback(
    (id: string) => {
      removeAlert(id);
    },
    [removeAlert],
  );

  const api: AlertContextValue = {
    showInfo: (message: string) => addAlert('info', message),
    showSuccess: (message: string) => addAlert('success', message),
    showError: (message: string) => addAlert('error', message),
    showWarning: (message: string) => addAlert('warning', message),
  };

  return (
    <AlertContext.Provider value={api}>
      {children}
      <div className={styles.container} aria-label="Notifications">
        {alerts.map((item) => (
          <MJAlertItem
            key={item.id}
            item={item}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export function useAlert(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return ctx;
}