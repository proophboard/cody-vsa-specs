import {} from "../event-spec.js";
import {} from "../aggregate-spec.js";
import { pbDesc } from "../../proophboard/description.js";
import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class AggregateEventDescriptionSpec {
    eventSpec;
    aggregateSpec;
    ctx;
    constructor(eventSpec, aggregateSpec, ctx) {
        this.eventSpec = eventSpec;
        this.aggregateSpec = aggregateSpec;
        this.ctx = ctx;
    }
    desc() {
        const meta = this.eventSpec.metadata();
        return {
            ...pbDesc(this.eventSpec.node(), this.ctx),
            name: this.eventSpec.name(),
            public: meta.public,
            aggregateEvent: true,
            aggregateName: this.aggregateSpec.name(),
            aggregateIdentifier: this.aggregateSpec.identifier(),
            aggregateState: this.aggregateSpec.state().name()
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
//# sourceMappingURL=aggregate-event-description-spec.js.map