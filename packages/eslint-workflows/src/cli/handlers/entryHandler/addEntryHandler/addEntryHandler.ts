import { CommandHandler } from "../../typedefs";
import {
  getCommonConfig,
  getAvailableRuleIds,
  getFilenamesByRuleId,
  getOwners,
  makeBaseWorkflowEntry,
  WorkflowEntry,
  getMatchingOwner,
  WorkflowEntries,
  saveWorkflowsEntries,
  stripPrefixSlash,
} from "../../../../common";
import { showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";

export const addEntryHandler: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { eslintOutput, workflowsEntries, rcFile } = commonConfig;

  const availableRuleIds = getAvailableRuleIds(eslintOutput);
  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
  const updatedYml: WorkflowEntries = {
    ...workflowsEntries,
    entries: [...workflowsEntries.entries, newEntry],
  };

  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
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
      const withoutPrefixSlash = stripPrefixSlash(fileName);
      acc.teams[owner].files.push(withoutPrefixSlash);
    });

    return acc;
  }, baseWorkflowEntry);

  return withMatchedOwners;
};
