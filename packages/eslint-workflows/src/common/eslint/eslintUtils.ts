import _ from "lodash";
import { getProjectRoot } from "../path";
import { EslintOutput } from "./typedefs";

export const getAvailableRuleIds = (output: EslintOutput): string[] => {
  const ruleIds = output.results
    .flatMap((e) => e.messages)
    .map((r) => r.ruleId)
    .filter((ruleId) => !!ruleId) as string[];
  const uniqueRuleIds = _.uniq(ruleIds);
  return uniqueRuleIds;
};

export const getFilenamesByRuleId = (
  output: EslintOutput,
  targetRuleId: string
): string[] => {
  const matches = output.results.filter((r) => {
    const hasMatchingRuleId = r.messages.find((m) => m.ruleId === targetRuleId);
    return hasMatchingRuleId;
  });
  const fileNames = matches.map((r) => r.filePath);
  const cwd = getProjectRoot();
  const withoutCwdPrefix = fileNames.map((f) => f.replace(cwd, ""));
  return withoutCwdPrefix;
};
