import {names} from "./names.js";

export const camelCaseToTitle = (str: string): string => {
  str = str.replace(/([A-Z]+)(?=[A-Z][a-z])|([A-Z](?=[A-Z][a-z])|[^A-Z](?=[A-Z])|[a-zA-Z](?=[^a-zA-Z]))/g, '$1$2 ');
  return str.charAt(0).toUpperCase() + str.slice(1).split(" ").filter(w => w !== "").join(" ");
}

export const snakeCaseToCamelCase = (str: string): string => {
  if(str === '') {
    return str;
  }

  str = str.split('_').map(part => part.length > 0? part[0]!.toUpperCase() + part.slice(1) : '').join('');
  return str[0]!.toLowerCase() + str.slice(1);
}
