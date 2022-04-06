import prompts from "prompts";

type ShowConfirmPromptArgs = { initial: boolean; message: string };

export const showConfirmPrompt = async (
  args: ShowConfirmPromptArgs
): Promise<boolean> => {
  const { initial, message } = args;

  const { value } = await prompts({
    type: "confirm",
    name: "value",
    message,
    initial,
  });
  return value as boolean;
};
