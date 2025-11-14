import {CodyIgnoreAwareTree, handleNode, type VsaCodyConfig} from "@proophboard/cody-vsa-specs";
import {SyncedNodesMap} from "@proophboard/cody-vsa-specs";

// If a node has no namespace defined, the defaultSystemName is used as namespace
const DEFAULT_SYSTEM_NAME = "App";

export default {
  hooks: {
    onCommand: handleNode,
    onEvent: handleNode,
    onDocument: handleNode,
    onUi: handleNode,
    onAggregate: handleNode,
    onPolicy: handleNode,
  },
  context: {

    defaultSystemName: DEFAULT_SYSTEM_NAME,
    // specs root relative to project root
    chaptersFolder: "chapters",
    syncedNodes: new SyncedNodesMap(DEFAULT_SYSTEM_NAME),
    tree: () => new CodyIgnoreAwareTree(process.cwd(), true)
  }
} as VsaCodyConfig;
