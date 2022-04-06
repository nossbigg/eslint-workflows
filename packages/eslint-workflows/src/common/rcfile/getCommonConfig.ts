import { getCodeowners } from "../codeowners";
import { getEslintOutput } from "../eslint";
import { getWorkflowsEntries } from "../workflows-entries";
import { getRcFile } from "./getRcFile";
import { CommonConfig } from "./typedefs";

export const getCommonConfig = (): CommonConfig => {
  const rcFile = getRcFile();
  const { codeownersPath, eslintOutputPath, workflowsEntriesPath } = rcFile;

  const eslintOutput = getEslintOutput(eslintOutputPath);
  const codeowners = getCodeowners(codeownersPath);
  const { json: workflowsEntries } = getWorkflowsEntries(workflowsEntriesPath);

  const result: CommonConfig = {
    rcFile,
    eslintOutput,
    codeowners,
    workflowsEntries,
  };
  return result;
};
