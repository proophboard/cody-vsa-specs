import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { CommandSpec } from "./command-spec.js";
import { CodyResponseException } from "../utils/error-handling.js";
import { EventSpec } from "./event-spec.js";
export function isSpecCollection(spec) {
    return typeof spec.specs === "function";
}
export function makeNodeSpec(node, slice, ctx) {
    switch (node.getType()) {
        case NodeType.command:
            return new CommandSpec(node, slice, ctx);
        case NodeType.event:
            // @TODO: check if aggregate event!
            return new EventSpec(node, slice, ctx);
    }
    throw new CodyResponseException({
        type: CodyResponseType.Error,
        cody: `Unsupported node given. Can't make a spec for the node type "${node.getType()}" of node "${node.getName()}"`,
    });
}
//# sourceMappingURL=spec.js.map