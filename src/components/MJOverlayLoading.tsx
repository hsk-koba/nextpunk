import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import * as styles from './styles/MJOverlayLoading.css';
import { MJTypography } from './MJTypography';

interface OverlayContextValue {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const OverlayContext = createContext<OverlayContextValue | null>(null);

export interface MJOverlayLoadingProps {
  /** 表示メッセージ（省略時は非表示） */
  message?: string;
  /** 閉じるアニメーション中 */
  isClosing?: boolean;
  /** 閉じるアニメーション終了時（アンマウント用） */
  onCloseEnd?: () => void;
}

/** オーバーレイ上に表示するローディングUI */
export const MJOverlayLoading: React.FC<MJOverlayLoadingProps> = ({
  message: messageProp,
  isClosing = false,
  onCloseEnd,
}) => {
  const backdropClass = [
    styles.backdrop,
    isClosing ? styles.backdropClosing : styles.backdropOpen,
  ].join(' ');

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.target !== e.currentTarget) return;
    if (isClosing && onCloseEnd) onCloseEnd();
  };

  return (
    <div
      className={backdropClass}
      role="status"
      aria-live="polite"
      aria-label="読み込み中"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={styles.content}>
        <div className={styles.spinner} aria-hidden />
        {messageProp && <MJTypography variant="p" bold={true} className={styles.message}>{messageProp}</MJTypography>}
      </div>
    </div>
  );
};

export interface OverlayProviderProps {
  children: React.ReactNode;
}

/** 複数箇所から show/hide しても正しく動作するよう ref でカウント */
export const OverlayProvider: React.FC<OverlayProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [message, setMessage] = useState<string>('');
  const countRef = useRef(0);

  const showLoading = useCallback((msg?: string) => {
    countRef.current += 1;
    setMessage(msg ?? '');
    setIsClosing(false);
    setVisible(true);
  }, []);

  const hideLoading = useCallback(() => {
    if (countRef.current > 0) countRef.current -= 1;
    if (countRef.current === 0) setIsClosing(true);
  }, []);

  const handleCloseEnd = useCallback(() => {
    setVisible(false);
    setIsClosing(false);
  }, []);

  const api: OverlayContextValue = {
    showLoading,
    hideLoading,
  };

  return (
    <OverlayContext.Provider value={api}>
      {children}
      {visible && (
        <MJOverlayLoading
          message={message || undefined}
          isClosing={isClosing}
          onCloseEnd={handleCloseEnd}
        />
      )}
    </OverlayContext.Provider>
  );
};

export function useOverlay(): OverlayContextValue {
  const ctx = useContext(OverlayContext);
  if (!ctx) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return ctx;
}
