import { CommandHandler } from "../../typedefs";
import {
  getCommonConfig,
  getAvailableRuleIds,
  getFilenamesByRuleId,
  getOwners,
  makeBaseWorkflowEntry,
  WorkflowEntry,
  getMatchingOwner,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";

export const addEntryHandler: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { eslintOutput } = commonConfig;

  const availableRuleIds = getAvailableRuleIds(eslintOutput);
  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
};

const makeNewWorkflowEntry = (
  commonConfig: CommonConfig,
  selectedRuleId: string
): WorkflowEntry => {
  const { eslintOutput, codeowners } = commonConfig;

  const matchingFileNames = getFilenamesByRuleId(eslintOutput, selectedRuleId);
  const owners = getOwners(codeowners);

  const baseWorkflowEntry = makeBaseWorkflowEntry(selectedRuleId, owners);
  const withMatchedOwners = matchingFileNames.reduce((acc, fileName) => {
    const matchingOwner = getMatchingOwner(codeowners, fileName);
    const { owners } = matchingOwner;

    owners.forEach((owner) => {
      acc.teams[owner].files.push(fileName);
    });

    return acc;
  }, baseWorkflowEntry);

  return withMatchedOwners;
};
