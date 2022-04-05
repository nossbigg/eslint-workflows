import { Codeowners } from "../codeowners";
import { EslintOutput } from "../eslint";
import { WorkflowsEntries } from "../workflows-entries";

export type RcFile = {
  eslintOutputPath: string;
  codeownersPath: string;
  workflowsEntriesPath: string;
};

export type CommonConfig = {
  rcFile: RcFile;
  eslintOutput: EslintOutput;
  codeowners: Codeowners;
  workflowsEntries: WorkflowsEntries;
};
