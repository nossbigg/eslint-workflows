import _ from "lodash";
import { NO_OWNER_NAME } from "../codeowners/constants";
import { WorkflowsEntries, WorkflowsEntry, WorkflowsTeamEntry } from "./typedefs";

// WorkflowEntries
export const getWorkflowsEntriesRuleIds = (
  workflowsEntries: WorkflowsEntries
): string[] => {
  const result = workflowsEntries.entries.map((e) => e.ruleId);
  return result;
};

export const findWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowsEntries,
  targetRuleId: string
): WorkflowsEntry | undefined => {
  const entry = workflowsEntries.entries.find((e) => e.ruleId === targetRuleId);
  return entry;
};

export const replaceWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowsEntries,
  targetRuleId: string,
  newEntry: WorkflowsEntry
): WorkflowsEntries => {
  const withReplacedEntry = workflowsEntries.entries.map((entry) => {
    const isTargetEntry = entry.ruleId === targetRuleId;
    if (!isTargetEntry) {
      return entry;
    }
    return newEntry;
  });

  const result: WorkflowsEntries = {
    ...workflowsEntries,
    entries: withReplacedEntry,
  };
  return result;
};

export const removeWorkflowEntryByRuleId = (
  workflowsEntries: WorkflowsEntries,
  targetRuleId: string
): WorkflowsEntries => {
  const withoutEntry = workflowsEntries.entries.filter(
    (e) => e.ruleId !== targetRuleId
  );

  const result: WorkflowsEntries = {
    ...workflowsEntries,
    entries: withoutEntry,
  };
  return result;
};

// WorkflowEntry
export const getWorkflowEntryTeams = (entry: WorkflowsEntry): string[] => {
  const result = Object.keys(entry.teams);
  return result;
};

export const getWorkflowEntryTeamFiles = (
  entry: WorkflowsEntry,
  team: string
): string[] => {
  const teamEntry = entry.teams[team];
  if (!teamEntry) {
    return [];
  }

  const result = teamEntry.files;
  return result;
};

export const removeTeamsFromWorkflowEntry = (
  entry: WorkflowsEntry,
  teams: string[]
): WorkflowsEntry => {
  const withoutTeam = _.omit(entry.teams, teams);
  const result: WorkflowsEntry = { ...entry, teams: withoutTeam };
  return result;
};

export const removeTeamFilesFromWorkflowEntry = (
  entry: WorkflowsEntry,
  teamId: string,
  fileNames: string[]
): WorkflowsEntry => {
  const matchingTeam = entry.teams[teamId];
  if (!matchingTeam) {
    return entry;
  }

  const fileNamesSet = new Set(fileNames);
  const withFilteredFiles = matchingTeam.files.filter(
    (f) => !fileNamesSet.has(f)
  );

  const updatedTeam: WorkflowsTeamEntry = {
    ...matchingTeam,
    files: withFilteredFiles,
  };
  const updatedEntry: WorkflowsEntry = {
    ...entry,
    teams: { ...entry.teams, [teamId]: updatedTeam },
  };
  return updatedEntry;
};

// seed data
export const makeBaseWorkflowEntry = (
  ruleId: string,
  teamNames: string[]
): WorkflowsEntry => {
  const teams = teamNames.reduce(
    (acc, teamName) => {
      const res: WorkflowsEntry["teams"] = { ...acc, [teamName]: { files: [] } };
      return res;
    },
    {
      [NO_OWNER_NAME]: { files: [] },
    } as WorkflowsEntry["teams"]
  );

  const entry: WorkflowsEntry = {
    ruleId,
    teams,
  };
  return entry;
};
