import _ from "lodash";
import yargs from "yargs";
import {
  addEntryCommand,
  removeEntryCommand,
  fmtEntryCommand,
  initCommand,
} from "./commands";

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
        )
        .command("fmt", "Applies formatter to yml file", noop, fmtEntryCommand);
    })
    .command(
      "init",
      "Sets up eslint-workflows for current project",
      noop,
      initCommand
    )
    .demandCommand()
    .recommendCommands()
    .strict().argv;
};
