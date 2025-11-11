import { ChapterSpec } from "../chapter-spec.js";
import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { CodyResponseException } from "../../utils/error-handling.js";
export function getChapterSpec(node, ctx) {
    const chapterNode = getChapterNode(node);
    if (!chapterNode) {
        throw new CodyResponseException({
            type: CodyResponseType.Error,
            cody: `🤔 Can't find the chapter for "${node.getName()}" (type ${node.getType()}).`,
            details: `An Event Modeling chapter is one information flow (a set of swim lanes) grouping slices to form a story.\n`
                + `Place the element insight a "Slice" and the slice insight a "Chapter".\n`
                + `If it looks like the element is in a slice in a chapter, but the error remails, try to resize the "Slice" to force that the element is a child of the slice.\n`
                + `If the error still remains, also resize the chapter to force the slice to be a child of the chapter.`
        });
    }
    // @TODO: detect prevChapterId and branchedFromChapterId
    return new ChapterSpec(chapterNode, null, null, ctx);
}
const getChapterNode = (node) => {
    if (node.getType() === NodeType.boundedContext) {
        return node;
    }
    const parent = node.getParent();
    if (!parent) {
        return;
    }
    return getChapterNode(parent);
};
//# sourceMappingURL=get-chapter-spec.js.map