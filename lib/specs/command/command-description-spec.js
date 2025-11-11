import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
import { isStateDescription } from "../../types/descriptions.js";
import { pbDesc } from "../../proophboard/description.js";
import { getSingleTarget, isCodyError } from "@proophboard/cody-utils";
import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { systemNameFromFQCN } from "../../proophboard/schema/definition-id.js";
import { findAggregateState } from "../../utils/aggregate/find-aggregate-state.js";
import { CodyResponseException } from "../../utils/error-handling.js";
import { makeNodeRecordFromNode, NodeRecord } from "../../proophboard/node-record.js";
import { names } from "../../utils/names.js";
import { InformationSpec } from "../information-spec.js";
export class CommandDescriptionSpec {
    command;
    ctx;
    constructor(schemaCommand, ctx) {
        this.command = schemaCommand;
        this.ctx = ctx;
    }
    desc() {
        const meta = this.command.metadata();
        const desc = {};
        // Aggregate specifics
        if (meta.aggregateCommand) {
            let aggregate = getSingleTarget(this.command.node(), NodeType.aggregate);
            const isAggregateConnected = !isCodyError(aggregate);
            if (isAggregateConnected) {
                aggregate = makeNodeRecordFromNode(aggregate, this.ctx.syncedNodes);
            }
            const systemName = systemNameFromFQCN(this.command.node().getFullQualifiedName(this.ctx.defaultSystemName));
            const aggregateState = findAggregateState(this.command.node(), this.ctx);
            if (isCodyError(aggregateState)) {
                throw new CodyResponseException(aggregateState);
            }
            desc['newAggregate'] = meta.newAggregate;
            desc['aggregateName'] = isAggregateConnected
                ? aggregate.getFullQualifiedName(this.ctx.defaultSystemName)
                : `${systemName}.${names(aggregateState.getName()).className}`;
            const stateMeta = (new InformationSpec()).metadata();
            if (!isStateDescription(stateMeta)) {
                throw new CodyResponseException({
                    type: CodyResponseType.Error,
                    cody: `Metadata of aggregate state "${aggregateState.getName()}" is invalid. It either has no identifier set or its schema is a list.`
                });
            }
            desc['aggregateIdentifier'] = stateMeta.identifier;
            desc['persistState'] = typeof meta.persistState === "boolean" ? meta.persistState : true;
            desc['deleteState'] = !!meta.deleteState;
            desc['deleteHistory'] = !!meta.deleteHistory;
        }
        else if (meta.streamCommand) {
            desc['streamIdExpr'] = meta.streamId;
        }
        if (meta.streamName) {
            desc['streamName'] = meta.streamName;
        }
        if (meta.publicStream) {
            desc['publicStream'] = meta.publicStream;
        }
        return {
            ...pbDesc(this.command.node(), this.ctx),
            name: this.command.node().getFullQualifiedName(this.ctx.defaultSystemName),
            aggregateCommand: this.command.metadata().aggregateCommand,
            streamCommand: this.command.metadata().streamCommand,
            dependencies: this.command.metadata().dependencies,
            ...desc
        };
    }
    folderPath() {
        return this.command.folderPath();
    }
    specFilePath() {
        return path.join(this.folderPath(), 'desc.spec.json');
    }
    toJSON() {
        return this.desc();
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=command-description-spec.js.map