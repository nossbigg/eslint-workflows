export type WorkflowsEntries = {
  entries: WorkflowsEntry[];
};

export type WorkflowsEntry = {
  ruleId: string;
  teams: Record<string, WorkflowsTeamEntry>;
};

export type WorkflowsTeamEntry = {
  files: string[];
};
