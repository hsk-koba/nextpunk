import type {
  MJMenuAnchorOrigin,
  MJMenuTransformOrigin,
} from '@/components/types/menu';

export const MENU_GAP = 4;
export const MENU_VIEWPORT_PADDING = 8;
/** メニュー未計測時の高さ見積もり */
export const MENU_ESTIMATED_HEIGHT = 120;

export interface MenuPosition {
  top: number;
  left: number;
  transformOriginX: string;
  transformOriginY: string;
  translateX: string;
}

function getOriginValue(h: 'left' | 'right' | 'center'): string {
  return h === 'center' ? '50%' : h === 'right' ? '100%' : '0';
}

function getVisualBounds(
  top: number,
  left: number,
  menuWidth: number,
  menuHeight: number,
  translateX: string,
) {
  const visualLeft =
    translateX === 'translateX(-100%)'
      ? left - menuWidth
      : translateX === 'translateX(-50%)'
        ? left - menuWidth / 2
        : left;
  return {
    visualLeft,
    visualTop: top,
    visualRight: visualLeft + menuWidth,
    visualBottom: top + menuHeight,
  };
}

/** アンカーとメニュー寸法からビューポート内に収まる fixed 位置を算出 */
export function computeMenuPosition(
  anchorRect: DOMRect,
  menuWidth: number,
  menuHeight: number,
  anchorOrigin: MJMenuAnchorOrigin,
  transformOrigin: MJMenuTransformOrigin,
): MenuPosition {
  const ah = anchorOrigin.horizontal;
  const av = anchorOrigin.vertical;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
  const pad = MENU_VIEWPORT_PADDING;

  let translateX = 'none';
  let top: number;
  let left: number;

  const placeAbove = () => {
    top = anchorRect.top - MENU_GAP - menuHeight;
  };
  const placeBelow = () => {
    top = anchorRect.bottom + MENU_GAP;
  };

  if (av === 'bottom') {
    placeBelow();
  } else {
    placeAbove();
  }

  if (ah === 'left') {
    left = anchorRect.left;
  } else if (ah === 'right') {
    left = anchorRect.right;
    translateX = 'translateX(-100%)';
  } else {
    left = anchorRect.left + anchorRect.width / 2;
    translateX = 'translateX(-50%)';
  }

  let bounds = getVisualBounds(top, left, menuWidth, menuHeight, translateX);

  // 縦方向: はみ出したら反対側へフリップ
  if (bounds.visualBottom > vh - pad && av === 'bottom') {
    placeAbove();
    bounds = getVisualBounds(top, left, menuWidth, menuHeight, translateX);
  }
  if (bounds.visualTop < pad && av === 'top') {
    placeBelow();
    bounds = getVisualBounds(top, left, menuWidth, menuHeight, translateX);
  }

  // 縦方向クランプ
  if (bounds.visualBottom > vh - pad) {
    top = vh - pad - menuHeight;
  }
  if (bounds.visualTop < pad) {
    top = pad;
  }

  bounds = getVisualBounds(top, left, menuWidth, menuHeight, translateX);

  // 横方向クランプ（translate を考慮して left を調整）
  if (bounds.visualRight > vw - pad) {
    left -= bounds.visualRight - (vw - pad);
  }
  if (bounds.visualLeft < pad) {
    left += pad - bounds.visualLeft;
  }

  // right アンカーで left が anchor より左に寄りすぎた場合
  bounds = getVisualBounds(top, left, menuWidth, menuHeight, translateX);
  if (bounds.visualLeft < pad && ah === 'right') {
    left = pad + menuWidth;
  }

  return {
    top,
    left,
    translateX,
    transformOriginX: getOriginValue(transformOrigin.horizontal),
    transformOriginY: transformOrigin.vertical === 'top' ? '0' : '100%',
  };
}
