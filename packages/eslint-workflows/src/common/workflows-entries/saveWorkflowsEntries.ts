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

  const output = makeWorkflowsEntriesYmlDump(wfe);
  fs.writeFileSync(filePath, output);
};

export const makeWorkflowsEntriesYmlDump = (wfe: WorkflowsEntries): string => {
  const output = yaml.dump(wfe, yamlDumpOpts);
  return output;
};
