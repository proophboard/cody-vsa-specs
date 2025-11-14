import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class EventFactorySpec {
    event;
    ctx;
    constructor(event, ctx) {
        this.event = event;
        this.ctx = ctx;
    }
    factory() {
        return this.event.metadata().factory || [];
    }
    folderPath() {
        return this.event.folderPath();
    }
    specFilePath() {
        return path.join(this.folderPath(), 'factory.spec.json');
    }
    toJSON() {
        return this.factory();
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=event-factory-spec.js.map