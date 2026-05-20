import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('結合する', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('falsy を除外する', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });
});
