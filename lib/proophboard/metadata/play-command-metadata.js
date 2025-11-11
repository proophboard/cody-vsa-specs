import { jsonSchemaFromShorthand } from "../schema/json-schema-from-shorthand.js";
import { isShorthand } from "../schema/shorthand/shorthand.js";
import { isCodyError } from "@proophboard/cody-utils";
import { normalizeRefs } from "../schema/normalize-refs.js";
import { addSchemaTitles } from "../schema/add-schema-titles.js";
import { definitionIdFromFQCN } from "../schema/definition-id.js";
export const playCommandMetadata = (label, FQCN, meta, ctx) => {
    if (!meta) {
        meta = {
            newAggregate: false,
            aggregateCommand: false,
            schema: {},
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
    const aggregateCommand = meta.aggregateCommand || meta.newAggregate || false;
    const streamCommand = !aggregateCommand && !!meta.streamId;
    const newAggregate = !!meta.newAggregate;
    return {
        ...meta,
        schema,
        newAggregate,
        aggregateCommand,
        streamCommand
    };
};
//# sourceMappingURL=play-command-metadata.js.map