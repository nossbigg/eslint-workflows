import { NO_OWNER_NAME } from "../codeowners/constants";
import { WorkflowEntry } from "./typedefs";

export const makeBaseWorkflowEntry = (
  ruleId: string,
  teamNames: string[]
): WorkflowEntry => {
  const teams = teamNames.reduce(
    (acc, teamName) => {
      const res: WorkflowEntry["teams"] = { ...acc, [teamName]: { files: [] } };
      return res;
    },
    {
      [NO_OWNER_NAME]: { files: [] },
    } as WorkflowEntry["teams"]
  );

  const entry: WorkflowEntry = {
    ruleId,
    teams,
  };
  return entry;
};
