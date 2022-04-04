import { CommandHandler } from "../../typedefs";
import {
  getCommonConfig,
  getAvailableRuleIds,
  getFilenamesByRuleId,
  getOwners,
  makeBaseWorkflowEntry,
  WorkflowEntry,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";

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

  const newWorkflowEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
};

const makeNewWorkflowEntry = (
  commonConfig: CommonConfig,
  selectedRuleId: string
): WorkflowEntry => {
  const { eslintOutput, codeowners } = commonConfig;

  const matchingFileNames = getFilenamesByRuleId(eslintOutput, selectedRuleId);
  console.log(matchingFileNames);

  const owners = getOwners(codeowners);
  console.log(owners);

  const baseWorkflowEntry = makeBaseWorkflowEntry(selectedRuleId, owners);
  console.log(baseWorkflowEntry);
  return baseWorkflowEntry;
};
