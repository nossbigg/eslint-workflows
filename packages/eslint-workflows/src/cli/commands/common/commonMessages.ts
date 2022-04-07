import chalk from "chalk";
import { consoleLog } from "../../../common";

export const showChangesAppliedMessage = () => {
  consoleLog(chalk.green("✅ yml updated!"));
};

export const showNoChangesAppliedMessage = () => {
  consoleLog(chalk.gray("No changes."));
};
