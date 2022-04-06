import { RcFile } from "../../../common/rcfile/typedefs";

export const makeWorkflowsRcFileTemplate = () => {
  const config: RcFile = {
    eslintOutputPath: "eslint-workflows/eslint-output.json",
    codeownersPath: ".github/CODEOWNERS",
    workflowsEntriesPath: "eslint-workflows/eslint-workflows-entries.yml",
  };
  return `module.exports = {
  eslintOutputPath: "${config.eslintOutputPath}",
  codeownersPath: "${config.codeownersPath}",
  workflowsEntriesPath: "${config.workflowsEntriesPath}",
};
`;
};
