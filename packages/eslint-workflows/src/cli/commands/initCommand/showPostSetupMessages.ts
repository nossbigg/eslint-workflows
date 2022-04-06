import { RcFile } from "../../../common";

type ConsoleMessage = { title: string; content: string };

export const showPostSetupMessages = (rcFile: RcFile) => {
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

const makeConsoleMessage = (msg: ConsoleMessage): string => {
  const { title, content } = msg;

  return `=============================================
${title}
=============================================
${content}`;
};
