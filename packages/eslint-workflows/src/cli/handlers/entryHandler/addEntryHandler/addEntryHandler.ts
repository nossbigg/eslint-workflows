import yargs from "yargs";
import { getRcFile, getEslintOutput } from "../../../../common";

export const addEntryHandler = (argv: yargs.ArgumentsCamelCase) => {
  console.log("entry - add");
  const rcFile = getRcFile();
  console.log(rcFile);
  const eslintOutput = getEslintOutput(rcFile.eslintOutputPath);
  console.log(eslintOutput);
};
