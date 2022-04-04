import fs from "fs";
import { EslintOutput } from "./typedefs";

export const getEslintOutput = (filePath: string): EslintOutput => {
  const fileRaw = fs.readFileSync(filePath).toString("utf8");
  const json: EslintOutput = JSON.parse(fileRaw);
  return json;
};
