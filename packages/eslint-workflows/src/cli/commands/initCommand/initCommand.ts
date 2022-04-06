import { CommandHandler } from "../typedefs";
import { makeConfigFiles } from "./makeConfigFiles";
import { makePath } from "../../../common";
import { RcFile } from "../../../common/rcfile/typedefs";
import { showPostSetupMessages } from "./showPostSetupMessages";
import { getCodeownersPath } from "./getCodeownersPath";
import { doConfigFileChecks } from "./doConfigFileChecks";

export const initCommand: CommandHandler = async () => {
  const projectRoot = getProjectRoot();
  const workflowsEntriesPath = "eslint-workflows/eslint-workflows-entries.yml";

  const configFolderPath = makePath(projectRoot, "eslint-workflows");
  const rcFileFullPath = makePath(configFolderPath, ".eslint-workflowsrc.js");
  const wfeFullPath = makePath(configFolderPath, workflowsEntriesPath);

  const { confirm } = await doConfigFileChecks(rcFileFullPath, wfeFullPath);
  if (!confirm) {
    return;
  }

  const codeownersPath = await getCodeownersPath(projectRoot);

  const defaultRcFile: RcFile = {
    eslintOutputPath: "eslint-workflows/eslint-output.json",
    codeownersPath,
    workflowsEntriesPath,
  };

  makeConfigFiles(rcFileFullPath, defaultRcFile);
  showPostSetupMessages(defaultRcFile);
};

const getProjectRoot = (): string => {
  return process.cwd();
};
