import type {CodyConfig} from "@proophboard/cody-server/lib/src/config/codyconfig.js";

type CodyConfigCtx = CodyConfig['context'];
type VsaContext = CodyConfigCtx & { chaptersFolder: string }

export interface VsaCodyConfig extends CodyConfig {
  context: VsaContext;
}
