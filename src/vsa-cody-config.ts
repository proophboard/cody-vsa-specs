import type {CodyConfig} from "@proophboard/cody-server/lib/src/config/codyconfig.js";
import type {SpecContentConverter} from "./utils/convert-spec-to-file-content.js";

type CodyConfigCtx = CodyConfig['context'];
export type VsaContext = CodyConfigCtx & {
  chaptersFolder: string;
  disableJsonWithComments?: boolean;
  specContentConverter?: SpecContentConverter;
}

export interface VsaCodyConfig extends CodyConfig {
  context: VsaContext;
}
