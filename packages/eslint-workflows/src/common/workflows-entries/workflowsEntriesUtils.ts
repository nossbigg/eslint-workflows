import _ from "lodash";
import { NO_OWNER_NAME } from "../codeowners/constants";
import { WorkflowEntries, WorkflowEntry } from "./typedefs";

// WorkflowEntries
export const getWorkflowsEntriesRuleIds = (
  workflowsEntries: WorkflowEntries
): string[] => {
  const result = workflowsEntries.entries.map((e) => e.ruleId);
  return result;
};

export const findWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowEntries,
  targetRuleId: string
): WorkflowEntry | undefined => {
  const entry = workflowsEntries.entries.find((e) => e.ruleId === targetRuleId);
  return entry;
};

export const replaceWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowEntries,
  targetRuleId: string,
  newEntry: WorkflowEntry
): WorkflowEntries => {
  const withReplacedEntry = workflowsEntries.entries.map((entry) => {
    const isTargetEntry = entry.ruleId === targetRuleId;
    if (!isTargetEntry) {
      return entry;
    }
    return newEntry;
  });

  const result: WorkflowEntries = {
    ...workflowsEntries,
    entries: withReplacedEntry,
  };
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

// WorkflowEntry
export const getWorkflowEntryTeams = (entry: WorkflowEntry): string[] => {
  const result = Object.keys(entry.teams);
  return result;
};

export const removeTeamsFromWorkflowEntry = (
  entry: WorkflowEntry,
  teams: string[]
): WorkflowEntry => {
  const withoutTeam = _.omit(entry.teams, teams);
  const result: WorkflowEntry = { ...entry, teams: withoutTeam };
  return result;
};

// seed data
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
