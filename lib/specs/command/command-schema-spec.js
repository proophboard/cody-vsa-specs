import * as path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
import { resolveRefs } from "../../proophboard/schema/resolve-refs.js";
export class CommandSchemaSpec {
    schemaCommand;
    jsonSchema;
    ctx;
    constructor(schemaCommand, jsonSchema, ctx) {
        this.schemaCommand = schemaCommand;
        this.jsonSchema = resolveRefs(jsonSchema, ctx);
        this.ctx = ctx;
    }
    schema() {
        return this.jsonSchema;
    }
    folderPath() {
        return this.schemaCommand.folderPath();
    }
    specFilePath() {
        return path.join(this.folderPath(), 'schema.spec.json');
    }
    toJSON() {
        return this.jsonSchema;
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=command-schema-spec.js.map