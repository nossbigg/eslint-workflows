import yargs from "yargs";
import { getCommonConfig } from "../../../../common";

export const addEntryHandler = (argv: yargs.ArgumentsCamelCase) => {
  console.log("entry - add");

  const commonConfig = getCommonConfig();
  console.log(commonConfig);
};
