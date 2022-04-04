import fs from "fs";
import yaml from "js-yaml";
import { WorkflowEntries } from "./typedefs";

export const saveWorkflowsEntries = (
  filePath: string,
  workflowsEntries: WorkflowEntries
): void => {
  const output = yaml.dump(workflowsEntries);
  fs.writeFileSync(filePath, output);
};
