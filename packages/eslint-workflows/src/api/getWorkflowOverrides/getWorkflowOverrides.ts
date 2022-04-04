import _ from "lodash";
import { getCommonConfig, getWorkflowsEntries } from "../../common";
import { WorkflowOverride } from "./typedefs";

export const getWorkflowOverrides = (): WorkflowOverride[] => {
  const { rcFile } = getCommonConfig();
  const { workflowsEntriesPath } = rcFile;

  const yml = getWorkflowsEntries(workflowsEntriesPath);
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
