export type WorkflowEntries = {
  entries: WorkflowEntry[];
};

export type WorkflowEntry = {
  ruleId: string;
  teams: Record<string, WorkflowTeamEntry>;
};

export type WorkflowTeamEntry = {
  files: string[];
};
