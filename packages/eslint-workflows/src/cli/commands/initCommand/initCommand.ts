import fs from "fs-extra";
import { CommandHandler } from "../typedefs";
import { makeConfigFiles } from "./makeConfigFiles";
import { makePath } from "../../../common";
import { RcFile } from "../../../common/rcfile/typedefs";
import _ from "lodash";
import { showSelectPrompt } from "../../prompts";
import { showPostSetupMessages } from "./showPostSetupMessages";

export const initCommand: CommandHandler = async () => {
  // :CHECKS
  // check .eslint-workflowsrc.js present
  // check package.json present
  // check eslint-workflows-entries.yml present
  const projectRoot = getProjectRoot();
  const codeownersPath = await getCodeownersPath(projectRoot);

  const defaultRcFile: RcFile = {
    eslintOutputPath: "eslint-workflows/eslint-output.json",
    codeownersPath,
    workflowsEntriesPath: "eslint-workflows/eslint-workflows-entries.yml",
  };

  makeConfigFiles(projectRoot, defaultRcFile);
  showPostSetupMessages(defaultRcFile);
};

const getCodeownersPath = async (
  projectRoot: string
): Promise<string | undefined> => {
  const codeownersPaths = detectCodeownersFile(projectRoot);
  if (codeownersPaths.length === 0) {
    return undefined;
  }

  if (codeownersPaths.length === 1) {
    return codeownersPaths[0];
  }

  console.log("Multiple CODEOWNERS files detected.");
  const selectedPath = await showSelectPrompt({
    message: "Select CODEOWNERS",
    options: codeownersPaths,
  });
  return selectedPath;
};

const detectCodeownersFile = (projectRoot: string): string[] => {
  const pathsToLookAt = _.uniq([
    // github
    // ref: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners
    makePath("CODEOWNERS"),
    makePath(".github", "CODEOWNERS"),
    makePath("docs", "CODEOWNERS"),
    // gitlab
    // ref: https://docs.gitlab.com/ee/user/project/code_owners.html
    makePath("CODEOWNERS"),
    makePath(".gitlab", "CODEOWNERS"),
    makePath("docs", "CODEOWNERS"),
  ]);

  const matchingPaths = pathsToLookAt.filter((p) => {
    const absPath = makePath(projectRoot, p);
    const fileExists = fs.existsSync(absPath);
    return fileExists;
  });
  return matchingPaths;
};

const getProjectRoot = (): string => {
  return process.cwd();
};
