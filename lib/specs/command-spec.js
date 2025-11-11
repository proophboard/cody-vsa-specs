import { playCommandMetadata } from "../proophboard/metadata/play-command-metadata.js";
import { isCodyError } from "@proophboard/cody-utils";
import { CodyResponseException } from "../utils/error-handling.js";
import * as path from "node:path";
import { names } from "../utils/names.js";
import { CommandSchemaSpec } from "./command/command-schema-spec.js";
import { CommandUiSchemaSpec } from "./command/command-ui-schema-spec.js";
import { CommandDescriptionSpec } from "./command/command-description-spec.js";
import { CommandFactorySpec } from "./command/command-factory-spec.js";
export class CommandSpec {
    commandNode;
    commandSlice;
    commandDesc;
    commandSchema;
    commandUiSchema;
    commandFactory;
    ctx;
    constructor(commandNode, commandSlice, ctx) {
        this.commandNode = commandNode;
        this.commandSlice = commandSlice;
        this.ctx = ctx;
        const meta = this.metadata();
        this.commandDesc = new CommandDescriptionSpec(this, ctx);
        this.commandSchema = new CommandSchemaSpec(this, meta.schema, ctx);
        this.commandUiSchema = new CommandUiSchemaSpec(this, meta.uiSchema || {}, ctx);
        this.commandFactory = new CommandFactorySpec(this, ctx);
    }
    name() {
        return this.commandNode.getFullQualifiedName(this.ctx.defaultSystemName);
    }
    label() {
        return this.commandNode.getName();
    }
    cardDescription() {
        return this.commandNode.getDescription();
    }
    metadata() {
        const meta = playCommandMetadata(this.label(), this.commandNode.getFullQualifiedName(this.ctx.defaultSystemName), this.commandNode.getParsedMetadata(), this.ctx);
        if (isCodyError(meta)) {
            throw new CodyResponseException(meta);
        }
        return meta;
    }
    node() {
        return this.commandNode;
    }
    slice() {
        return this.commandSlice;
    }
    folderPath() {
        return path.join(this.commandSlice.folderPath(), 'commands', names(this.commandNode.getName()).fileName);
    }
    desc() {
        return this.commandDesc;
    }
    factory() {
        return this.commandFactory;
    }
    schema() {
        return this.commandSchema;
    }
    uiSchema() {
        return this.commandUiSchema;
    }
    specs() {
        return [
            this.commandDesc,
            this.commandSchema,
            this.commandUiSchema,
            this.commandFactory,
        ];
    }
}
//# sourceMappingURL=command-spec.js.map