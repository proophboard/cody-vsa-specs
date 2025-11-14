import { convertSpecToFileContent } from "../utils/convert-spec-to-file-content.js";
export class AggregateSpec {
    aggregateState;
    ctx;
    constructor(state, ctx) {
        this.aggregateState = state;
        this.ctx = ctx;
    }
    name() {
        return '';
    }
    state() {
        return this.aggregateState;
    }
    identifier() {
        return this.aggregateState.identifier();
    }
    folderPath() {
        return "";
    }
    specFilePath() {
        return "";
    }
    toJSON() {
        return {};
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=aggregate-spec.js.map