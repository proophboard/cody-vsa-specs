import { describe, expect, it } from 'vitest';
import { toSingular, toSingularItemName } from './to-singular.js';

describe('toSingular', () => {
  it('should convert plural to singular', () => {
    expect(toSingular('users')).toBe('user');
  });

  it('should convert complex plurals to singular', () => {
    expect(toSingular('categories')).toBe('category');
  });

  it('should handle irregular plurals', () => {
    expect(toSingular('children')).toBe('child');
  });

  it('should return singular if already singular', () => {
    expect(toSingular('user')).toBe('user');
  });

  it('should handle multi-word phrases', () => {
    expect(toSingular('user profiles')).toBe('user profile');
  });
});

describe('toSingularItemName', () => {
  it('should convert plural to singular', () => {
    expect(toSingularItemName('users')).toBe('user');
  });

  it('should add "Item" suffix when word is already singular', () => {
    expect(toSingularItemName('user')).toBe('userItem');
  });

  it('should convert plural multi-word phrases', () => {
    expect(toSingularItemName('user profiles')).toBe('user profile');
  });

  it('should add "Item" suffix for singular multi-word phrases', () => {
    const result = toSingularItemName('user profile');
    expect(result).toBe('user profileItem');
  });
});
