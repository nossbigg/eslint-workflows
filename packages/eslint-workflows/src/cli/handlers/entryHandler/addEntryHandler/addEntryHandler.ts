import { CommandHandler } from "../../typedefs";
import { getCommonConfig, getAvailableRuleIds } from "../../../../common";
import { showSelectPrompt } from "../../../prompts";

export const addEntryHandler: CommandHandler = async () => {
  console.log("entry - add");

  const commonConfig = getCommonConfig();
  console.log(commonConfig);

  const { eslintOutput } = commonConfig;
  const availableRuleIds = getAvailableRuleIds(eslintOutput);

  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });
  console.log(selectedRuleId);
};
