import fs from "fs";
import yaml from "js-yaml";
import { WorkflowEntries } from "./typedefs";

export const getWorkflowsEntries = (filePath: string): WorkflowEntries => {
  const fileRaw = fs.readFileSync(filePath).toString("utf8");
  const json: WorkflowEntries = yaml.load(fileRaw) as WorkflowEntries;
  return json;
};
