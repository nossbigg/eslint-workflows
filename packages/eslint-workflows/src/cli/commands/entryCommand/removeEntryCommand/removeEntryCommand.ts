import { showSelectPrompt } from "../../../prompts";
import { CommandHandler } from "../../typedefs";
import { RemoveAction } from "./typedefs";
import { removeEntireEntry } from "./removeEntireEntry";
import { removeEntryTeam } from "./removeEntryTeam";
import { removeEntryTeamFile } from "./removeEntryTeamFile";

const REMOVE_ACTION_OPTIONS: RemoveAction[] = [
  "Entry > Team > File",
  "Entry > Team",
  "Entry",
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
  if (!handler) {
    return;
  }
  await handler(argv);
};
