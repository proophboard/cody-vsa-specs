import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { List } from "immutable";
import { SliceSpec } from "./slice-spec.js";
import * as path from "node:path";
import { names } from "../utils/names.js";
import { toJSON } from "../utils/json.js";
import { CodyResponseException } from "../utils/error-handling.js";
import { convertSpecToFileContent } from "../utils/convert-spec-to-file-content.js";
export class ChapterSpec {
    chapterNode;
    slices;
    chapterFolder;
    ctx;
    prevChapterId;
    branchedFromChapterId;
    constructor(node, prevChapterId, branchedFromChapterId, ctx) {
        if (node.getType() !== NodeType.boundedContext) {
            throw new CodyResponseException({
                type: CodyResponseType.Error,
                cody: `Wrong node type passed to ChapterSpec. Expected node type "${NodeType.boundedContext}", but got "${node.getType()}"`
            });
        }
        this.chapterNode = node;
        this.chapterFolder = path.join(ctx.chaptersFolder, names(node.getName()).fileName);
        this.ctx = ctx;
        this.slices = node.getChildren()
            .filter(c => c.getType() === NodeType.feature)
            .sort((a, b) => {
            return a.getGeometry().x - b.getGeometry().x;
        });
        this.prevChapterId = prevChapterId;
        this.branchedFromChapterId = branchedFromChapterId;
    }
    name() {
        return this.chapterNode.getName();
    }
    node() {
        return this.chapterNode;
    }
    prevChapter() {
        return this.prevChapterId;
    }
    branchedFromChapter() {
        return this.branchedFromChapterId;
    }
    boardId() {
        return this.ctx.boardId;
    }
    folderPath() {
        return this.chapterFolder;
    }
    specFilePath() {
        return path.join(this.chapterFolder, 'chapter.spec.json');
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
    toJSON() {
        return {
            _pbBoardId: this.boardId(),
            _pbCardId: this.chapterNode.getId(),
            _pbLink: this.chapterNode.getLink(),
            name: this.chapterNode.getName(),
            metadata: this.chapterNode.getParsedMetadata(),
            prevChapter: this.prevChapterId,
            branchedFrom: this.branchedFromChapterId,
        };
    }
    getPreviousSlice(slice) {
        for (let i = 0; i < this.slices.count(); i++) {
            const currentSlice = this.slices.get(i);
            if (!currentSlice) {
                return null;
            }
            if (currentSlice.getId() === slice.node().getId()) {
                if (i === 0) {
                    return null;
                }
                const prevSlice = this.slices.get(i - 1);
                return prevSlice ? new SliceSpec(prevSlice, this, this.ctx) : null;
            }
        }
        return null;
    }
    getNextSlice(slice) {
        for (let i = 0; i < this.slices.count(); i++) {
            const currentSlice = this.slices.get(i);
            if (!currentSlice) {
                return null;
            }
            if (currentSlice.getId() === slice.node().getId()) {
                const nextSlice = this.slices.get(i + 1);
                return nextSlice ? new SliceSpec(nextSlice, this, this.ctx) : null;
            }
        }
        return null;
    }
}
//# sourceMappingURL=chapter-spec.js.map