import fs from "fs-extra";
import _ from "lodash";
import { makePath } from "../../../common";
import { showSelectPrompt } from "../../prompts";

export const getCodeownersPath = async (
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
  const matchingPaths = CODEOWNERS_PATHS.filter((p) => {
    const absPath = makePath(projectRoot, p);
    const fileExists = fs.existsSync(absPath);
    return fileExists;
  });
  return matchingPaths;
};

const CODEOWNERS_PATHS = _.uniq([
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
