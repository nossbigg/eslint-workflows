import path, { isAbsolute } from "path";
import { RcFile } from "./typedefs";

export const getRcFile = (): RcFile => {
  const rcFilePath = getRcFilePath();
  const rcFile: RcFile = require(rcFilePath);

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
  const cwd = process.cwd();
  const filePath = path.join(cwd, "eslint-workflows", ".eslint-workflowsrc.js");
  return filePath;
};

const handlePath = (filePath: string): string => {
  if (isAbsolute(filePath)) {
    return filePath;
  }
  const cwd = process.cwd();
  return path.join(cwd, filePath);
};
