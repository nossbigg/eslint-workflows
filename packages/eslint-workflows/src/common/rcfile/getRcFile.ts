import fs from "fs-extra";
import { isAbsolute } from "path";
import { getProjectRoot, makePath } from "../path";
import { RcFile } from "./typedefs";

export const getRcFile = (): RcFile => {
  const rcFilePath = getRcFilePath();
  if (!isRcFileExists(rcFilePath)) {
    console.log(`❌ rc file not found! (expected rc file: ${rcFilePath})`);
    throw new Error();
  }

  let rcFile: RcFile;
  try {
    rcFile = require(rcFilePath);
  } catch (e) {
    console.log(`❌ Error loading rc file! (rc file: ${rcFilePath})`);
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

const isRcFileExists = (filePath: string) => {
  return fs.existsSync(filePath);
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
