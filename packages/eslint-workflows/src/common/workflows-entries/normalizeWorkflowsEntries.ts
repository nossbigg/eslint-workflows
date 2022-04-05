import _ from "lodash";
import { WorkflowsEntries, WorkflowsEntry } from "./typedefs";
import { flow } from "lodash/fp";

type WFETransformFn = (wfe: WorkflowsEntries) => WorkflowsEntries;

export const normalizeWorkflowsEntries: WFETransformFn = (wfe) => {
  const transformFn = flow([removeEmptyEntryTeams, removeEmptyEntries]);

  const result: WorkflowsEntries = transformFn(wfe);
  return result;
};

const removeEmptyEntryTeams: WFETransformFn = (wfe) => {
  const updatedEntries = wfe.entries.map((entry) => {
    const teamsWithEmptyFiles = Object.keys(entry.teams).filter((teamKey) => {
      const team = entry.teams[teamKey];
      const isEmptyFiles = team.files.length === 0;
      return isEmptyFiles;
    });

    const updatedTeams = _.omit(entry.teams, teamsWithEmptyFiles);
    const updatedEntry: WorkflowsEntry = { ...entry, teams: updatedTeams };
    return updatedEntry;
  });

  const result: WorkflowsEntries = { ...wfe, entries: updatedEntries };
  return result;
};

const removeEmptyEntries: WFETransformFn = (wfe) => {
  const updatedEntries = wfe.entries.filter((entry) => {
    const isEmptyTeams = Object.keys(entry.teams).length === 0;
    return !isEmptyTeams;
  });

  const result: WorkflowsEntries = { ...wfe, entries: updatedEntries };
  return result;
};
