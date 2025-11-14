import { isShorthand } from "../schema/shorthand/shorthand.js";
import { jsonSchemaFromShorthand } from "../schema/json-schema-from-shorthand.js";
import { isCodyError } from "@proophboard/cody-utils";
import { normalizeRefs } from "../schema/normalize-refs.js";
import { addSchemaTitles } from "../schema/add-schema-titles.js";
import { definitionIdFromFQCN } from "../schema/definition-id.js";
export const playEventMetadata = (label, FQCN, meta, ctx) => {
    if (!meta) {
        meta = {
            public: false,
            schema: {}
        };
    }
    let schema = meta.schema || {};
    if (isShorthand(schema)) {
        const convertedSchema = jsonSchemaFromShorthand(schema, '/commands');
        if (isCodyError(convertedSchema)) {
            return convertedSchema;
        }
        schema = normalizeRefs(addSchemaTitles(label, convertedSchema), ctx.defaultSystemName);
    }
    schema['$id'] = definitionIdFromFQCN(FQCN);
    const parsedMeta = {
        "public": !!meta.public,
        fqcn: FQCN,
        schema,
    };
    if (meta.service) {
        parsedMeta.service = meta.service;
    }
    if (meta.applyRules) {
        parsedMeta.applyRules = meta.applyRules;
    }
    if (meta.factory) {
        parsedMeta.factory = meta.factory;
    }
    return parsedMeta;
};
//# sourceMappingURL=play-event-metadata.js.map