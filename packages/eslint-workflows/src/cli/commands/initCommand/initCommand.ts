import fs from "fs-extra";
import { CommandHandler } from "../typedefs";
import { makeConfigFiles } from "./makeConfigFiles";
import { makePath } from "../../../common";
import { RcFile } from "../../../common/rcfile/typedefs";
import { showPostSetupMessages } from "./showPostSetupMessages";
import { getCodeownersPath } from "./getCodeownersPath";
import { showConfirmPrompt } from "../../prompts";

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

type DoConfigFileChecksReturn = { confirm: boolean };

const doConfigFileChecks = async (
  rcFilePath: string,
  wfePath: string
): Promise<DoConfigFileChecksReturn> => {
  const checks = [
    {
      title: "rc file",
      filePath: rcFilePath,
      check: fs.existsSync(rcFilePath),
    },
    { title: "yml file", filePath: wfePath, check: fs.existsSync(wfePath) },
  ];

  console.log("= File Checks =");
  checks.forEach((c) => {
    const { title, filePath, check } = c;
    const icon = check ? "✅" : "❌";
    console.log(`${icon} ${title} (${filePath})`);
  });

  const hasError = !!checks.find((c) => c.check);
  if (!hasError) {
    return { confirm: true };
  }

  const confirm = await showConfirmPrompt({
    initial: false,
    message: "Overwrite existing config files?",
  });
  return { confirm };
};

const getProjectRoot = (): string => {
  return process.cwd();
};
