import { type NodeId } from "@proophboard/cody-types";
import { SliceSpec } from "./slice-spec.js";
import type { NodeRecord } from "../proophboard/node-record.js";
import type { VsaContext } from "../vsa-cody-config.js";
import type { Spec } from "./spec.js";
export declare class ChapterSpec implements Spec {
    private chapterNode;
    private slices;
    private chapterFolder;
    private ctx;
    private prevChapterId;
    private branchedFromChapterId;
    constructor(node: NodeRecord<{}>, prevChapterId: string | null, branchedFromChapterId: string | null, ctx: VsaContext);
    name(): string;
    node(): NodeRecord<{}>;
    prevChapter(): NodeId | null;
    branchedFromChapter(): NodeId | null;
    boardId(): string;
    folderPath(): string;
    specFilePath(): string;
    toSpecContent(): string;
    toJSON(): {
        _pbBoardId: string;
        _pbCardId: string;
        _pbLink: string;
        name: string;
        metadata: {} | null;
        prevChapter: string | null;
        branchedFrom: string | null;
    };
    getPreviousSlice(slice: SliceSpec): SliceSpec | null;
    getNextSlice(slice: SliceSpec): SliceSpec | null;
}
//# sourceMappingURL=chapter-spec.d.ts.map