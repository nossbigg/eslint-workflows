import {
  findWorkflowEntryByRuleId,
  getCommonConfig,
  getWorkflowEntryTeamFiles,
  getWorkflowEntryTeams,
  getWorkflowsEntriesRuleIds,
  removeTeamFilesFromWorkflowEntry,
  replaceWorkflowEntryByRuleId,
  saveWorkflowsEntries,
  WorkflowEntries,
  WorkflowEntry,
} from "../../../../common";
import { showMultiSelectPrompt, showSelectPrompt } from "../../../prompts";
import { CommandHandler } from "../../typedefs";

export const removeEntryTeamFile: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { workflowsEntries, rcFile } = commonConfig;

  const entriesRuleIds = getWorkflowsEntriesRuleIds(workflowsEntries);
  const selectedRuleId = await showSelectPrompt({
    message: "Select entry",
    options: entriesRuleIds,
  });

  const matchingEntry = findWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId
  );
  if (!matchingEntry) {
    return;
  }

  const teamIds = getWorkflowEntryTeams(matchingEntry);
  const selectedTeam = await showSelectPrompt({
    message: "Select team",
    options: teamIds,
  });

  const fileNames = getWorkflowEntryTeamFiles(matchingEntry, selectedTeam);
  const selectedFiles = await showMultiSelectPrompt({
    message: "Select file(s)",
    options: fileNames,
  });

  const updatedEntry: WorkflowEntry = removeTeamFilesFromWorkflowEntry(
    matchingEntry,
    selectedTeam,
    selectedFiles
  );
  const updatedYml: WorkflowEntries = replaceWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId,
    updatedEntry
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};
