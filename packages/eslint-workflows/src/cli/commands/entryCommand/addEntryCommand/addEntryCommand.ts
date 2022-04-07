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
  replaceWorkflowEntryByRuleId,
} from "../../../../common";
import { showConfirmPrompt, showSelectPrompt } from "../../../prompts";
import { CommonConfig } from "../../../../common/rcfile/typedefs";
import {
  showChangesAppliedMessage,
  showNoChangesAppliedMessage,
} from "../../common";

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
    showNoChangesAppliedMessage();
    return;
  }

  const { exit, hasExistingEntry } = await handleExistingEntryFlow(
    workflowsEntries,
    selectedRuleId
  );
  if (exit) {
    showNoChangesAppliedMessage();
    return;
  }

  const newEntry = makeNewWorkflowEntry(commonConfig, selectedRuleId);

  if (hasExistingEntry) {
    const updatedYml: WorkflowsEntries = replaceWorkflowEntryByRuleId(
      workflowsEntries,
      selectedRuleId,
      newEntry
    );
    saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
    showChangesAppliedMessage();
    return;
  }

  const updatedYml: WorkflowsEntries = {
    ...workflowsEntries,
    entries: [...workflowsEntries.entries, newEntry],
  };
  saveWorkflowsEntries(rcFile.workflowsEntriesPath, updatedYml);
  showChangesAppliedMessage();
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
    return { exit: false, hasExistingEntry };
  }

  const confirm = await showConfirmPrompt({
    initial: false,
    message: "Overwrite existing entry?",
  });
  return { exit: !confirm, hasExistingEntry };
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
