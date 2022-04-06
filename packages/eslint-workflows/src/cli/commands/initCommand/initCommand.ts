import { CommandHandler } from "../typedefs";
import { makeConfigFiles } from "./makeConfigFiles";
import { getProjectRoot, makePath, RcFile } from "../../../common";
import { showPostSetupMessages } from "./showPostSetupMessages";
import { getCodeownersPath } from "./getCodeownersPath";
import { doConfigFileChecks } from "./doConfigFileChecks";

export const initCommand: CommandHandler = async () => {
  const projectRoot = getProjectRoot();
  const workflowsEntriesFileName = "eslint-workflows-entries.yml";

  const configFolderPath = makePath(projectRoot, "eslint-workflows");
  const rcFileFullPath = makePath(configFolderPath, ".eslint-workflowsrc.js");
  const wfeFullPath = makePath(configFolderPath, workflowsEntriesFileName);

  const { confirm } = await doConfigFileChecks(rcFileFullPath, wfeFullPath);
  if (!confirm) {
    return;
  }

  const codeownersPath = await getCodeownersPath(projectRoot);

  const defaultRcFile: RcFile = {
    eslintOutputPath: makePath("eslint-workflows", "eslint-output.json"),
    codeownersPath,
    workflowsEntriesPath: makePath(
      "eslint-workflows",
      workflowsEntriesFileName
    ),
  };

  makeConfigFiles(rcFileFullPath, defaultRcFile);
  showPostSetupMessages(defaultRcFile);
};
