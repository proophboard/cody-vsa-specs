import { describe, expect, it, beforeEach } from 'vitest';
import { toJSON, fromJSON } from './json.js';
import type { VsaContext } from '../vsa-cody-config.js';
import { SyncedNodesMap } from './synced-nodes-map.js';
import { CodyIgnoreAwareTree } from './fs-tree.js';

const createMockCtx = (disableJsonWithComments: boolean = false): VsaContext => ({
  chaptersFolder: '/',
  defaultSystemName: 'TestSystem',
  boardId: '12345',
  syncedNodes: new SyncedNodesMap('TestSystem'),
  tree: () => new CodyIgnoreAwareTree(process.cwd(), true),
  disableJsonWithComments,
});

describe('toJSON', () => {
  it('should stringify object with standard JSON when comments disabled', () => {
    const ctx = createMockCtx(true);
    const obj = { name: 'test', value: 123 };

    const result = toJSON(ctx, obj);

    expect(result).toBe('{"name":"test","value":123}');
  });

  it('should stringify object with pretty printing', () => {
    const ctx = createMockCtx(true);
    const obj = { name: 'test', value: 123 };

    const result = toJSON(ctx, obj, null, 2);

    expect(result).toContain('\n');
    expect(result).toContain('  ');
  });

  it('should handle null values', () => {
    const ctx = createMockCtx(true);
    const obj = { name: null };

    const result = toJSON(ctx, obj);

    expect(result).toBe('{"name":null}');
  });

  it('should handle arrays', () => {
    const ctx = createMockCtx(true);
    const arr = [1, 2, 3];

    const result = toJSON(ctx, arr);

    expect(result).toBe('[1,2,3]');
  });

  it('should use comment-json stringify when comments enabled', () => {
    const ctx = createMockCtx(false);
    const obj = { name: 'test' };

    const result = toJSON(ctx, obj);

    // comment-json produces valid JSON output
    expect(JSON.parse(result)).toEqual(obj);
  });
});

describe('fromJSON', () => {
  it('should parse valid JSON string', () => {
    const json = '{"name":"test","value":123}';

    const result = fromJSON(json);

    expect(result).toEqual({ name: 'test', value: 123 });
  });

  it('should parse JSON with comments using comment-json', () => {
    const json = `{
      // This is a comment
      "name": "test",
      /* Block comment */
      "value": 123
    }`;

    const result = fromJSON(json);

    expect(result).toEqual({ name: 'test', value: 123 });
  });

  it('should parse arrays', () => {
    const json = '[1,2,3]';

    const result = fromJSON(json);

    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle null', () => {
    const json = 'null';

    const result = fromJSON(json);

    expect(result).toBeNull();
  });
});
