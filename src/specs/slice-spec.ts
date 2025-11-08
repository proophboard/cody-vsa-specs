import {CodyResponseType, type Node, NodeType} from "@proophboard/cody-types";
import type {ChapterSpec} from "./chapter-spec.js";
import type {NodeRecord} from "../proophboard/node-record.js";
import {CodyResponseException} from "../utils/error-handling.js";
import {List} from "immutable";
import path = require("node:path");
import {names} from "../utils/names.js";
import {toJSON} from "../utils/json.js";

export type SliceType = 'user-command' | 'user-view' | 'automation';

export class SliceSpec {
  private chapterSpec: ChapterSpec;
  private sliceNode: NodeRecord<{}>;
  private sliceType: SliceType;
  private sliceUis: List<NodeRecord<{}>>;
  private sliceCommands: List<NodeRecord<{}>>;
  private sliceBusinessRules: List<NodeRecord<{}>>;
  private sliceEvents: List<NodeRecord<{}>>;
  private sliceInformation: List<NodeRecord<{}>>;
  private sliceAutomations: List<NodeRecord<{}>>;
  private sliceServices: List<NodeRecord<{}>>;

  constructor(sliceNode: NodeRecord<{}>, chapterSpec: ChapterSpec) {
    this.chapterSpec = chapterSpec;
    this.sliceNode = sliceNode;

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

  chapter () {
    return this.chapterSpec;
  }

  name () {
    return this.sliceNode.getName();
  }

  type () {
    return this.sliceType;
  }

  prevSlice () {
    return this.chapterSpec.getPreviousSlice(this);
  }

  nextSlice () {
    return this.chapterSpec.getNextSlice(this);
  }

  node () {
    return this.sliceNode;
  }

  folderPath(): string {
    return path.join(this.chapterSpec.folderPath(), names(this.sliceNode.getName()).fileName);
  }

  specFilePath(): string {
    return path.join(this.folderPath(), 'slice.spec.json');
  }

  toJSON(): string {
    const prevSlice = this.prevSlice();
    const nextSlice = this.nextSlice();

    return toJSON({
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
    }, null, 2);
  }

  private static detectTypeAndElements (sliceNode: NodeRecord<{}>): {
    type: SliceType,
    uis: NodeRecord<{}>[],
    commands: NodeRecord<{}>[],
    businessRules: NodeRecord<{}>[],
    events: NodeRecord<{}>[],
    information: NodeRecord<{}>[],
    automations: NodeRecord<{}>[],
    services: NodeRecord<{}>[]
  } {
    const uis: NodeRecord<{}>[] = [];
    const commands: NodeRecord<{}>[] = [];
    const businessRules: NodeRecord<{}>[] = [];
    const events: NodeRecord<{}>[] = [];
    const information: NodeRecord<{}>[] = [];
    const automations: NodeRecord<{}>[] = [];
    const services: NodeRecord<{}>[] = [];

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

    let type: SliceType | undefined = undefined;

    if(uis.length) {
      if(commands.length) {
        type = "user-command"
      } else if (information.length) {
        type = "user-view"
      }
    } else if (automations.length) {
      type = "automation";
    }

    if(!type) {
      throw new CodyResponseException({
        type: CodyResponseType.Error,
        cody: `Unable to detect slice type of slice "${sliceNode.getName()}".`,
        details: `A slice should contain a valid information flow:\n\nui -> command -> event(s)\n\ninformation -> ui\n\ninformation -> automation`
      })
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

export interface UserCommandSlice extends SliceSpec {
  //@TODO roles: string[];
  ui: null;
  command: null;
  commandHandler: null;
  events: null;
  information: [];
  services: [];
}

export interface UserViewSlice extends SliceSpec {
  //@TODO roles: string[];
  ui: null;
  information: [];
  events: [];
}

export interface AutomationSlice extends SliceSpec {
  //@TODO roles: string[];
  automation: null;
  information: [];
  command: null;
  service: null;
  events: [];
}
