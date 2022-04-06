import { Codeowner, Codeowners } from "./typedefs";

export const EMPTY_CODEOWNERS: Codeowners = {
  entries: [],
};

export const NO_OWNER_NAME = "_NO_OWNER_";

export const NO_OWNER_CODEOWNER: Codeowner = {
  owners: [NO_OWNER_NAME],
  pattern: "",
};
