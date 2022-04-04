export type WorkflowEntries = {
  entries: WorkFlowEntry[];
};

type WorkFlowEntry = {
  rule: string;
  teams: Record<string, WorkflowTeamEntry>;
};

type WorkflowTeamEntry = {
  files: string[];
};
