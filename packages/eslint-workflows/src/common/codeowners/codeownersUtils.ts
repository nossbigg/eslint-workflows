import _ from "lodash";
import ignore from "ignore";
import { NO_OWNER_CODEOWNER } from "./constants";
import { Codeowner, Codeowners } from "./typedefs";
import { stripPrefixSlash } from "../path";

export const getOwners = (codeowners: Codeowners): string[] => {
  const owners = codeowners.entries.flatMap((e) => e.owners);
  const uniqueOwners = _.uniq(owners);
  return uniqueOwners;
};

export const getMatchingOwner = (
  codeowners: Codeowners,
  filePath: string
): Codeowner => {
  const { entries } = codeowners;
  // later definitions take higher precedence
  const reversedEntries = [...entries].reverse();

  const matchingEntry = reversedEntries.find((entry) => {
    const { pattern } = entry;
    const withoutPrefixSlash = stripPrefixSlash(filePath);
    const isMatch: boolean = ignore().add(pattern).ignores(withoutPrefixSlash);
    return isMatch;
  });

  if (!matchingEntry) {
    return NO_OWNER_CODEOWNER;
  }
  return matchingEntry;
};
