import { camelCase, kebabCase, snakeCase, startCase } from "lodash-es";
export const names = (str) => {
    return {
        name: str,
        className: startCase(camelCase(str)).replace(/ /g, ''),
        propertyName: camelCase(str),
        constantName: snakeCase(str).toUpperCase(),
        fileName: kebabCase(str),
    };
};
//# sourceMappingURL=names.js.map