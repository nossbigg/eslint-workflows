import fs from "fs";
import { consoleLog } from "../console";
import { isFileExists } from "../fs";
import { EslintOutput } from "./typedefs";

const EMPTY_ESLINT_OUTPUT: EslintOutput = {
  results: [],
  metadata: { cwd: "", rulesMeta: {} },
};

export const getEslintOutput = (filePath: string): EslintOutput => {
  try {
    return getEslintOutputUnsafe(filePath);
  } catch {
    return EMPTY_ESLINT_OUTPUT;
  }
};

const getEslintOutputUnsafe = (filePath: string): EslintOutput => {
  const fileRaw = fs.readFileSync(filePath).toString("utf8");
  const json: EslintOutput = JSON.parse(fileRaw);
  return json;
};

export const doEslintOutputFileCheck = (filePath: string) => {
  if (!isFileExists(filePath)) {
    consoleLog(`❌ eslint output file not found! (expected file: ${filePath})`);
    throw new Error();
  }

  try {
    // try loading file
    getEslintOutputUnsafe(filePath);
  } catch (e) {
    consoleLog(`❌ Error loading eslint output file! (file: ${filePath})`);
    throw e;
  }
};
