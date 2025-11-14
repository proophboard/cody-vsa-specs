import { resolveRefs } from "../../proophboard/schema/resolve-refs.js";
import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class EventSchemaSpec {
    schemaEvent;
    jsonSchema;
    ctx;
    constructor(schemaEvent, jsonSchema, ctx) {
        this.schemaEvent = schemaEvent;
        this.jsonSchema = resolveRefs(jsonSchema, ctx);
        this.ctx = ctx;
    }
    schema() {
        return this.jsonSchema;
    }
    folderPath() {
        return this.schemaEvent.folderPath();
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
//# sourceMappingURL=event-schema-spec.js.map