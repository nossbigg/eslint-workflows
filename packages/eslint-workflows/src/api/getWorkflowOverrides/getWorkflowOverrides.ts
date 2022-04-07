import _ from "lodash";
import { CommonConfig, getCommonConfig } from "../../common";
import { WorkflowOverride } from "./typedefs";

export const getWorkflowOverrides = (): WorkflowOverride[] => {
  const isDisabled = isOverridesDisabled();
  if (isDisabled) {
    return [];
  }

  let commonConfig: CommonConfig;
  try {
    commonConfig = getCommonConfig();
  } catch (e) {
    process.exit(1);
  }

  const { workflowsEntries: yml } = commonConfig;
  const overrides: WorkflowOverride[] = yml.entries.map((entry) => {
    const { ruleId, teams } = entry;
    const fileNames = Object.values(teams).flatMap((team) => team.files);
    const uniqueFileNames = _.uniq(fileNames);

    const overrideConfig: WorkflowOverride = {
      files: uniqueFileNames,
      rules: { [ruleId]: 0 },
    };
    return overrideConfig;
  });
  return overrides;
};

const isOverridesDisabled = (): boolean => {
  const envVar = process.env.ESLINT_WORKFLOWS_DISABLE;
  const isDisabled = envVar === "1" || envVar === "true";
  return isDisabled;
};
