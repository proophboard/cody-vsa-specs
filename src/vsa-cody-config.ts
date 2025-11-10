import type {CodyConfig} from "@proophboard/cody-server/lib/src/config/codyconfig.js";
import type {SpecContentConverter} from "./utils/convert-spec-to-file-content.js";
import type {SyncedNodesMap} from "./utils/synced-nodes-map.js";
import type {Tree} from "@nx/devkit";

type CodyConfigCtx = Omit<CodyConfig['context'], "syncedNodes">;
export type VsaContext = CodyConfigCtx & {
  chaptersFolder: string;
  disableJsonWithComments?: boolean;
  specContentConverter?: SpecContentConverter;
  syncedNodes: SyncedNodesMap;
  tree: () => Tree;
  defaultSystemName: string;
  boardId: string;
}

export interface VsaCodyConfig extends Omit<CodyConfig, 'context'> {
  context: Partial<VsaContext>;
}
