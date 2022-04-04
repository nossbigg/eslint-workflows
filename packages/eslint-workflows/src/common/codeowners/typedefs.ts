export type Codeowners = {
  entries: Codeowner[];
};

export type Codeowner = {
  pattern: string;
  owners: string[];
};
