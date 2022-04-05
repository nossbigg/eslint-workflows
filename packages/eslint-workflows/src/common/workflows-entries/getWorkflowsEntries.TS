import fs from "fs";
import yaml from "js-yaml";
import { WorkflowsEntries } from "./typedefs";

export const getWorkflowsEntries = (filePath: string): WorkflowsEntries => {
  const fileRaw = fs.readFileSync(filePath).toString("utf8");
  const json: WorkflowsEntries = yaml.load(fileRaw) as WorkflowsEntries;
  return json;
};
