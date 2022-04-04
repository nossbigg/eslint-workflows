export type Codeowners = {
  entries: Codeowner[];
};

export type Codeowner = {
  pattern: string;
  owner: string[];
};
