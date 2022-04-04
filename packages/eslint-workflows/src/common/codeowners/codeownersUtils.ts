import _ from "lodash";
import { Codeowners } from "./typedefs";

export const getOwners = (codeowners: Codeowners): string[] => {
  const owners = codeowners.entries.flatMap((e) => e.owners);
  const uniqueOwners = _.uniq(owners);
  return uniqueOwners;
};
