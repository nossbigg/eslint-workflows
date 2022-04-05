import fs from "fs";
import yaml, { DumpOptions } from "js-yaml";
import { WorkflowEntries } from "./typedefs";

const yamlDumpOpts: DumpOptions = {
  // do not break lines for long file names
  lineWidth: -1,
  sortKeys: true,
};

export const saveWorkflowsEntries = (
  filePath: string,
  workflowsEntries: WorkflowEntries
): void => {
  const output = yaml.dump(workflowsEntries, yamlDumpOpts);
  fs.writeFileSync(filePath, output);
};
