import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { computeMenuPosition, MENU_VIEWPORT_PADDING } from './menuPosition';

function rect(
  x: number,
  y: number,
  w: number,
  h: number,
): DOMRect {
  return {
    x,
    y,
    width: w,
    height: h,
    top: y,
    left: x,
    right: x + w,
    bottom: y + h,
  } as DOMRect;
}

const anchor = rect(100, 800, 200, 48);

beforeEach(() => {
  vi.stubGlobal('window', { innerWidth: 1280, innerHeight: 800 });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('computeMenuPosition', () => {
  it('右アンカーではメニューがアンカー左側に展開する', () => {
    const pos = computeMenuPosition(
      anchor,
      160,
      100,
      { vertical: 'top', horizontal: 'right' },
      { vertical: 'bottom', horizontal: 'right' },
    );
    expect(pos.translateX).toBe('translateX(-100%)');
    expect(pos.left).toBe(anchor.right);
    expect(pos.top + 100).toBeLessThanOrEqual(anchor.top);
  });

  it('ビューポート下端をはみ出す場合は上にクランプする', () => {
    const pos = computeMenuPosition(
      rect(50, 900, 200, 48),
      160,
      120,
      { vertical: 'top', horizontal: 'right' },
      { vertical: 'bottom', horizontal: 'right' },
    );
    expect(pos.top).toBeGreaterThanOrEqual(8);
    expect(pos.top + 120).toBeLessThanOrEqual(800 - MENU_VIEWPORT_PADDING);
  });
});
