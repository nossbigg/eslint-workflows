import fs from "fs";
import yaml from "js-yaml";
import { isFileExists } from "../fs";
import { WorkflowsEntries } from "./typedefs";

type GetWorkflowsEntriesReturn = { json: WorkflowsEntries; raw: string };

export const getWorkflowsEntries = (
  filePath: string
): GetWorkflowsEntriesReturn => {
  if (!isFileExists(filePath)) {
    console.log(`❌ yml file not found! (expected file: ${filePath})`);
    throw new Error();
  }

  let raw: string;
  let json: WorkflowsEntries;
  try {
    raw = fs.readFileSync(filePath).toString("utf8");
    json = yaml.load(raw) as WorkflowsEntries;
  } catch (e) {
    console.log(`❌ Error loading yml file! (file: ${filePath})`);
    throw e;
  }

  return { json, raw };
};
