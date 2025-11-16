// src/utils/synced-nodes-map.test.ts
import { describe, expect, it, beforeEach } from 'vitest';
import { SyncedNodesMap } from './synced-nodes-map.js';
import { type Node, NodeType } from '@proophboard/cody-types';
import { List } from 'immutable';

// Mock Node implementation for testing
const createMockNode = (id: string, name: string, type: NodeType = NodeType.document): Node => ({
  getId: () => id,
  getName: () => name,
  getType: () => type,
  getDescription: () => '',
  getLink: () => '',
  getTags: () => List(),
  isLayer: () => false,
  isDefaultLayer: () => false,
  getParent: () => null,
  getChildren: () => List(),
  getSources: () => List(),
  getTargets: () => List(),
  getGeometry: () => ({ x: 0, y: 0 }),
  getMetadata: () => null,
  withChildren: (children) => createMockNode(id, name, type),
  withSources: (sources) => createMockNode(id, name, type),
  withTargets: (targets) => createMockNode(id, name, type),
});

describe('SyncedNodesMap', () => {
  let syncedNodes: SyncedNodesMap;

  beforeEach(() => {
    syncedNodes = new SyncedNodesMap('TestSystem');
  });

  it('should set and get a node', () => {
    const node = createMockNode('node1', 'TestNode');

    syncedNodes.set('node1', node);
    const result = syncedNodes.get('node1');

    expect(result).toBeDefined();
    expect(result?.getId()).toBe('node1');
    expect(result?.getName()).toBe('TestNode');
  });

  it('should return undefined for non-existent node', () => {
    const result = syncedNodes.get('nonexistent');

    expect(result).toBeUndefined();
  });

  it('should clear all nodes', () => {
    const node1 = createMockNode('node1', 'TestNode1');
    const node2 = createMockNode('node2', 'TestNode2');

    syncedNodes.set('node1', node1);
    syncedNodes.set('node2', node2);

    syncedNodes.clear();

    expect(syncedNodes.get('node1')).toBeUndefined();
    expect(syncedNodes.get('node2')).toBeUndefined();
  });

  it('should return immutable node map', () => {
    const node = createMockNode('node1', 'TestNode');

    syncedNodes.set('node1', node);
    const nodeMap = syncedNodes.nodeMap();

    expect(nodeMap.size).toBe(1);
    expect(nodeMap.has('node1')).toBe(true);
  });

  it('should track document types', () => {
    const node = createMockNode('node1', 'User', NodeType.document);

    syncedNodes.set('node1', node);
    const types = syncedNodes.getTypes();

    expect(types['TestSystem.User']).toBeDefined();
  });

  it('should not track non-document types', () => {
    const node = createMockNode('node1', 'TestCommand', NodeType.command);

    syncedNodes.set('node1', node);
    const types = syncedNodes.getTypes();

    // Should be empty since it's not a document
    expect(Object.keys(types).length).toBe(0);
  });

  it('should allow chaining set operations', () => {
    const node1 = createMockNode('node1', 'TestNode1');
    const node2 = createMockNode('node2', 'TestNode2');

    const result = syncedNodes
      .set('node1', node1)
      .set('node2', node2);

    expect(result).toBe(syncedNodes);
    expect(syncedNodes.get('node1')).toBeDefined();
    expect(syncedNodes.get('node2')).toBeDefined();
  });

  it('should allow chaining clear operation', () => {
    const node = createMockNode('node1', 'TestNode');

    const result = syncedNodes.set('node1', node).clear();

    expect(result).toBe(syncedNodes);
    expect(syncedNodes.get('node1')).toBeUndefined();
  });
});
