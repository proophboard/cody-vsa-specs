import { describe, expect, it } from 'vitest';
import {
  definitionIdFromFQCN,
  fqcnFromDefinitionId,
  nodeLabel,
  systemNameFromFQCN
} from './definition-id.js';

describe('definitionIdFromFQCN', () => {
  it('should convert FQCN to definition ID', () => {
    const result = definitionIdFromFQCN('MySystem.App.User');
    expect(result).toBe('/definitions/my-system/app/user');
  });

  it('should handle single part FQCN', () => {
    const result = definitionIdFromFQCN('User');
    expect(result).toBe('/definitions/user');
  });

  it('should handle complex FQCN', () => {
    const result = definitionIdFromFQCN('MySystem.MyApp.MyModule.UserProfile');
    expect(result).toBe('/definitions/my-system/my-app/my-module/user-profile');
  });
});

describe('fqcnFromDefinitionId', () => {
  it('should convert definition ID to FQCN', () => {
    const result = fqcnFromDefinitionId('/definitions/my-system/app/user');
    expect(result).toBe('MySystem.App.User');
  });

  it('should handle single part definition ID', () => {
    const result = fqcnFromDefinitionId('/definitions/user');
    expect(result).toBe('User');
  });

  it('should handle complex definition ID', () => {
    const result = fqcnFromDefinitionId('/definitions/my-system/my-app/my-module/user-profile');
    expect(result).toBe('MySystem.MyApp.MyModule.UserProfile');
  });

  it('should be inverse of definitionIdFromFQCN', () => {
    const fqcn = 'MySystem.App.UserProfile';
    const definitionId = definitionIdFromFQCN(fqcn);
    const resultFqcn = fqcnFromDefinitionId(definitionId);

    expect(resultFqcn).toBe(fqcn);
  });
});

describe('nodeLabel', () => {
  it('should extract label from FQCN', () => {
    const result = nodeLabel('MySystem.App.User');
    expect(result).toBe('User');
  });

  it('should convert to title case', () => {
    const result = nodeLabel('MySystem.App.UserProfile');
    expect(result).toBe('User Profile');
  });

  it('should handle single part FQCN', () => {
    const result = nodeLabel('User');
    expect(result).toBe('User');
  });

  it('should return empty string for empty FQCN', () => {
    const result = nodeLabel('');
    expect(result).toBe('');
  });
});

describe('systemNameFromFQCN', () => {
  it('should extract system name from FQCN', () => {
    const result = systemNameFromFQCN('MySystem.App.User');
    expect(result).toBe('MySystem');
  });

  it('should handle single part FQCN', () => {
    const result = systemNameFromFQCN('MySystem');
    expect(result).toBe('MySystem');
  });

  it('should return empty string for empty FQCN', () => {
    const result = systemNameFromFQCN('');
    expect(result).toBe('');
  });

  it('should handle complex FQCN', () => {
    const result = systemNameFromFQCN('MySystem.MyApp.MyModule.User');
    expect(result).toBe('MySystem');
  });
});
