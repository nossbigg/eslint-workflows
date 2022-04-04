import path from "path";
import { RcFile } from "./typedefs";

export const getRcFile = (): RcFile => {
  const rcFilePath = getRcFilePath();
  const rcFile = require(rcFilePath);
  return rcFile;
};

const getRcFilePath = (): string => {
  const cwd = process.cwd();
  const filePath = path.join(cwd, "eslint-workflows", ".eslint-workflowsrc.js");
  return filePath;
};
