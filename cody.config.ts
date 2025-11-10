import {CodyIgnoreAwareTree, onCommand, type VsaCodyConfig} from "@proophboard/cody-vsa-specs";
import {SyncedNodesMap} from "@proophboard/cody-vsa-specs";

export default {
  hooks: {
    onCommand: onCommand
  },
  context: {
    // specs root relative to project root
    chaptersFolder: "chapters",
    syncedNodes: new SyncedNodesMap(),
    tree: () => new CodyIgnoreAwareTree(process.cwd(), true)
  }
} as VsaCodyConfig;
