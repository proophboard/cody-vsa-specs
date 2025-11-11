import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
import { CodyResponseType, NodeType } from "@proophboard/cody-types";
import { CodyResponseException } from "../utils/error-handling.js";
import { List } from "immutable";
const path = __require("node:path");
import { names } from "../utils/names.js";
import { convertSpecToFileContent } from "../utils/convert-spec-to-file-content.js";
export class SliceSpec {
    chapterSpec;
    sliceNode;
    sliceType;
    ctx;
    sliceUis;
    sliceCommands;
    sliceBusinessRules;
    sliceEvents;
    sliceInformation;
    sliceAutomations;
    sliceServices;
    constructor(sliceNode, chapterSpec, ctx) {
        this.chapterSpec = chapterSpec;
        this.sliceNode = sliceNode;
        this.ctx = ctx;
        const result = SliceSpec.detectTypeAndElements(sliceNode);
        this.sliceType = result.type;
        this.sliceUis = List(result.uis);
        this.sliceCommands = List(result.commands);
        this.sliceBusinessRules = List(result.businessRules);
        this.sliceEvents = List(result.events);
        this.sliceInformation = List(result.information);
        this.sliceAutomations = List(result.automations);
        this.sliceServices = List(result.services);
    }
    chapter() {
        return this.chapterSpec;
    }
    name() {
        return this.sliceNode.getName();
    }
    type() {
        return this.sliceType;
    }
    prevSlice() {
        return this.chapterSpec.getPreviousSlice(this);
    }
    nextSlice() {
        return this.chapterSpec.getNextSlice(this);
    }
    node() {
        return this.sliceNode;
    }
    folderPath() {
        return path.join(this.chapterSpec.folderPath(), names(this.sliceNode.getName()).fileName);
    }
    specFilePath() {
        return path.join(this.folderPath(), 'slice.spec.json');
    }
    toSpecContent() {
        return convertSpecToFileContent(this, this.ctx);
    }
    toJSON() {
        const prevSlice = this.prevSlice();
        const nextSlice = this.nextSlice();
        return {
            _pbBoardId: this.chapterSpec.boardId(),
            _pbCardId: this.sliceNode.getId(),
            _pbLink: this.sliceNode.getLink(),
            name: this.sliceNode.getName(),
            type: this.type(),
            metadata: this.sliceNode.getParsedMetadata(),
            prevSlice: prevSlice ? {
                name: prevSlice.name(),
                _pbCardId: prevSlice.node().getId(),
                _pbLink: prevSlice.node().getLink()
            } : null,
            nextSlice: nextSlice ? {
                name: nextSlice.name(),
                _pbCardId: nextSlice.node().getId(),
                _pbLink: nextSlice.node().getLink()
            } : null,
        };
    }
    static detectTypeAndElements(sliceNode) {
        const uis = [];
        const commands = [];
        const businessRules = [];
        const events = [];
        const information = [];
        const automations = [];
        const services = [];
        sliceNode.getChildren().forEach(child => {
            switch (child.getType()) {
                case NodeType.ui:
                    uis.push(child);
                    break;
                case NodeType.command:
                    commands.push(child);
                    break;
                case NodeType.aggregate:
                    businessRules.push(child);
                    break;
                case NodeType.event:
                    events.push(child);
                    break;
                case NodeType.document:
                    information.push(child);
                    break;
                case NodeType.policy:
                    automations.push(child);
                    break;
                case NodeType.externalSystem:
                    services.push(child);
                    break;
            }
        });
        let type = undefined;
        if (uis.length) {
            if (commands.length) {
                type = "user-command";
            }
            else if (information.length) {
                type = "user-view";
            }
        }
        else if (automations.length) {
            type = "automation";
        }
        if (!type) {
            throw new CodyResponseException({
                type: CodyResponseType.Error,
                cody: `Unable to detect slice type of slice "${sliceNode.getName()}".`,
                details: `A slice should contain a valid information flow:\n\nui -> command -> event(s)\n\ninformation -> ui\n\ninformation -> automation`
            });
        }
        // @TODO: validate slice type
        return {
            type,
            uis,
            commands,
            businessRules,
            events,
            information,
            automations,
            services
        };
    }
}
//# sourceMappingURL=slice-spec.js.map