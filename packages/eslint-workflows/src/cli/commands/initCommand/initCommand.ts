import { CommandHandler } from "../typedefs";
import { makeConfigFiles } from "./makeConfigFiles";
import { makePath } from "../../../common";
import { RcFile } from "../../../common/rcfile/typedefs";
import { showPostSetupMessages } from "./showPostSetupMessages";
import { getCodeownersPath } from "./getCodeownersPath";

export const initCommand: CommandHandler = async () => {
  // :CHECKS
  // check .eslint-workflowsrc.js present
  // check package.json present
  // check eslint-workflows-entries.yml present
  const projectRoot = getProjectRoot();
  const rcFilePath = makePath(
    projectRoot,
    "eslint-workflows",
    ".eslint-workflowsrc.js"
  );
  const codeownersPath = await getCodeownersPath(projectRoot);

  const defaultRcFile: RcFile = {
    eslintOutputPath: "eslint-workflows/eslint-output.json",
    codeownersPath,
    workflowsEntriesPath: "eslint-workflows/eslint-workflows-entries.yml",
  };

  makeConfigFiles(rcFilePath, defaultRcFile);
  showPostSetupMessages(defaultRcFile);
};

const getProjectRoot = (): string => {
  return process.cwd();
};
