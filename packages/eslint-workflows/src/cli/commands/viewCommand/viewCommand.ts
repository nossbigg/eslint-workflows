import {
  getCommonConfig,
  WorkflowsEntry,
  WorkflowsTeamEntry,
} from "../../../common";
import { CommandHandler } from "../typedefs";

export const viewCommand: CommandHandler = async () => {
  const { workflowsEntries } = getCommonConfig();
  workflowsEntries.entries.map(printEntry);
};

const printEntry = (entry: WorkflowsEntry) => {
  const { ruleId, teams } = entry;

  console.log(`Rule: ${ruleId}`);
  Object.keys(teams).forEach((teamName) =>
    printEntryTeams(teamName, entry.teams[teamName])
  );
};

const printEntryTeams = (teamName: string, teamEntry: WorkflowsTeamEntry) => {
  console.log(`+ Owner: ${teamName}`);
  teamEntry.files.forEach((fileName) => {
    console.log(`  - ${fileName}`);
  });
};