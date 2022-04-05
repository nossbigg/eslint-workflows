import {
  findWorkflowEntryByRuleId,
  getCommonConfig,
  getWorkflowEntryTeams,
  getWorkflowsEntriesRuleIds,
  removeTeamsFromWorkflowEntry,
  replaceWorkflowEntryByRuleId,
  saveWorkflowsEntries,
  WorkflowEntries,
  WorkflowEntry,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommandHandler } from "../../typedefs";

export const removeEntryTeam: CommandHandler = async () => {
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

  const updatedEntry: WorkflowEntry = removeTeamsFromWorkflowEntry(
    matchingEntry,
    [selectedTeam]
  );
  const updatedYml: WorkflowEntries = replaceWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId,
    updatedEntry
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};
