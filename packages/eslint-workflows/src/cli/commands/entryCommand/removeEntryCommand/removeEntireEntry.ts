import {
  getCommonConfig,
  getWorkflowsEntriesRuleIds,
  removeWorkflowEntryByRuleId,
  saveWorkflowsEntries,
  WorkflowEntries,
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

  const updatedYml: WorkflowEntries = removeWorkflowEntryByRuleId(
    workflowsEntries,
    selectedRuleId
  );
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};