import _ from "lodash";
import { EslintOutput } from "./typedefs";

export const getAvailableRuleIds = (output: EslintOutput): string[] => {
  const ruleIds = output.results
    .flatMap((e) => e.messages)
    .map((r) => r.ruleId)
    .filter((ruleId) => !!ruleId) as string[];
  const uniqueRuleIds = _.uniq(ruleIds);
  return uniqueRuleIds;
};
