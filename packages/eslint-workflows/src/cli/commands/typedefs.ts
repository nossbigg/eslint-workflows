import { ArgumentsCamelCase } from "yargs";

export type CommandHandler<U = {}> = (
  args: ArgumentsCamelCase<U>
) => void | Promise<void>;
