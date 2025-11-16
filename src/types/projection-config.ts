import {
  type AnyRule, isDeleteInformation,
  isInsertInformation,
  isReplaceInformation,
  isUpdateInformation,
  isUpsertInformation,
  type ThenType
} from "./rules.js";
import {cloneDeep} from "lodash-es";

export interface ProjectionConfig {
  name: string,
  live: boolean,
  cases: ProjectionConfigCase[]
}

export interface ProjectionConfigCase {
  given?: AnyRule[],
  when: string,
  then: ThenType,
}

export const normalizeProjectionConfig = (config: ProjectionConfig, informationFQCN: string): ProjectionConfig => {
  const modifiedConfig = cloneDeep(config);

  if(!modifiedConfig.cases) {
    modifiedConfig.cases = [];
  }

  modifiedConfig.cases.forEach(prjCase => {
    if(isInsertInformation(prjCase.then)) {
      prjCase.then.insert.information = informationFQCN;
    }

    if(isUpsertInformation(prjCase.then)) {
      prjCase.then.upsert.information = informationFQCN;
    }

    if(isUpdateInformation(prjCase.then)) {
      prjCase.then.update.information = informationFQCN;
    }

    if(isReplaceInformation(prjCase.then)) {
      prjCase.then.replace.information = informationFQCN;
    }

    if(isDeleteInformation(prjCase.then)) {
      prjCase.then.delete.information = informationFQCN;
    }
  })

  modifiedConfig.name = config.name || informationFQCN;

  if(typeof config.live === "undefined") {
    modifiedConfig.live = true;
  }

  return modifiedConfig;
}

export const convertProjectionConfigCaseToRules = (config: ProjectionConfigCase): AnyRule[] => {
  const rules: AnyRule[] = [];

  if(config.given) {
    rules.push(...config.given);
  }

  rules.push({
    rule: "always",
    then: config.then
  });

  return rules;
}
