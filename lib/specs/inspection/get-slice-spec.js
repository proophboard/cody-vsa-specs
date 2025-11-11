import { SliceSpec } from "../slice-spec.js";
import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { CodyResponseException } from "../../utils/error-handling.js";
export function getSliceSpec(node, chapter, ctx) {
    const sliceNode = getSliceNode(node);
    if (!sliceNode) {
        throw new CodyResponseException({
            type: CodyResponseType.Error,
            cody: `🤔 Can't find the slice for "${node.getName()}" (type ${node.getType()}).`,
            details: `An Event Modeling slice is one part of a chapter that describes one process step (user command, user view, automation).\n`
                + `Place the element insight a "Slice" and the slice insight a "Chapter".\n`
                + `If it looks like the element is in a slice, but the error remails, try to resize the "Slice" to force that the element is a child of the slice.`
        });
    }
    return new SliceSpec(sliceNode, chapter, ctx);
}
const getSliceNode = (node) => {
    if (node.getType() === NodeType.feature) {
        return node;
    }
    const parent = node.getParent();
    if (!parent) {
        return;
    }
    return getSliceNode(parent);
};
//# sourceMappingURL=get-slice-spec.js.map