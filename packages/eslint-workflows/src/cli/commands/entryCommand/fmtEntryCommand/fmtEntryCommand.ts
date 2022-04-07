import chalk from "chalk";
import {
  consoleLog,
  getCommonConfig,
  saveWorkflowsEntries,
} from "../../../../common";
import { CommandHandler } from "../../typedefs";

export const fmtEntryCommand: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { workflowsEntries, rcFile } = commonConfig;

  saveWorkflowsEntries(rcFile.workflowsEntriesPath, workflowsEntries);
  consoleLog(chalk.green("✅ yml formatted!"));
};
