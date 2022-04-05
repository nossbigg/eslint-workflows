import { NO_OWNER_NAME } from "../codeowners/constants";
import { WorkflowEntries, WorkflowEntry } from "./typedefs";

export const getWorkflowsEntriesRuleIds = (
  workflowsEntries: WorkflowEntries
): string[] => {
  const result = workflowsEntries.entries.map((e) => e.ruleId);
  return result;
};

export const removeWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowEntries,
  targetRuleId: string
): WorkflowEntries => {
  const withoutEntry = workflowsEntries.entries.filter(
    (e) => e.ruleId !== targetRuleId
  );
  const result: WorkflowEntries = {
    ...workflowsEntries,
    entries: withoutEntry,
  };
  return result;
};

export const makeBaseWorkflowEntry = (
  ruleId: string,
  teamNames: string[]
): WorkflowEntry => {
  const teams = teamNames.reduce(
    (acc, teamName) => {
      const res: WorkflowEntry["teams"] = { ...acc, [teamName]: { files: [] } };
      return res;
    },
    {
      [NO_OWNER_NAME]: { files: [] },
    } as WorkflowEntry["teams"]
  );

  const entry: WorkflowEntry = {
    ruleId,
    teams,
  };
  return entry;
};
