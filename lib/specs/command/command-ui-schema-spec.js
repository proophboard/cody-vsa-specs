import { resolveUiSchema } from "../../proophboard/schema/resolve-refs.js";
import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
import merge from "lodash/fp/merge.js";
export class CommandUiSchemaSpec {
    schemaCommand;
    commandUiSchema;
    ctx;
    constructor(schemaCommand, uiSchema, ctx) {
        this.schemaCommand = schemaCommand;
        const refUiSchema = resolveUiSchema(schemaCommand.schema().schema(), ctx);
        if (refUiSchema) {
            uiSchema = merge(refUiSchema, uiSchema);
        }
        this.commandUiSchema = uiSchema;
        this.ctx = ctx;
    }
    uiSchema() {
        return this.commandUiSchema;
    }
    folderPath() {
        return this.schemaCommand.folderPath();
    }
    specFilePath() {
        return path.join(this.folderPath(), 'ui-schema.spec.json');
    }
    toJSON() {
        return this.commandUiSchema;
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=command-ui-schema-spec.js.map