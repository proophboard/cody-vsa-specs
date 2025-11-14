import {} from "../event-spec.js";
import { pbDesc } from "../../proophboard/description.js";
import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class EventDescriptionSpec {
    eventSpec;
    ctx;
    constructor(eventSpec, ctx) {
        this.eventSpec = eventSpec;
        this.ctx = ctx;
    }
    desc() {
        const meta = this.eventSpec.metadata();
        return {
            ...pbDesc(this.eventSpec.node(), this.ctx),
            name: this.eventSpec.name(),
            public: meta.public,
            aggregateEvent: false,
        };
    }
    folderPath() {
        return this.eventSpec.folderPath();
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
//# sourceMappingURL=event-description-spec.js.map