import { getCodeowners } from "../codeowners";
import { getEslintOutput } from "../eslint";
import { getRcFile } from "./getRcFile";
import { CommonConfig } from "./typedefs";

export const getCommonConfig = (): CommonConfig => {
  const rcFile = getRcFile();
  const { codeownersPath, eslintOutputPath } = rcFile;

  const eslintOutput = getEslintOutput(eslintOutputPath);
  const codeowners = getCodeowners(codeownersPath);

  const result: CommonConfig = { rcFile, eslintOutput, codeowners };
  return result;
};
