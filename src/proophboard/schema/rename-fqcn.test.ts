import { describe, expect, it } from 'vitest';
import { renameFQCN } from './rename-fqcn.js';

describe('renameFQCN', () => {
  it('should rename the type name in FQCN', () => {
    const result = renameFQCN('MySystem.App.User', 'Profile');
    expect(result).toBe('MySystem.App.Profile');
  });

  it('should handle single part FQCN', () => {
    const result = renameFQCN('User', 'Profile');
    expect(result).toBe('Profile');
  });

  it('should handle complex FQCN', () => {
    const result = renameFQCN('MySystem.MyApp.MyModule.User', 'UserProfile');
    expect(result).toBe('MySystem.MyApp.MyModule.UserProfile');
  });

  it('should convert new type name to class name format', () => {
    const result = renameFQCN('MySystem.App.User', 'user-profile');
    expect(result).toBe('MySystem.App.UserProfile');
  });

  it('should handle camelCase new type name', () => {
    const result = renameFQCN('MySystem.App.User', 'userProfile');
    expect(result).toBe('MySystem.App.UserProfile');
  });

  it('should handle snake_case new type name', () => {
    const result = renameFQCN('MySystem.App.User', 'user_profile');
    expect(result).toBe('MySystem.App.UserProfile');
  });
});
