import { isPropertyRef, splitPropertyRef } from "./resolve-refs.js";
import { names } from "../../utils/names.js";
export const normalizeRefs = (schema, defaultSystemName) => {
    return visitRef(schema, ref => {
        const isPropRef = isPropertyRef(ref);
        const [refWithoutProp, prop] = isPropRef ? splitPropertyRef(ref) : [ref, ''];
        const refParts = refWithoutProp.split("/");
        if (refParts.length === 0) {
            return ref;
        }
        if (refParts[0] === "#" || refParts[0] === "") {
            refParts.shift();
        }
        // index 0 should be "definitions" now and 1 the service, if not add service part
        if (refParts.length < 2) {
            return names(refParts[0]).fileName;
        }
        const systemNames = names(defaultSystemName);
        if (refParts[1] !== systemNames.fileName) {
            refParts.splice(1, 0, systemNames.fileName);
        }
        return '/' + refParts.map(p => names(p).fileName).join('/') + (isPropRef ? ':' + prop : '');
    });
};
export const visitRef = (schema, visitor) => {
    const internalSchema = schema;
    if (internalSchema['$id']) {
        internalSchema['$id'] = visitor(internalSchema['$id']);
    }
    if (internalSchema['$ref']) {
        internalSchema['$ref'] = visitor(internalSchema['$ref']);
    }
    if (internalSchema['properties']) {
        for (const prop in internalSchema['properties']) {
            internalSchema['properties'][prop] = visitRef(internalSchema['properties'][prop], visitor);
        }
    }
    if (internalSchema['items']) {
        internalSchema['items'] = visitRef(internalSchema['items'], visitor);
    }
    return internalSchema;
};
//# sourceMappingURL=normalize-refs.js.map