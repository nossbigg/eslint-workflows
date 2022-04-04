import { Codeowners } from "../codeowners";
import { EslintOutput } from "../eslint";

export type RcFile = {
  eslintOutputPath: string;
  codeownersPath: string;
};

export type CommonConfig = {
  rcFile: RcFile;
  eslintOutput: EslintOutput;
  codeowners: Codeowners;
};
