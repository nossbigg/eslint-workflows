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

export const initCommand: CommandHandler = () => {
  // :CHECKS
  // check .eslint-workflowsrc.js present
  // check package.json present
  // check eslint-workflows-entries.yml present
  // check CODEOWNER presence (github/gitlab)

  const defaultRcFile: RcFile = {
    eslintOutputPath: "eslint-workflows/eslint-output.json",
    codeownersPath: ".github/CODEOWNERS",
    workflowsEntriesPath: "eslint-workflows/eslint-workflows-entries.yml",
  };

  makeFile.rcFile(defaultRcFile);
  makeFile.workflowsEntries(
    defaultRcFile.workflowsEntriesPath,
    EMPTY_WORKFLOWS_ENTRIES
  );

  showMessages(defaultRcFile);
};

const makeFile = {
  rcFile: (rcFile: RcFile) => {
    const filePath = makePath(
      getProjectRoot(),
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
