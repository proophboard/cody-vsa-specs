import {names} from "../../utils/names.js";

export const renameFQCN = (fqcn: string, newTypeName: string): string => {
  const parts = fqcn.split(".");

  parts.pop();
  parts.push(names(newTypeName).className);

  return parts.join(".");
}
