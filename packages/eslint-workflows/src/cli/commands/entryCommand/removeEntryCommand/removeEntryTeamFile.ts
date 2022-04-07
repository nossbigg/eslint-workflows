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
import {
  showChangesAppliedMessage,
  showNoChangesAppliedMessage,
} from "../../common";
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
    showNoChangesAppliedMessage();
    return;
  }

  const matchingEntry = findWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId
  );
  if (!matchingEntry) {
    showNoChangesAppliedMessage();
    return;
  }

  const teamIds = getWorkflowEntryTeams(matchingEntry);
  const selectedTeam = await showSelectPrompt({
    message: "Select team",
    options: teamIds,
  });
  if (!selectedTeam) {
    showNoChangesAppliedMessage();
    return;
  }

  const fileNames = getWorkflowEntryTeamFiles(matchingEntry, selectedTeam);
  const selectedFiles = await showMultiSelectPrompt({
    message: "Select file(s)",
    options: fileNames,
  });
  if (!selectedFiles) {
    showNoChangesAppliedMessage();
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
  showChangesAppliedMessage();
};
