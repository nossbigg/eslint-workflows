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
  console.log("entry - add");

  const commonConfig = getCommonConfig();
  console.log(commonConfig);

  const { eslintOutput } = commonConfig;
  const availableRuleIds = getAvailableRuleIds(eslintOutput);

  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
  console.log(newEntry);
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

  const withMatchedOwners = matchingFileNames.reduce((acc, fileName) => {
    const matchingOwner = getMatchingOwner(codeowners, fileName);
    const { owners } = matchingOwner;

    owners.forEach((owner) => {
      acc.teams[owner].files.push(fileName);
    });

    return acc;
  }, baseWorkflowEntry);
  console.log(withMatchedOwners);

  return withMatchedOwners;
};
