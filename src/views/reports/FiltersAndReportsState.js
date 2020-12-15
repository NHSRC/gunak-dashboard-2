import _ from "lodash";

export default class FiltersAndReportsState {
  static newInstance(searchString) {
    return new FiltersAndReportsState();
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
    filtersAndReportsState.filterUpdated = false;
  }

  static setAssessmentTool(filtersAndReportsState, atId) {
    filtersAndReportsState.selectedAssessmentTool = _.find(filtersAndReportsState.assessmentTools, (at) => at.id === atId);
    filtersAndReportsState.filterUpdated = false;
  }

  static setAssessmentType(filtersAndReportsState, aTypeId) {
    filtersAndReportsState.selectedAssessmentType = _.find(filtersAndReportsState.assessmentTypes, (aType) => aType.id === aTypeId);
    filtersAndReportsState.filterUpdated = false;
  }

  static getUserSelectedProgramId(filtersAndReportsState) {
    return _.isNil(filtersAndReportsState.selectedProgram) ? 0 : filtersAndReportsState.selectedProgram.id;
  }

  static getCurrentProgramId(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.programs)) return 0;
    return this.getCurrentProgram(filtersAndReportsState).id;
  }

  static getCurrentProgram(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.programs)) return null;
    return _.isNil(filtersAndReportsState.selectedProgram) ? filtersAndReportsState.programs[0] : filtersAndReportsState.selectedProgram;
  }

  static getUserSelectedAssessmentToolId(filtersAndReportsState) {
    return _.isNil(filtersAndReportsState.selectedAssessmentTool) ? 0 : filtersAndReportsState.selectedAssessmentTool.id;
  }

  static getCurrentAssessmentToolId(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.assessmentTools)) return 0;
    return this.getCurrentAssessmentTool(filtersAndReportsState).id;
  }

  static getCurrentAssessmentTool(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.assessmentTools)) return null;
    return _.isNil(filtersAndReportsState.selectedAssessmentTool) ? filtersAndReportsState.assessmentTools[0] : filtersAndReportsState.selectedAssessmentTool;
  }

  static getUserSelectedAssessmentTypeId(filtersAndReportsState) {
    return _.isNil(filtersAndReportsState.selectedAssessmentType) ? 0 : filtersAndReportsState.selectedAssessmentType.id;
  }

  static getCurrentAssessmentTypeId(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.assessmentTypes)) return 0;
    return this.getCurrentAssessmentType(filtersAndReportsState).id;
  }

  static getCurrentAssessmentType(filtersAndReportsState) {
    if (_.isNil(filtersAndReportsState.assessmentTypes)) return null;
    return _.isNil(filtersAndReportsState.selectedAssessmentType) ? filtersAndReportsState.assessmentTypes[0] : filtersAndReportsState.selectedAssessmentType;
  }
}
