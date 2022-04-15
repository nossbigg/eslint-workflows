import _ from "lodash";
import yargs from "yargs";
import {
  addEntryCommand,
  removeEntryCommand,
  fmtEntryCommand,
  initCommand,
  viewCommand,
  swallowErrors,
} from "./commands";

export const cliEntrypoint = (): void => {
  yargs
    .scriptName("eslint-workflows")
    .command(
      "view",
      "Print yml file contents",
      _.noop,
      swallowErrors(viewCommand)
    )
    .command("entry", "Interact with entries.yml file", (yargs) => {
      return yargs
        .command("add", "Add an entry", _.noop, swallowErrors(addEntryCommand))
        .command(
          "remove",
          "Remove an entry or part of an entry",
          _.noop,
          swallowErrors(removeEntryCommand)
        )
        .command(
          "fmt",
          "Applies formatter to yml file",
          _.noop,
          swallowErrors(fmtEntryCommand)
        )
        .demandCommand()
        .recommendCommands()
        .strict();
    })
    .command(
      "init",
      "Sets up eslint-workflows for current project",
      _.noop,
      swallowErrors(initCommand)
    )
    .demandCommand()
    .recommendCommands()
    .strict().argv;
};
