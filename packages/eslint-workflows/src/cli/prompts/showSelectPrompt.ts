import prompts, { Choice } from "prompts";

type ShowSelectPromptArgs = { options: string[]; message: string };

export const showSelectPrompt = async (
  args: ShowSelectPromptArgs
): Promise<string | undefined> => {
  const { options, message } = args;

  const choices: Choice[] = options.map((v) => {
    const choice: Choice = { title: v };
    return choice;
  });

  const { value } = await prompts({
    type: "autocomplete",
    name: "value",
    message,
    choices,
  });
  return value;
};
