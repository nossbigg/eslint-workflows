import chalk from "chalk";
import {
  consoleLog,
  getCommonConfig,
  WorkflowsEntry,
  WorkflowsTeamEntry,
} from "../../../common";
import { CommandHandler } from "../typedefs";

export const viewCommand: CommandHandler = async () => {
  const { workflowsEntries } = getCommonConfig();
  const { entries } = workflowsEntries;

  const hasNoEntries = entries.length === 0;
  if (hasNoEntries) {
    consoleLog(chalk.gray("No entries."));
    return;
  }

  entries.map(printEntry);
};

const printEntry = (entry: WorkflowsEntry) => {
  const { ruleId, teams } = entry;

  consoleLog(chalk.underline.bold(`Rule: ${ruleId}`));
  Object.keys(teams).forEach((teamName) =>
    printEntryTeams(teamName, entry.teams[teamName])
  );
  consoleLog();
};

const printEntryTeams = (teamName: string, teamEntry: WorkflowsTeamEntry) => {
  consoleLog(chalk.bold(`  Owner: ${teamName}`));
  teamEntry.files.forEach((fileName) => {
    consoleLog(`    ${fileName}`);
  });
};
