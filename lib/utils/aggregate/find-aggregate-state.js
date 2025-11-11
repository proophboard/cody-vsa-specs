import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { getSingleTarget, getTargetsOfType, isCodyError } from "@proophboard/cody-utils";
import { List } from "immutable";
import { makeNodeRecordFromNode } from "../../proophboard/node-record.js";
import { InformationSpec } from "../../specs/information-spec.js";
import { isStateDescription } from "../../types/descriptions.js";
export const findAggregateState = (commandEventOrAggregate, ctx) => {
    let events = List();
    if (commandEventOrAggregate.getType() === NodeType.aggregate) {
        const eventsOrError = getTargetsOfType(commandEventOrAggregate, NodeType.event);
        if (isCodyError(eventsOrError)) {
            return eventsOrError;
        }
        events = eventsOrError.map(e => makeNodeRecordFromNode(e, ctx.syncedNodes));
    }
    else if (commandEventOrAggregate.getType() === NodeType.command) {
        const cmdAggregate = getSingleTarget(commandEventOrAggregate, NodeType.aggregate);
        if (isCodyError(cmdAggregate)) {
            const cmdEventsOrError = getTargetsOfType(commandEventOrAggregate, NodeType.event);
            if (isCodyError(cmdEventsOrError)) {
                return cmdEventsOrError;
            }
            events = cmdEventsOrError.map(e => makeNodeRecordFromNode(e, ctx.syncedNodes));
        }
        else {
            return findAggregateState(makeNodeRecordFromNode(cmdAggregate, ctx.syncedNodes), ctx);
        }
    }
    else if (commandEventOrAggregate.getType() === NodeType.event) {
        events = events.push(commandEventOrAggregate);
    }
    for (const event of events) {
        const vos = getTargetsOfType(event, NodeType.document, true, false, true);
        if (isCodyError(vos)) {
            return vos;
        }
        for (const vo of vos) {
            const voMeta = (new InformationSpec()).metadata();
            if (isStateDescription(voMeta)) {
                return makeNodeRecordFromNode(vo, ctx.syncedNodes);
            }
        }
    }
    return {
        cody: `I cannot find an information card that defines the state for: ${commandEventOrAggregate.getName()}.`,
        type: CodyResponseType.Error,
        details: `State information needs to be of type object and should have an identifier. It should also be the result of an event.`,
    };
};
//# sourceMappingURL=find-aggregate-state.js.map