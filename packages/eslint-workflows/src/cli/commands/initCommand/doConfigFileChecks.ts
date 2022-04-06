import fs from "fs-extra";
import { showConfirmPrompt } from "../../prompts";

type DoConfigFileChecksReturn = { confirm: boolean };

type FileCheck = { title: string; filePath: string; check: boolean };

export const doConfigFileChecks = async (
  rcFilePath: string,
  wfePath: string
): Promise<DoConfigFileChecksReturn> => {
  const checks: FileCheck[] = [
    {
      title: "rc file",
      filePath: rcFilePath,
      check: fs.existsSync(rcFilePath),
    },
    { title: "yml file", filePath: wfePath, check: fs.existsSync(wfePath) },
  ];

  console.log("= File Checks =");
  checks.forEach((c) => {
    const { title, filePath, check } = c;
    const icon = check ? "✅" : "❌";
    console.log(`${icon} ${title} (${filePath})`);
  });

  const hasError = !!checks.find((c) => c.check);
  if (!hasError) {
    return { confirm: true };
  }

  const confirm = await showConfirmPrompt({
    initial: false,
    message: "Overwrite existing config files?",
  });
  return { confirm };
};
