import path from "node:path";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class CommandFactorySpec {
    command;
    ctx;
    constructor(command, ctx) {
        this.command = command;
        this.ctx = ctx;
    }
    factory() {
        return this.command.metadata().factory || [];
    }
    folderPath() {
        return this.command.folderPath();
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
//# sourceMappingURL=command-factory-spec.js.map