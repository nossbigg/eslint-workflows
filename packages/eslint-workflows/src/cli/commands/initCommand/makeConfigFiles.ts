import fs from "fs-extra";
import { makeWorkflowsRcFileTemplate } from "./templates";
import {
  EMPTY_WORKFLOWS_ENTRIES,
  makePath,
  makeWorkflowsEntriesYmlDump,
  WorkflowsEntries,
  RcFile,
} from "../../../common";

export const makeConfigFiles = (projectRoot: string, rcFile: RcFile) => {
  makeConfigFile.rcFile(projectRoot, rcFile);
  makeConfigFile.workflowsEntries(
    rcFile.workflowsEntriesPath,
    EMPTY_WORKFLOWS_ENTRIES
  );
};

const makeConfigFile = {
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
