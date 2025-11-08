import {CodyResponseType, NodeType} from "@proophboard/cody-types";
import {List} from "immutable";
import {SliceSpec} from "./slice-spec.js";
import * as path from "node:path";
import {names} from "../utils/names.js";
import {toJSON} from "../utils/json.js";
import type {NodeRecord} from "../proophboard/node-record.js";
import {CodyResponseException} from "../utils/error-handling.js";

export class ChapterSpec {
  private chapterNode: NodeRecord<{}>;
  private slices: List<NodeRecord<{}>>;
  private chapterFolder: string;
  private chapterBoardId: string;

  constructor(node: NodeRecord<{}>, chaptersFolder: string, chapterBoardId: string) {
    if(node.getType() !== NodeType.boundedContext) {
      throw new CodyResponseException({
        type: CodyResponseType.Error,
        cody: `Wrong node type passed to ChapterSpec. Expected node type "${NodeType.boundedContext}", but got "${node.getType()}"`
      });
    }

    this.chapterNode = node;
    this.chapterFolder = path.join(chaptersFolder, names(node.getName()).fileName);
    this.chapterBoardId = chapterBoardId;

    this.slices = node.getChildren()
      .filter(c => c.getType() === NodeType.feature)
      .sort((a, b) => {
        return a.getGeometry().x - b.getGeometry().x;
      });
  }

  name () {
    return this.chapterNode.getName();
  }

  node () {
    return this.chapterNode;
  }

  boardId () {
    return this.chapterBoardId;
  }

  folderPath () {
    return this.chapterFolder;
  }

  specFilePath () {
    return path.join(this.chapterFolder, 'chapter.spec.json');
  }

  toJSON () {
    toJSON({
      _pbBoardId: this.chapterBoardId,
      _pbCardId: this.chapterNode.getId(),
      _pbLink: this.chapterNode.getLink(),
      name: this.chapterNode.getName(),
      metadata: this.chapterNode.getParsedMetadata(),
    }, null, 2)
  }

  getPreviousSlice (slice: SliceSpec): SliceSpec | null {
    for (let i = 0; i < this.slices.count(); i++) {
      const currentSlice = this.slices.get(i);

      if(!currentSlice) {
        return null;
      }

      if(currentSlice.getId() === slice.node().getId()) {
        const prevSlice =  this.slices.get(i - 1);

        return prevSlice ? new SliceSpec(prevSlice, this) : null;
      }
    }

    return null;
  }

  getNextSlice (slice: SliceSpec): SliceSpec | null {
    for (let i = 0; i < this.slices.count(); i++) {
      const currentSlice = this.slices.get(i);

      if(!currentSlice) {
        return null;
      }

      if(currentSlice.getId() === slice.node().getId()) {
        const nextSlice =  this.slices.get(i + 1);

        return nextSlice ? new SliceSpec(nextSlice, this) : null;
      }
    }

    return null;
  }
}
