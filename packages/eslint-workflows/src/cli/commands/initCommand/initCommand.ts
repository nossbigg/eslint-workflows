import fs from "fs-extra";
import { CommandHandler } from "../typedefs";
import { makeWorkflowsRcFileTemplate } from "./templates";
import {
  EMPTY_WORKFLOWS_ENTRIES,
  makePath,
  makeWorkflowsEntriesYmlDump,
  WorkflowsEntries,
} from "../../../common";
import { RcFile } from "../../../common/rcfile/typedefs";
import _ from "lodash";
import { showSelectPrompt } from "../../prompts";

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

  makeFile.rcFile(projectRoot, defaultRcFile);
  makeFile.workflowsEntries(
    defaultRcFile.workflowsEntriesPath,
    EMPTY_WORKFLOWS_ENTRIES
  );

  showMessages(defaultRcFile);
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

const makeFile = {
  rcFile: (projectRoot: string, rcFile: RcFile) => {
    const filePath = makePath(
      projectRoot,
      "eslint-workflows",
      ".eslint-workflowsrc.js"
    );
    const fileContent = makeWorkflowsRcFileTemplate(rcFile);

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, fileContent);
  },
  workflowsEntries: (filePath: string, wfe: WorkflowsEntries) => {
    const fileContent = makeWorkflowsEntriesYmlDump(wfe);

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, fileContent);
  },
};

type ConsoleMessage = { title: string; content: string };

const showMessages = (rcFile: RcFile) => {
  const lintJsonMessage: ConsoleMessage = {
    title: "1. Add lint:json task to package.json",
    content: `// package.json
{
  "scripts": {
    "lint:json": "eslint --format=json-with-metadata --output-file='${rcFile.eslintOutputPath}'"
  }
}`,
  };

  const gitignoreMessage: ConsoleMessage = {
    title: "2. Add eslint output file to .gitignore",
    content: `// .gitignore
${rcFile.eslintOutputPath}`,
  };

  const addOverridesMessage: ConsoleMessage = {
    title: "3. Add getWorfklowOverrides() to .eslintrc.js",
    content: `// .eslintrc.js
const { getWorkflowOverrides } = require("@nossbigg/eslint-workflows");
module.exports = {
  overrides: getWorkflowsOverrides(),
};`,
  };

  const messages: ConsoleMessage[] = [
    lintJsonMessage,
    gitignoreMessage,
    addOverridesMessage,
  ];
  messages.forEach((msg) => {
    console.log(makeConsoleMessage(msg));
    console.log();
  });
};

const getProjectRoot = (): string => {
  return process.cwd();
};

const makeConsoleMessage = (msg: ConsoleMessage): string => {
  const { title, content } = msg;

  return `=============================================
${title}
=============================================
${content}`;
};
