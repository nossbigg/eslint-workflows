import fs from "fs";
import { EMPTY_CODEOWNERS } from "./constants";
import { Codeowner, Codeowners } from "./typedefs";

export const getCodeowners = (filePath: string | undefined): Codeowners => {
  if (filePath === undefined) {
    return EMPTY_CODEOWNERS;
  }

  const fileRaw = fs.readFileSync(filePath).toString("utf8");
  const result: Codeowners = parseCodeownersFile(fileRaw);
  return result;
};

const parseCodeownersFile = (fileRaw: string): Codeowners => {
  const lines = fileRaw.split("\n");

  const sanitizedLines = lines
    .map(replaceTabsWithSpaces)
    .map(standardizeSpaces)
    .map(trimLines)
    .filter(dropEmptyLines);

  const entries: Codeowner[] = sanitizedLines
    .map(splitToPatternOwners)
    .filter(dropEmptyOwners);

  const result: Codeowners = {
    entries,
  };
  return result;
};

const replaceTabsWithSpaces = (line: string): string => line.replace("\t", "");
const standardizeSpaces = (line: string): string =>
  line.replace(/[ ]{2,}/, " ");
const trimLines = (line: string) => line.trim();
const dropEmptyLines = (line: string): boolean => line.length > 0;

const splitToPatternOwners = (line: string): Codeowner => {
  const [pattern, ...owners] = line.split(" ");
  return { pattern, owners };
};
const dropEmptyOwners = (entry: Codeowner): boolean => entry.owners.length > 0;
