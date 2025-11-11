import { List, Record } from 'immutable';
import { GraphPointRecord, NodeType, } from '@proophboard/cody-types';
import { fromJSON } from "../utils/json.js";
import { names } from "../utils/names.js";
import { SyncedNodesMap } from "../utils/synced-nodes-map.js";
const defaultNodeRecordProps = {
    id: '',
    name: '',
    description: '',
    type: NodeType.misc,
    link: '',
    tags: List(),
    layer: false,
    defaultLayer: false,
    parent: null,
    childrenList: List(),
    sourcesList: List(),
    targetsList: List(),
    geometry: { x: 0, y: 0 },
    metadata: null,
    nodesMap: new SyncedNodesMap('App'),
};
export const makeNodeRecord = (node, nodesMap) => {
    const metadata = parseRawMetadataToJsonIfPossible(node) || {};
    return new NodeRecord({
        id: node.id,
        name: metadata.$nodeName || node.name,
        description: node.description,
        type: metadata.$nodeType || node.type,
        link: node.link || '',
        tags: List(node.tags),
        layer: node.layer,
        defaultLayer: node.defaultLayer,
        parent: node.parent ? makeNodeRecord(node.parent, nodesMap) : null,
        childrenList: List(node.childrenList.map(n => makeNodeRecord(n, nodesMap))),
        sourcesList: List(node.sourcesList.map(n => makeNodeRecord(n, nodesMap))),
        targetsList: List(node.targetsList.map(n => makeNodeRecord(n, nodesMap))),
        geometry: new GraphPointRecord(node.geometry),
        metadata: node.metadata,
        nodesMap,
    });
};
export const makeNodeRecordFromNode = (node, nodesMap) => {
    if (node instanceof NodeRecord) {
        return node;
    }
    const metadata = parseRawMetadataToJsonIfPossible({ "metadata": node.getMetadata() }) || {};
    return new NodeRecord({
        id: node.getId(),
        name: metadata.$nodeName || node.getName(),
        description: node.getDescription(),
        type: metadata.$nodeType || node.getType(),
        link: node.getLink() || '',
        tags: node.getTags(),
        layer: node.isLayer(),
        defaultLayer: node.isDefaultLayer(),
        parent: node.getParent() ? makeNodeRecordFromNode(node.getParent(), nodesMap) : null,
        childrenList: node.getChildren().map(n => makeNodeRecordFromNode(n, nodesMap)),
        sourcesList: node.getSources().map(n => makeNodeRecordFromNode(n, nodesMap)),
        targetsList: node.getTargets().map(n => makeNodeRecordFromNode(n, nodesMap)),
        geometry: node.getGeometry(),
        metadata: node.getMetadata(),
        nodesMap,
    });
};
export class NodeRecord extends Record(defaultNodeRecordProps) {
    cachedMetadata = undefined;
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getType() {
        return this.type;
    }
    getLink() {
        return this.link;
    }
    getTags() {
        return this.tags;
    }
    isLayer() {
        return this.layer;
    }
    isDefaultLayer() {
        return this.defaultLayer;
    }
    getParent() {
        if (!this.parent) {
            return null;
        }
        return this.nodesMap.get(this.parent.getId()) || null;
    }
    getChildren() {
        return this.childrenList
            .map(n => this.nodesMap.get(n.getId()))
            .filter(n => !!n);
    }
    getSources() {
        return this.sourcesList
            .map(n => this.nodesMap.get(n.getId()))
            .filter(n => !!n);
    }
    getTargets() {
        return this.targetsList
            .map(n => this.nodesMap.get(n.getId()))
            .filter(n => !!n);
    }
    getGeometry() {
        return this.geometry;
    }
    getMetadata() {
        return this.metadata;
    }
    getParsedMetadata() {
        if (typeof this.cachedMetadata === "undefined") {
            const parsedMeta = parseRawMetadataToJsonIfPossible({ metadata: this.getMetadata() });
            this.cachedMetadata = parsedMeta || null;
        }
        return this.cachedMetadata;
    }
    getFullQualifiedName(defaultSystemName) {
        const meta = this.getParsedMetadata();
        let fqcn = '';
        if (meta?.service) {
            fqcn += names(meta.service).className + '.';
        }
        if (meta?.ns) {
            fqcn += meta.ns + '.';
        }
        if (fqcn === "") {
            fqcn = defaultSystemName + '.';
        }
        return `${fqcn}${names(this.getName()).className}`;
    }
    withChildren(childrenList) {
        return this.set('childrenList', childrenList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
    }
    withSources(sourcesList) {
        return this.set('sourcesList', sourcesList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
    }
    withTargets(targetsList) {
        return this.set('targetsList', targetsList.map(c => makeNodeRecordFromNode(c, this.nodesMap)));
    }
}
const parseRawMetadataToJsonIfPossible = (node) => {
    if (!node.metadata) {
        return;
    }
    try {
        const meta = fromJSON(node.metadata);
        if (meta) {
            return meta;
        }
    }
    catch (e) {
        return;
    }
};
//# sourceMappingURL=node-record.js.map