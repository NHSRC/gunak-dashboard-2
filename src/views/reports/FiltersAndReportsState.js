import _ from "lodash";

export default class FiltersAndReportsState {
  static newInstance(searchString) {
    let filtersAndReportsState = new FiltersAndReportsState();
    filtersAndReportsState.programs = [{id: 0, name: "foo"}];
    filtersAndReportsState.selectedProgram = {id: 0};
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
    filtersAndReportsState.assessmentTypes = other.assessmentTypes;
    filtersAndReportsState.selectedAssessmentType = other.selectedAssessmentType;
    return filtersAndReportsState;
  }

  static setProgram(filtersAndReportsState, programId) {
    filtersAndReportsState.selectedProgram = _.find(filtersAndReportsState.programs, (program) => program.id === programId);
  }

  static setAssessmentTool(filtersAndReportsState, atId) {
    filtersAndReportsState.selectedAssessmentTool = _.find(filtersAndReportsState.assessmentTools, (at) => at.id === atId);
  }

  static setAssessmentType(filtersAndReportsState, aTypeId) {
    filtersAndReportsState.selectedAssessmentType = _.find(filtersAndReportsState.assessmentTypes, (aType) => aType.id === aTypeId);
  }
}
