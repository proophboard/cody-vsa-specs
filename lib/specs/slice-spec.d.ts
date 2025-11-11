import type { ChapterSpec } from "./chapter-spec.js";
import type { NodeRecord } from "../proophboard/node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
import type { Spec } from "./spec.js";
export type SliceType = 'user-command' | 'user-view' | 'automation';
export declare class SliceSpec implements Spec {
    private chapterSpec;
    private sliceNode;
    private sliceType;
    private ctx;
    private sliceUis;
    private sliceCommands;
    private sliceBusinessRules;
    private sliceEvents;
    private sliceInformation;
    private sliceAutomations;
    private sliceServices;
    constructor(sliceNode: NodeRecord<{}>, chapterSpec: ChapterSpec, ctx: VsaContext);
    chapter(): ChapterSpec;
    name(): string;
    type(): SliceType;
    prevSlice(): SliceSpec | null;
    nextSlice(): SliceSpec | null;
    node(): NodeRecord<{}>;
    folderPath(): string;
    specFilePath(): string;
    toSpecContent(): string;
    toJSON(): {
        _pbBoardId: string;
        _pbCardId: string;
        _pbLink: string;
        name: string;
        type: SliceType;
        metadata: {} | null;
        prevSlice: {
            name: string;
            _pbCardId: string;
            _pbLink: string;
        } | null;
        nextSlice: {
            name: string;
            _pbCardId: string;
            _pbLink: string;
        } | null;
    };
    private static detectTypeAndElements;
}
export interface UserCommandSlice extends SliceSpec {
    ui: null;
    command: null;
    commandHandler: null;
    events: null;
    information: [];
    services: [];
}
export interface UserViewSlice extends SliceSpec {
    ui: null;
    information: [];
    events: [];
}
export interface AutomationSlice extends SliceSpec {
    automation: null;
    information: [];
    command: null;
    service: null;
    events: [];
}
//# sourceMappingURL=slice-spec.d.ts.map