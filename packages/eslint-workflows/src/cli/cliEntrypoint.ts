import yargs from "yargs";
import { addEntryCommand } from "./commands";

const noop = () => undefined;

export const cliEntrypoint = (): void => {
  yargs
    .scriptName("eslint-workflows")
    .command("entry", "Interact with entries.yml file", (yargs) => {
      return yargs
        .command("add", "Add an entry", noop, addEntryCommand)
        .demandCommand();
    })
    .demandCommand()
    .recommendCommands()
    .strict().argv;
};
