import { describe, expect, it } from 'vitest';
import { names } from './names.js';

describe('names', () => {
  it('should convert a simple string to all name formats', () => {
    const result = names('user');

    expect(result.name).toBe('user');
    expect(result.className).toBe('User');
    expect(result.propertyName).toBe('user');
    expect(result.constantName).toBe('USER');
    expect(result.fileName).toBe('user');
  });

  it('should convert a multi-word string to all name formats', () => {
    const result = names('user profile');

    expect(result.name).toBe('user profile');
    expect(result.className).toBe('UserProfile');
    expect(result.propertyName).toBe('userProfile');
    expect(result.constantName).toBe('USER_PROFILE');
    expect(result.fileName).toBe('user-profile');
  });

  it('should convert a kebab-case string to all name formats', () => {
    const result = names('user-profile-data');

    expect(result.name).toBe('user-profile-data');
    expect(result.className).toBe('UserProfileData');
    expect(result.propertyName).toBe('userProfileData');
    expect(result.constantName).toBe('USER_PROFILE_DATA');
    expect(result.fileName).toBe('user-profile-data');
  });

  it('should convert a camelCase string to all name formats', () => {
    const result = names('userProfileData');

    expect(result.name).toBe('userProfileData');
    expect(result.className).toBe('UserProfileData');
    expect(result.propertyName).toBe('userProfileData');
    expect(result.constantName).toBe('USER_PROFILE_DATA');
    expect(result.fileName).toBe('user-profile-data');
  });

  it('should convert a snake_case string to all name formats', () => {
    const result = names('user_profile_data');

    expect(result.name).toBe('user_profile_data');
    expect(result.className).toBe('UserProfileData');
    expect(result.propertyName).toBe('userProfileData');
    expect(result.constantName).toBe('USER_PROFILE_DATA');
    expect(result.fileName).toBe('user-profile-data');
  });

  it('should handle PascalCase strings', () => {
    const result = names('UserProfile');

    expect(result.name).toBe('UserProfile');
    expect(result.className).toBe('UserProfile');
    expect(result.propertyName).toBe('userProfile');
    expect(result.constantName).toBe('USER_PROFILE');
    expect(result.fileName).toBe('user-profile');
  });

  it('should handle single character strings', () => {
    const result = names('a');

    expect(result.name).toBe('a');
    expect(result.className).toBe('A');
    expect(result.propertyName).toBe('a');
    expect(result.constantName).toBe('A');
    expect(result.fileName).toBe('a');
  });

  it('should handle strings with numbers', () => {
    const result = names('user123Profile');

    expect(result.name).toBe('user123Profile');
    expect(result.className).toBe('User123Profile');
    expect(result.propertyName).toBe('user123Profile');
    expect(result.constantName).toBe('USER_123_PROFILE');
    expect(result.fileName).toBe('user-123-profile');
  });
});
