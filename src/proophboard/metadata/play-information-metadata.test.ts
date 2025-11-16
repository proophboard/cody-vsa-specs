// play-information-metadata-spec.ts
import {describe, expect, it} from 'vitest';
import {
  type PlayInformationMetadata,
  playInformationMetadata,
  type RawInformationMeta
} from './play-information-metadata.js';
import type {VsaContext} from "../../vsa-cody-config.js";
import {SyncedNodesMap} from "../../utils/synced-nodes-map.js";
import {CodyIgnoreAwareTree} from "../../utils/fs-tree.js";

const mockCtx: VsaContext = {
  chaptersFolder: "/",
  defaultSystemName: "TestSystem",
  boardId: "12345",
  syncedNodes: new SyncedNodesMap('TestSystem'),
  tree: () => new CodyIgnoreAwareTree(process.cwd(), true),
};

describe('playInformationMetadata', () => {
  it('should return a PlayInformationMetadata object with default values when meta is null', () => {
    const result = playInformationMetadata("TestLabel", "TestSystem.App.TestFQCN", null, mockCtx);
    expect(result).toHaveProperty('schema');
    expect(result).toHaveProperty('ns', '/');
    expect(result).toHaveProperty('service', 'TestSystem');
    expect((result as PlayInformationMetadata).schema).toHaveProperty('$id');
  });

  it('should use the provided ns value if meta.ns is defined', () => {
    const meta: RawInformationMeta = {
      schema: {},
      ns: '/custom-namespace/'
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx);
    expect(result).toHaveProperty('ns', '/custom-namespace/');
  });

  it('should append a trailing slash to ns if not present', () => {
    const meta: RawInformationMeta = {
      schema: {},
      ns: '/custom-namespace'
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx);
    expect(result).toHaveProperty('ns', '/custom-namespace/');
  });


  it('should properly resolve the schema and uiSchema values', () => {
    const meta: RawInformationMeta = {
      schema: {type: "object", properties: {name: {type: "string"}}},
      uiSchema: {"ui:order": ["name"]},
      shorthand: false
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result.schema).toHaveProperty('type', 'object');
    expect(result.uiSchema).toHaveProperty('ui:order');
  });

  it('should correctly resolve querySchema when provided with shorthand', () => {
    const meta: RawInformationMeta = {
      schema: {name: "string"},
      querySchema: {shorthandProperty: "string"},
      shorthand: true,
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result).toHaveProperty('querySchema');
    expect(result.querySchema).toEqual({
      type: "object",
      properties: {
        shorthandProperty: {type: "string",  "title": "Shorthand Property"}
      },
      required: ["shorthandProperty"],
      additionalProperties: false,
      "title": "Get Test Label"
    })
  });

  it('should set hasIdentifier and identifier when meta.identifier is provided', () => {
    const meta: RawInformationMeta = {
      schema: {},
      identifier: "ID123",
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result).toHaveProperty('hasIdentifier', true);
    expect(result).toHaveProperty('identifier', 'ID123');
  });

  it('should correctly handle isNotStored when collection is explicitly set to false', () => {
    const meta: RawInformationMeta = {
      schema: {},
      collection: false,
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result).toHaveProperty('isNotStored', true);
  });

  it('should set itemType and resolve inline items if schema represents a list', () => {
    const meta: RawInformationMeta = {
      schema: {type: "array", items: {type: "string"}},
      shorthand: false
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result).toHaveProperty('itemType');
    expect(result.itemType).toBe('TestLabelItem')
  });

  it('should define a collection name if meta.collection is not provided but querySchema exists', () => {
    const meta: RawInformationMeta = {
      schema: {"name": "string"},
      querySchema: {"name": "string"},
      identifier: "name",
    };
    const result = playInformationMetadata("TestLabel", "TestFQCN", meta, mockCtx) as PlayInformationMetadata;
    expect(result).toHaveProperty('collection');
  });
});
