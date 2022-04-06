import fs from "fs-extra";
import { makeWorkflowsRcFileTemplate } from "./templates";
import {
  EMPTY_WORKFLOWS_ENTRIES,
  makeWorkflowsEntriesYmlDump,
  WorkflowsEntries,
  RcFile,
} from "../../../common";

export const makeConfigFiles = (rcFilePath: string, rcFile: RcFile) => {
  makeConfigFile.rcFile(rcFilePath, rcFile);
  makeConfigFile.workflowsEntries(
    rcFile.workflowsEntriesPath,
    EMPTY_WORKFLOWS_ENTRIES
  );
};

const makeConfigFile = {
  rcFile: (filePath: string, rcFile: RcFile) => {
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
