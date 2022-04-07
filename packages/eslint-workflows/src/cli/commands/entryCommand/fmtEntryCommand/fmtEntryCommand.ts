import { getCommonConfig, saveWorkflowsEntries } from "../../../../common";
import { showChangesAppliedMessage } from "../../common";
import { CommandHandler } from "../../typedefs";

export const fmtEntryCommand: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { workflowsEntries, rcFile } = commonConfig;

  saveWorkflowsEntries(rcFile.workflowsEntriesPath, workflowsEntries);
  showChangesAppliedMessage();
};
