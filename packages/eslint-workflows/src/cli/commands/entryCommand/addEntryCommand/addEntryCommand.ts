import { CommandHandler } from "../../typedefs";
import {
  getCommonConfig,
  getAvailableRuleIds,
  getFilenamesByRuleId,
  getOwners,
  makeBaseWorkflowEntry,
  WorkflowsEntry,
  getMatchingOwner,
  WorkflowsEntries,
  saveWorkflowsEntries,
  stripPrefixSlash,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";

export const addEntryCommand: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { eslintOutput, workflowsEntries, rcFile } = commonConfig;

  const availableRuleIds = getAvailableRuleIds(eslintOutput);
  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
  const updatedYml: WorkflowsEntries = {
    ...workflowsEntries,
    entries: [...workflowsEntries.entries, newEntry],
  };

  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};

const makeNewWorkflowEntry = (
  commonConfig: CommonConfig,
  selectedRuleId: string
): WorkflowsEntry => {
  const { eslintOutput, codeowners } = commonConfig;

  const matchingFileNames = getFilenamesByRuleId(eslintOutput, selectedRuleId);
  const owners = getOwners(codeowners);

  const baseWorkflowEntry = makeBaseWorkflowEntry(selectedRuleId, owners);
  const withMatchedOwners = matchingFileNames.reduce((acc, fileName) => {
    const matchingOwner = getMatchingOwner(codeowners, fileName);
    const { owners } = matchingOwner;

    owners.forEach((owner) => {
      const withoutPrefixSlash = stripPrefixSlash(fileName);
      acc.teams[owner].files.push(withoutPrefixSlash);
    });

    return acc;
  }, baseWorkflowEntry);

  return withMatchedOwners;
};
