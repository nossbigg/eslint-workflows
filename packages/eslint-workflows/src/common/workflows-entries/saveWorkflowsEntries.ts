import fs from "fs";
import yaml, { DumpOptions } from "js-yaml";
import { WorkflowsEntries } from "./typedefs";
import { normalizeWorkflowsEntries } from "./normalizeWorkflowsEntries";

const yamlDumpOpts: DumpOptions = {
  // do not break lines for long file names
  lineWidth: -1,
  sortKeys: true,
};

export const saveWorkflowsEntries = (
  filePath: string,
  wfe: WorkflowsEntries,
  normalize = true
): void => {
  const finalWfe: WorkflowsEntries = normalize
    ? normalizeWorkflowsEntries(wfe)
    : wfe;

  const output = yaml.dump(finalWfe, yamlDumpOpts);
  fs.writeFileSync(filePath, output);
};
