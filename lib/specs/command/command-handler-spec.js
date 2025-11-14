import path from "node:path";
import { names } from "../../utils/names.js";
import { convertSpecToFileContent } from "../../utils/convert-spec-to-file-content.js";
export class CommandHandlerSpec {
    handledCommand;
    handlerSlice;
    handlingRules;
    ctx;
    constructor(command, slice, rules, ctx) {
        this.handledCommand = command;
        this.handlerSlice = slice;
        this.handlingRules = rules;
        this.ctx = ctx;
    }
    rules() {
        return this.handlingRules;
    }
    command() {
        return this.handledCommand;
    }
    slice() {
        return this.handlerSlice;
    }
    folderPath() {
        return this.handledCommand.folderPath();
    }
    specFilePath() {
        return path.join(this.folderPath(), 'handle.spec.json');
    }
    toJSON() {
        return this.handlingRules;
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
}
//# sourceMappingURL=command-handler-spec.js.map