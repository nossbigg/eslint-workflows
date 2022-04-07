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
    consoleLog("No entries found.");
    return;
  }

  entries.map(printEntry);
};

const printEntry = (entry: WorkflowsEntry) => {
  const { ruleId, teams } = entry;

  consoleLog(`Rule: ${ruleId}`);
  Object.keys(teams).forEach((teamName) =>
    printEntryTeams(teamName, entry.teams[teamName])
  );
};

const printEntryTeams = (teamName: string, teamEntry: WorkflowsTeamEntry) => {
  consoleLog(`+ Owner: ${teamName}`);
  teamEntry.files.forEach((fileName) => {
    consoleLog(`  - ${fileName}`);
  });
};
