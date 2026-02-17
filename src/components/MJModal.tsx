import React, { useState, useCallback, useEffect } from 'react';
import * as styles from './styles/MJModal.css';
import { MJTypography } from './MJTypography';
import { MJIconButton } from './MJIconButton';
import { MJButton } from './MJButton';
import { X } from 'lucide-react';

export interface MJModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  hasFooter: boolean;
  footerType: 'isOK' | 'hasCancelAndOK' | 'hasCancelAndSave';
  isCloseButtonEnabled: boolean;
}

export const MJModal: React.FC<MJModalProps> = ({ open, onClose, title, body, hasFooter, footerType, isCloseButtonEnabled}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (e.target !== e.currentTarget) return;
      if (isClosing) {
        setIsClosing(false);
        onClose();
      }
    },
    [isClosing, onClose],
  );

  useEffect(() => {
    if (!open) setIsClosing(false);
  }, [open]);

  if (!open) return null;

  const overlayClass = [styles.overlay, isClosing ? styles.overlayClosing : styles.overlayOpen]
    .filter(Boolean)
    .join(' ');
  const paperClass = [styles.paper, isClosing ? styles.paperClosing : styles.paperOpen]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={overlayClass}
      onAnimationEnd={handleAnimationEnd}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={paperClass} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span id="modal-title">
            <MJTypography variant="h3">{title}</MJTypography>
          </span>
          {isCloseButtonEnabled && (
            <MJIconButton
                icon={X}
                size="sm"
                variant="text"
                onClick={handleClose}
                aria-label="閉じる"
            />
          )}
        </div>
        <div className={styles.body}>{body}</div>
        {hasFooter 
            && 
            <div className={styles.footer}>
            {footerType === 'isOK' && (
              <MJButton
                label="OK"
                variant="primary"
                size="sm"
                onClick={handleClose}
              />
            )}
            {footerType === 'hasCancelAndOK' && (
              <>
                <MJButton
                  label="キャンセル"
                  variant="text"
                  size="sm"
                  onClick={handleClose}
                />
                <MJButton
                  label="OK"
                  variant="primary"
                  size="sm"
                  onClick={handleClose}
                />
              </>
            )}
            {footerType === 'hasCancelAndSave' && (
              <>
                <MJButton
                  label="キャンセル"
                  variant="text"
                  size="sm"
                  onClick={handleClose}
                />
                <MJButton
                  label="保存"
                  variant="primary"
                  size="sm"
                  onClick={handleClose}
                />
              </>
            )}
            </div>  
        }
      </div>
    </div>
  );
};