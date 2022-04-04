import { ESLint } from "eslint";

export type EslintOutput = {
  results: ESLint.LintResult[];
  metadata: ESLint.LintResultData;
};
