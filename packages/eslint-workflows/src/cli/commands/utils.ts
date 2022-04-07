import { ArgumentsCamelCase } from "yargs";
import { CommandHandler } from "./typedefs";

// to prevent errors from propagating into yargs
export const swallowErrors =
  (handler: CommandHandler) => async (argv: ArgumentsCamelCase) => {
    try {
      return await handler(argv);
    } catch (e) {
      process.exit(1);
    }
  };
