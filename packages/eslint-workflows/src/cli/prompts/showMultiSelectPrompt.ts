import prompts, { Choice } from "prompts";

type ShowMultiSelectPromptArgs = { options: string[]; message: string };

export const showMultiSelectPrompt = async (
  args: ShowMultiSelectPromptArgs
): Promise<string[]> => {
  const { options, message } = args;

  const choices: Choice[] = options.map((v) => {
    const choice: Choice = { title: v, value: v };
    return choice;
  });

  const { value } = await prompts({
    type: "autocompleteMultiselect",
    name: "value",
    message,
    choices,
  });
  return value as string[];
};
