import type {RefSchema} from "../proophboard/schema/json-schema/is-json-schema-ref.js";
import type {JSONSchema7} from "json-schema";
import type {NodeRecord} from "../proophboard/node-record.js";
import type {VsaContext} from "../vsa-cody-config.js";
import {type CodyResponse, CodyResponseType, type NodeName} from "@proophboard/cody-types";
import {fqcnFromDefinitionId} from "../proophboard/schema/definition-id.js";

export const resolveType = (schema: RefSchema, parentSchema: JSONSchema7, nodeName: NodeName, ctx: VsaContext): NodeRecord<any> | CodyResponse => {
  const ref = fqcnFromDefinitionId(schema['$ref'])

  const refNode = ctx.syncedNodes.nodeMap().find(record => record.getFullQualifiedName(ctx.defaultSystemName) === ref);

  if(!refNode) {
    return {
      cody: `I'm trying to find the referenced Information: "${ref}", but it is not available in the nodes synced from prooph board.`,
      type: CodyResponseType.Error,
      details: `First check if it is a typo in the JSON Schema: "${JSON.stringify(parentSchema)}" of card: "${nodeName}". If not, it seems to be missing on prooph board. Otherwise it is a bug. In that case, please contact the prooph board team!`
    }
  }

  return refNode;
}
