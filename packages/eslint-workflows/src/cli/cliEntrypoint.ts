import _ from "lodash";
import yargs from "yargs";
import { addEntryCommand, removeEntryCommand } from "./commands";

const { noop } = _;

export const cliEntrypoint = (): void => {
  yargs
    .scriptName("eslint-workflows")
    .command("entry", "Interact with entries.yml file", (yargs) => {
      return yargs
        .command("add", "Add an entry", noop, addEntryCommand)
        .command(
          "remove",
          "Remove an entry or part of an entry",
          noop,
          removeEntryCommand
        );
    })
    .demandCommand()
    .recommendCommands()
    .strict().argv;
};
