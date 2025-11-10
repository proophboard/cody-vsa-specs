import type {Spec} from "../spec.js";
import type {CommandSpec} from "../command-spec.js";
import type {VsaContext} from "../../vsa-cody-config.js";
import path from "node:path";
import {convertSpecToFileContent} from "../../utils/convert-spec-to-file-content.js";
import {
  type AggregateCommandDescription,
  type CommandDescription,
  isStateDescription,
  type PureCommandDescription,
  type StreamCommandDescription
} from "../../types/descriptions.js";
import {pbDesc} from "../../proophboard/description.js";
import {getSingleTarget, isCodyError} from "@proophboard/cody-utils";
import {CodyResponseType, type Node, NodeType} from "@proophboard/cody-types";
import {systemNameFromFQCN} from "../../proophboard/schema/definition-id.js";
import {findAggregateState} from "../../utils/aggregate/find-aggregate-state.js";
import {CodyResponseException} from "../../utils/error-handling.js";
import {makeNodeRecordFromNode, NodeRecord} from "../../proophboard/node-record.js";
import {names} from "../../utils/names.js";
import {InformationSpec} from "../information-spec.js";

export class CommandDescriptionSpec implements Spec {
  private command: CommandSpec;
  private ctx: VsaContext;

  constructor(schemaCommand: CommandSpec, ctx: VsaContext) {
    this.command = schemaCommand;
    this.ctx = ctx;
  }

  desc (): CommandDescription | AggregateCommandDescription | PureCommandDescription | StreamCommandDescription {
    const meta = this.command.metadata();

    const desc: Record<string, any> = {};

    // Aggregate specifics
    if(meta.aggregateCommand) {
      let aggregate = getSingleTarget(this.command.node(), NodeType.aggregate);
      const isAggregateConnected = !isCodyError(aggregate);

      if(isAggregateConnected) {
        aggregate = makeNodeRecordFromNode(aggregate as Node, this.ctx.syncedNodes);
      }

      const systemName = systemNameFromFQCN(this.command.node().getFullQualifiedName(this.ctx.defaultSystemName));

      const aggregateState = findAggregateState(this.command.node(), this.ctx);

      if (isCodyError(aggregateState)) {
        throw new CodyResponseException(aggregateState);
      }

      desc['newAggregate'] = meta.newAggregate;
      desc['aggregateName'] = isAggregateConnected
        ? (aggregate as NodeRecord<any>).getFullQualifiedName(this.ctx.defaultSystemName)
        : `${systemName}.${names(aggregateState.getName()).className}`;

      const stateMeta = (new InformationSpec()).metadata();

      if(!isStateDescription(stateMeta)) {
        throw new CodyResponseException({
          type: CodyResponseType.Error,
          cody: `Metadata of aggregate state "${aggregateState.getName()}" is invalid. It either has no identifier set or its schema is a list.`
        })
      }

      desc['aggregateIdentifier'] = stateMeta.identifier;
      desc['persistState'] = typeof meta.persistState === "boolean" ? meta.persistState : true;
      desc['deleteState'] = !!meta.deleteState;
      desc['deleteHistory'] = !!meta.deleteHistory;
    } else if (meta.streamCommand) {
      desc['streamIdExpr'] = meta.streamId;
    }

    if(meta.streamName) {
      desc['streamName'] = meta.streamName;
    }

    if(meta.publicStream) {
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

  folderPath(): string {
    return this.command.folderPath();
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'desc.spec.json');
  }

  toJSON(): object {
    return this.desc();
  }

  toSpecContent(): string {
    return convertSpecToFileContent(this, this.ctx);
  }
}
