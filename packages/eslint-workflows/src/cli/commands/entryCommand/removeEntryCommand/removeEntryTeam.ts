import {
  findWorkflowEntryByRuleId,
  getCommonConfig,
  getWorkflowEntryTeams,
  getWorkflowsEntriesRuleIds,
  removeTeamsFromWorkflowEntry,
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

export const removeEntryTeam: CommandHandler = async () => {
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
  const selectedTeams = await showMultiSelectPrompt({
    message: "Select team(s)",
    options: teamIds,
  });
  if (!selectedTeams) {
    showNoChangesAppliedMessage();
    return;
  }

  const updatedEntry: WorkflowsEntry = removeTeamsFromWorkflowEntry(
    matchingEntry,
    selectedTeams
  );
  const updatedYml: WorkflowsEntries = replaceWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId,
    updatedEntry
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
  showChangesAppliedMessage();
};
