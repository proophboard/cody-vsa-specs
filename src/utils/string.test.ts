import { describe, expect, it } from 'vitest';
import { camelCaseToTitle, snakeCaseToCamelCase } from './string.js';

describe('camelCaseToTitle', () => {
  it('should convert camelCase to title case', () => {
    expect(camelCaseToTitle('userName')).toBe('User Name');
  });

  it('should convert PascalCase to title case', () => {
    expect(camelCaseToTitle('UserName')).toBe('User Name');
  });

  it('should handle single word', () => {
    expect(camelCaseToTitle('user')).toBe('User');
  });

  it('should handle multiple capital letters in sequence', () => {
    expect(camelCaseToTitle('HTTPRequest')).toBe('HTTP Request');
  });

  it('should handle numbers in the string', () => {
    expect(camelCaseToTitle('user123Name')).toBe('User 123 Name');
  });

  it('should handle empty string', () => {
    expect(camelCaseToTitle('')).toBe('');
  });

  it('should handle already spaced strings', () => {
    expect(camelCaseToTitle('user name')).toBe('User name');
  });
});

describe('snakeCaseToCamelCase', () => {
  it('should convert snake_case to camelCase', () => {
    expect(snakeCaseToCamelCase('user_name')).toBe('userName');
  });

  it('should handle single word', () => {
    expect(snakeCaseToCamelCase('user')).toBe('user');
  });

  it('should handle multiple underscores', () => {
    expect(snakeCaseToCamelCase('user_profile_data')).toBe('userProfileData');
  });

  it('should handle empty string', () => {
    expect(snakeCaseToCamelCase('')).toBe('');
  });

  it('should handle single character parts', () => {
    expect(snakeCaseToCamelCase('a_b_c')).toBe('aBC');
  });

  it('should handle UPPER_CASE', () => {
    expect(snakeCaseToCamelCase('USER_NAME')).toBe('uSERNAME');
  });

  it('should handle consecutive underscores', () => {
    expect(snakeCaseToCamelCase('user__name')).toBe('userName');
  });
});
