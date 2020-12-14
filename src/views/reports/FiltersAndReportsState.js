import _ from "lodash";
import MetabaseResources from "./MetabaseResources";

export default class FiltersAndReportsState {
  static newInstance(searchString) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.resource = _.isEmpty(searchString) ? MetabaseResources.Main : MetabaseResources.AssessmentList;
    return filtersAndReportsState;
  }

  static clone(other) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.lastApiResponse = other.lastApiResponse;
    filtersAndReportsState.metabaseUrl = other.metabaseUrl;
    filtersAndReportsState.programs = other.programs;
    filtersAndReportsState.assessmentTools = other.assessmentTools;
    filtersAndReportsState.state = other.state;
    filtersAndReportsState.selectedProgram = other.selectedProgram;
    filtersAndReportsState.selectedAssessmentTool = other.selectedAssessmentTool;
    return filtersAndReportsState;
  }

  static setProgram(filtersAndReportsState, programId) {
    let program = _.find(filtersAndReportsState.programs, (program) => program.id === programId);
    filtersAndReportsState.selectedProgram = program;
  }

  static setAssessmentTool(filtersAndReportsState, atId) {
    let at = _.find(filtersAndReportsState.assessmentTools, (at) => at.id === atId);
    filtersAndReportsState.selectedAssessmentTool = at;
  }
}
