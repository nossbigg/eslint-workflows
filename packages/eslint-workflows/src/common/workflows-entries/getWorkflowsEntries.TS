import fs from "fs";
import yaml from "js-yaml";
import { WorkflowsEntries } from "./typedefs";

type GetWorkflowsEntriesReturn = { json: WorkflowsEntries; raw: string };

export const getWorkflowsEntries = (
  filePath: string
): GetWorkflowsEntriesReturn => {
  const raw = fs.readFileSync(filePath).toString("utf8");
  const json: WorkflowsEntries = yaml.load(raw) as WorkflowsEntries;
  return { json, raw };
};
