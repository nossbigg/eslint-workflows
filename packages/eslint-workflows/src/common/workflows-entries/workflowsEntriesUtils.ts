import { WorkflowEntry } from "./typedefs";

export const makeBaseWorkflowEntry = (
  ruleId: string,
  teamNames: string[]
): WorkflowEntry => {
  const teams = teamNames.reduce((acc, teamName) => {
    const res: WorkflowEntry["teams"] = { ...acc, [teamName]: { files: [] } };
    return res;
  }, {} as WorkflowEntry["teams"]);

  const entry: WorkflowEntry = {
    ruleId,
    teams,
  };
  return entry;
};
