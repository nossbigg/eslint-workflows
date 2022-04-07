import chalk from "chalk";
import { isAbsolute } from "path";
import { consoleLog } from "../console";
import { isFileExists } from "../fs";
import { getProjectRoot, makePath } from "../path";
import { RcFile } from "./typedefs";

export const getRcFile = (): RcFile => {
  const filePath = getRcFilePath();
  if (!isFileExists(filePath)) {
    consoleLog(
      `❌ rc file not found! (expected rc file: ${chalk.gray(filePath)})`
    );
    throw new Error();
  }

  let rcFile: RcFile;
  try {
    rcFile = require(filePath);
  } catch (e) {
    consoleLog(`❌ Error loading rc file! (rc file: ${chalk.gray(filePath)})`);
    throw e;
  }

  const codeownersPath =
    rcFile.codeownersPath !== undefined
      ? handlePath(rcFile.codeownersPath)
      : rcFile.codeownersPath;

  const modifiedRcFile: RcFile = {
    codeownersPath,
    eslintOutputPath: handlePath(rcFile.eslintOutputPath),
    workflowsEntriesPath: handlePath(rcFile.workflowsEntriesPath),
  };
  return modifiedRcFile;
};

const getRcFilePath = (): string => {
  const cwd = getProjectRoot();
  const filePath = makePath(cwd, "eslint-workflows", ".eslint-workflowsrc.js");
  return filePath;
};

const handlePath = (filePath: string): string => {
  if (isAbsolute(filePath)) {
    return filePath;
  }
  const cwd = getProjectRoot();
  return makePath(cwd, filePath);
};
