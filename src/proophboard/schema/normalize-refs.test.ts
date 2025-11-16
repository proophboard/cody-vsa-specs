// src/proophboard/schema/normalize-refs.test.ts
import { describe, expect, it } from 'vitest';
import { normalizeRefs, visitRef } from './normalize-refs.js';
import type { JSONSchema7 } from 'json-schema';

describe('normalizeRefs', () => {
  it('should normalize simple ref with default system', () => {
    const schema: JSONSchema7 = {
      $ref: '/definitions/User'
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(result.$ref).toBe('/definitions/my-system/user');
  });

  it('should normalize ref with existing system name', () => {
    const schema: JSONSchema7 = {
      $ref: '/definitions/App/User'
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(result.$ref).toBe('/definitions/my-system/app/user');
  });

  it('should normalize ref with hash prefix', () => {
    const schema: JSONSchema7 = {
      $ref: '#/definitions/User'
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(result.$ref).toBe('/definitions/my-system/user');
  });

  it('should normalize $id field', () => {
    const schema: JSONSchema7 = {
      $id: '/definitions/User',
      type: 'object'
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(result.$id).toBe('/definitions/my-system/user');
  });

  it('should normalize refs in nested properties', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        user: {
          $ref: '/definitions/User'
        }
      }
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect((result.properties!.user as JSONSchema7).$ref).toBe('/definitions/my-system/user');
  });

  it('should normalize refs in array items', () => {
    const schema: JSONSchema7 = {
      type: 'array',
      items: {
        $ref: '/definitions/User'
      }
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect((result.items as JSONSchema7).$ref).toBe('/definitions/my-system/user');
  });

  it('should handle property refs', () => {
    const schema: JSONSchema7 = {
      $ref: '/definitions/User:name'
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(result.$ref).toBe('/definitions/my-system/user:name');
  });

  it('should handle complex nested structures', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            $ref: '/definitions/User'
          }
        }
      }
    };

    const result = normalizeRefs(schema, 'MySystem');

    expect(((result.properties!.users as JSONSchema7).items as JSONSchema7).$ref)
      .toBe('/definitions/my-system/user');
  });
});

describe('visitRef', () => {
  it('should visit and transform $ref', () => {
    const schema: JSONSchema7 = {
      $ref: '/definitions/User'
    };

    const result = visitRef(schema, ref => ref.toUpperCase());

    expect(result.$ref).toBe('/DEFINITIONS/USER');
  });

  it('should visit and transform $id', () => {
    const schema: JSONSchema7 = {
      $id: '/definitions/User'
    };

    const result = visitRef(schema, ref => ref.toUpperCase());

    expect(result.$id).toBe('/DEFINITIONS/USER');
  });

  it('should visit refs in nested structures', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        user: {
          $ref: '/definitions/User'
        }
      }
    };

    const result = visitRef(schema, ref => ref.toUpperCase());

    expect((result.properties!.user as JSONSchema7).$ref).toBe('/DEFINITIONS/USER');
  });
});
