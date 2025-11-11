export const camelCaseToTitle = (str) => {
    str = str.replace(/([A-Z](?=[A-Z][a-z])|[^A-Z](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z]))/g, '$1 ');
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const snakeCaseToCamelCase = (str) => {
    if (str === '') {
        return str;
    }
    str = str.split('_').map(part => part.length > 0 ? part[0].toUpperCase() + part.slice(1) : '').join('');
    return str[0].toLowerCase() + str.slice(1);
};
//# sourceMappingURL=string.js.map