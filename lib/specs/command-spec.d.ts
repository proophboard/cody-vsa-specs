import type { SpecCollection } from "./spec.js";
import type { NodeRecord } from "../proophboard/node-record.js";
import { type PlayCommandMeta, type RawCommandMeta } from "../proophboard/metadata/play-command-metadata.js";
import type { SliceSpec } from "./slice-spec.js";
import type { VsaContext } from "../vsa-cody-config.js";
import { CommandSchemaSpec } from "./command/command-schema-spec.js";
import { CommandUiSchemaSpec } from "./command/command-ui-schema-spec.js";
import { CommandDescriptionSpec } from "./command/command-description-spec.js";
import { CommandFactorySpec } from "./command/command-factory-spec.js";
export declare class CommandSpec implements SpecCollection {
    private commandNode;
    private commandSlice;
    private commandDesc;
    private commandSchema;
    private commandUiSchema;
    private commandFactory;
    private ctx;
    constructor(commandNode: NodeRecord<PlayCommandMeta>, commandSlice: SliceSpec, ctx: VsaContext);
    name(): string;
    label(): string;
    cardDescription(): string;
    metadata(): PlayCommandMeta;
    node(): NodeRecord<RawCommandMeta>;
    slice(): SliceSpec;
    folderPath(): string;
    desc(): CommandDescriptionSpec;
    factory(): CommandFactorySpec;
    schema(): CommandSchemaSpec;
    uiSchema(): CommandUiSchemaSpec;
    specs(): (CommandSchemaSpec | CommandUiSchemaSpec | CommandDescriptionSpec | CommandFactorySpec)[];
}
//# sourceMappingURL=command-spec.d.ts.map