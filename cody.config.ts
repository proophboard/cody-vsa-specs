import {onCommand, type VsaCodyConfig} from "@proophboard/cody-vsa-specs";
import {Map} from "immutable";

export default {
  hooks: {
    onCommand: onCommand
  },
  context: {
    // specs root
    chaptersFolder: "./src",
    syncedNodes: Map({})
  }
} as VsaCodyConfig;
