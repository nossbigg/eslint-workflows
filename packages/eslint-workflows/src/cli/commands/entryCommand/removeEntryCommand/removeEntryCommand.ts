import { showSelectPrompt } from "../../../prompts";
import { CommandHandler } from "../../typedefs";
import { removeEntireEntry } from "./removeEntireEntry";
import { removeEntryTeam } from "./removeEntryTeam";
import { removeEntryTeamFile } from "./removeEntryTeamFile";
import { RemoveAction } from "./typedefs";

const REMOVE_ACTION_OPTIONS: RemoveAction[] = [
  "Entry",
  "Entry > Team",
  "Entry > Team > File",
];

const ACTION_MAPPER: Record<RemoveAction, CommandHandler> = {
  Entry: removeEntireEntry,
  "Entry > Team": removeEntryTeam,
  "Entry > Team > File": removeEntryTeamFile,
};

export const removeEntryCommand: CommandHandler = async (argv) => {
  const selectedAction = await showSelectPrompt({
    message: "Select action",
    options: REMOVE_ACTION_OPTIONS,
  });

  const handler = ACTION_MAPPER[selectedAction as RemoveAction];
  await handler(argv);
};
