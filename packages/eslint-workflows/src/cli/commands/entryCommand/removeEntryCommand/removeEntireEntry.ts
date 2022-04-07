import {
  getCommonConfig,
  getWorkflowsEntriesRuleIds,
  removeWorkflowEntryByRuleId,
  saveWorkflowsEntries,
  WorkflowsEntries,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommandHandler } from "../../typedefs";

export const removeEntireEntry: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { workflowsEntries, rcFile } = commonConfig;

  const entriesRuleIds = getWorkflowsEntriesRuleIds(workflowsEntries);
  const selectedRuleId = await showSelectPrompt({
    message: "Select entry to remove",
    options: entriesRuleIds,
  });
  if (!selectedRuleId) {
    return;
  }

  const updatedYml: WorkflowsEntries = removeWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};
