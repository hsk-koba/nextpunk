import React, { useState } from 'react';
import * as styles from './styles/MJAvatar.css';

export type MJAvatarSize = 'sm' | 'md' | 'lg';

export interface MJAvatarProps {
  /** 画像 URL（未指定または読み込み失敗時は initials を表示） */
  src?: string | null;
  alt?: string;
  /** 画像なし時に表示するテキスト（例: "田中" → "田"、"Taro Tanaka" → "TT"） */
  initials?: string;
  size?: MJAvatarSize;
  className?: string;
}

function getInitialsFromString(str: string, maxLength = 2): string {
  const trimmed = str.trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0] ?? '';
    const b = parts[parts.length - 1][0] ?? '';
    return (a + b).toUpperCase().slice(0, maxLength);
  }
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength);
}

export const MJAvatar: React.FC<MJAvatarProps> = ({
  src,
  alt = '',
  initials,
  size = 'md',
  className,
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(src && !imgError);

  const fallbackText = initials != null && initials !== ''
    ? getInitialsFromString(initials)
    : alt
      ? getInitialsFromString(alt)
      : '?';

  const rootClassName = [styles.root, styles.sizes[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName} role="img" aria-label={alt || fallbackText}>
      {showImage ? (
        <img
          src={src ?? ''}
          alt={alt}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className={[styles.fallback, styles.fallbackSizes[size]].join(' ')}
        >
          {fallbackText}
        </span>
      )}
    </span>
  );
};
