import {type CodyHook} from "@proophboard/cody-types";
import type {VsaCodyConfig, VsaContext} from "./vsa-cody-config.js";

export type {VsaCodyConfig} from "./vsa-cody-config.js";

export const onCommand: CodyHook<VsaContext> = async (command, ctx) => {
  return {
    cody: 'Command hook called',
  }
}

