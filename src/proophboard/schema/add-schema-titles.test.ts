// add-schema-titles-spec.ts
import {describe, expect, it} from 'vitest';
import {mapPropertiesToTitles} from './add-schema-titles.js';
import type {JSONSchema7} from "json-schema";

describe('mapPropertiesToTitles', () => {
  it('should add a title derived from the property name if no title exists', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        my_property: {
          type: 'string',
        },
      },
    };

    const result = mapPropertiesToTitles(schema, 'my_property');

    expect(result.title).toBe('My Property');
    expect(result.properties).toBeDefined();
    expect((result.properties!['my_property']! as JSONSchema7).title).toBe('My Property');
  });

  it('should not overwrite existing titles', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      title: 'Existing Title',
      properties: {
        my_property: {
          type: 'string',
          title: 'Existing Property Title',
        },
      },
    };

    const result = mapPropertiesToTitles(schema);

    expect(result.title).toBe('Existing Title');
    expect(result.properties).toBeDefined();
    expect((result.properties!['my_property']! as JSONSchema7).title).toBe('Existing Property Title');
  });

  it('should recursively add titles to nested properties', () => {
    const schema: JSONSchema7 = {
      type: 'object',
      properties: {
        parent_property: {
          type: 'object',
          properties: {
            nested_property: {
              type: 'string',
            },
          },
        },
      },
    };

    const result = mapPropertiesToTitles(schema);

    expect((result.properties!['parent_property']! as JSONSchema7).title).toBe('Parent Property');
    expect(
      ((result.properties!['parent_property'] as JSONSchema7).properties![
        'nested_property'
        ] as JSONSchema7).title
    ).toBe('Nested Property');
  });

  it('should add titles to array items if no title exists', () => {
    const schema: JSONSchema7 = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          item_property: {
            type: 'string',
          },
        },
      },
    };

    const result = mapPropertiesToTitles(schema);

    expect(
      ((result.items as JSONSchema7).properties!['item_property'] as JSONSchema7)
        .title
    ).toBe('Item Property');
  });

  it('should handle schemas with no properties or items gracefully', () => {
    const schema: JSONSchema7 = {
      type: 'object',
    };

    const result = mapPropertiesToTitles(schema);

    expect(result).toEqual(schema);
  });
});
