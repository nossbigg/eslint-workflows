import { RcFile } from "../../../common/rcfile/typedefs";

export const makeWorkflowsRcFileTemplate = (config: RcFile) => {
  const { eslintOutputPath, codeownersPath, workflowsEntriesPath } = config;

  return `module.exports = {
  eslintOutputPath: "${eslintOutputPath}",
  codeownersPath: "${codeownersPath}",
  workflowsEntriesPath: "${workflowsEntriesPath}",
};
`;
};
