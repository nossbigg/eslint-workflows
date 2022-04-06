import fs from "fs-extra";
import { CommandHandler } from "../typedefs";
import { makeWorkflowsRcFileTemplate } from "./templates";
import { makePath } from "../../../common";

export const initCommand: CommandHandler = async () => {
  // :CHECKS
  // check .eslint-workflowsrc.js present
  // check package.json present
  // check eslint-workflows-entries.yml present
  // check CODEOWNER presence (github/gitlab)

  // :ADD CONFIGS
  // .eslint-workflowsrc.js (+precomputed properties)
  await makeFile.rcFile();
  // lint:json -> package.json
  // eslint-workflows-entries.yml

  // :USEFUL MESSAGES
  // add ignore file to .gitignore
  // add getWorkflowOverrides() to .eslintrc.js
};

const makeFile = {
  rcFile: async () => {
    const filePath = makePath(
      getProjectRoot(),
      "eslint-workflows",
      ".eslint-workflowsrc.js"
    );
    const fileContent = makeWorkflowsRcFileTemplate();

    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, fileContent);
  },
};

const getProjectRoot = (): string => {
  return process.cwd();
};
