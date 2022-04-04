import yargs from "yargs";
import { getRcFile } from "../../../../common";

export const addEntryHandler = (argv: yargs.ArgumentsCamelCase) => {
  console.log("entry - add");
  const rcFile = getRcFile();
  console.log(rcFile);
};
