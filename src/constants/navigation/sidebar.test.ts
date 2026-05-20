import { describe, expect, it } from 'vitest';
import { pathnameToSidebarId } from './sidebar';

describe('pathnameToSidebarId', () => {
  it('ルートは home', () => {
    expect(pathnameToSidebarId('/')).toBe('home');
  });

  it('第1セグメントで選択', () => {
    expect(pathnameToSidebarId('/settings')).toBe('settings');
    expect(pathnameToSidebarId('/docs/guide')).toBe('docs');
  });
});
