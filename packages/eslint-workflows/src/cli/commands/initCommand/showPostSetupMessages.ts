import chalk from "chalk";
import { consoleLog, RcFile } from "../../../common";

type ConsoleMessage = { title: string; content: string };

export const showPostSetupMessages = (rcFile: RcFile) => {
  consoleLog(`🚀 ${chalk.green("Config files created!")}`);
  consoleLog();
  consoleLog(`👀 ${chalk.bold("Manual steps required for complete setup:")}`);

  const lintJsonMessage: ConsoleMessage = {
    title: chalk.bold("1. Add lint:json task to package.json"),
    content: `// package.json
{
  "scripts": {
    "lint:json": "eslint --format=json-with-metadata --output-file='${rcFile.eslintOutputPath}'"
  }
}`,
  };

  const gitignoreMessage: ConsoleMessage = {
    title: chalk.bold("2. Add eslint output file to .gitignore"),
    content: `// .gitignore
${rcFile.eslintOutputPath}`,
  };

  const addOverridesMessage: ConsoleMessage = {
    title: chalk.bold("3. Add getWorfklowOverrides() to .eslintrc.js"),
    content: `// .eslintrc.js
const { getWorkflowOverrides } = require("@nossbigg/eslint-workflows");
module.exports = {
  overrides: getWorkflowOverrides(),
};`,
  };

  const messages: ConsoleMessage[] = [
    lintJsonMessage,
    gitignoreMessage,
    addOverridesMessage,
  ];
  messages.forEach((msg) => {
    consoleLog(makeConsoleMessage(msg));
    consoleLog();
  });
};

const makeConsoleMessage = (msg: ConsoleMessage): string => {
  const { title, content } = msg;

  return `=============================================
${title}
=============================================
${content}`;
};
