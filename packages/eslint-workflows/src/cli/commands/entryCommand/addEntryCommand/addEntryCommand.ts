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
  getWorkflowsEntriesRuleIds,
  doEslintOutputFileCheck,
} from "../../../../common";
import { showConfirmPrompt, showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";

export const addEntryCommand: CommandHandler = async () => {
  const commonConfig = getCommonConfig();
  const { eslintOutput, workflowsEntries, rcFile } = commonConfig;

  doEslintOutputFileCheck(rcFile.eslintOutputPath);

  const availableRuleIds = getAvailableRuleIds(eslintOutput);
  const selectedRuleId = await showSelectPrompt({
    message: "Select rule to add",
    options: availableRuleIds,
  });
  if (!selectedRuleId) {
    return;
  }

  const { exit } = await handleExistingEntryFlow(
    workflowsEntries,
    selectedRuleId
  );
  if (exit) {
    return;
  }

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);
  const updatedYml: WorkflowsEntries = {
    ...workflowsEntries,
    entries: [...workflowsEntries.entries, newEntry],
  };

  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
};

const handleExistingEntryFlow = async (
  wfe: WorkflowsEntries,
  selectedRuleId: string
) => {
  const existingRuleIds = getWorkflowsEntriesRuleIds(wfe);
  const hasExistingEntry = !!existingRuleIds.find(
    (ruleId) => ruleId === selectedRuleId
  );
  if (!hasExistingEntry) {
    return { exit: false };
  }

  const confirm = await showConfirmPrompt({
    initial: false,
    message: "Overwrite existing entry?",
  });
  return { exit: !confirm };
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
