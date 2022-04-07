import {
  findWorkflowEntryByRuleId,
  getCommonConfig,
  getWorkflowEntryTeamFiles,
  getWorkflowEntryTeams,
  getWorkflowsEntriesRuleIds,
  removeTeamFilesFromWorkflowEntry,
  replaceWorkflowEntryByRuleId,
  saveWorkflowsEntries,
  WorkflowsEntries,
  WorkflowsEntry,
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
  if (!selectedRuleId) {
    return;
  }

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
  if (!selectedTeam) {
    return;
  }

  const fileNames = getWorkflowEntryTeamFiles(matchingEntry, selectedTeam);
  const selectedFiles = await showMultiSelectPrompt({
    message: "Select file(s)",
    options: fileNames,
  });
  if (!selectedFiles) {
    return;
  }

  const updatedEntry: WorkflowsEntry = removeTeamFilesFromWorkflowEntry(
    matchingEntry,
    selectedFiles
  );
  const updatedYml: WorkflowsEntries = replaceWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId,
    updatedEntry
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};
