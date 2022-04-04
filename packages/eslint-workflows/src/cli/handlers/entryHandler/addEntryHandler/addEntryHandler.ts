import { CommandHandler } from "../../typedefs";
import {
  getCommonConfig,
  getAvailableRuleIds,
  getFilenamesByRuleId,
  getOwners,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";

export const addEntryHandler: CommandHandler = async () => {
  console.log("entry - add");

  const commonConfig = getCommonConfig();
  console.log(commonConfig);

  const { eslintOutput, codeowners } = commonConfig;
  const availableRuleIds = getAvailableRuleIds(eslintOutput);

  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });

  const matchingFileNames = getFilenamesByRuleId(eslintOutput, selectedRuleId);
  console.log(matchingFileNames);

  const owners = getOwners(codeowners);
  console.log(owners)
};
