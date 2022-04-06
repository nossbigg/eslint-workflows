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
  // lint:json -> package.json

  // :USEFUL MESSAGES
  // add ignore file to .gitignore
  // add getWorkflowOverrides() to .eslintrc.js
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

const getProjectRoot = (): string => {
  return process.cwd();
};
