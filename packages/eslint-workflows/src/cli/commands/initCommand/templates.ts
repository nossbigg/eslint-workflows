import { RcFile } from "../../../common/rcfile/typedefs";

export const makeWorkflowsRcFileTemplate = (config: RcFile) => {
  const { eslintOutputPath, codeownersPath, workflowsEntriesPath } = config;
  const codeownersProperty =
    codeownersPath === undefined
      ? ""
      : `\n  codeownersPath: "${codeownersPath}",`;

  return `module.exports = {
  eslintOutputPath: "${eslintOutputPath}",${codeownersProperty}
  workflowsEntriesPath: "${workflowsEntriesPath}",
};
`;
};
