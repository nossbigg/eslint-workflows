import yargs from "yargs";
import { addEntryHandler } from "./handlers";

const noop = () => undefined;

export const cliEntrypoint = (): void => {
  yargs
    .scriptName("eslint-workflows")
    .command("entry", "Interact with entries.yml file", (yargs) => {
      return yargs
        .command("add", "Add an entry", noop, addEntryHandler)
        .demandCommand();
    })
    .demandCommand()
    .recommendCommands()
    .strict().argv;
};
