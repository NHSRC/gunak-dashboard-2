import _ from 'lodash';

export default class MetabaseResources {
  static Main = this.createDashboard(2, false, false, '1000px');
  static AssessmentList = this.createQuestion(9);
  static Statistics = this.createDashboard(5, true, true, '2300px');
  static FacilitiesRanking = this.createDashboard(4, true, true, '1000px');
  static ExportAssessments = this.createDashboard(7);

  static createDashboard(id, hasAssessmentTool, hasAssessmentType, height) {
    return {
      id: id,
      type: "dashboard",
      hasAssessmentTool: hasAssessmentTool,
      hasAssessmentType: hasAssessmentType,
      height: height
    };
  }

  static createQuestion(id) {
    return {
      id: id,
      type: "question"
    };
  }

  static createFilterObject(metabaseResource, state, assessmentToolMode, assessmentTool, assessmentType) {
    if (_.isNil(state) || _.isNil(assessmentToolMode)) return null;
    if (metabaseResource.hasAssessmentTool && _.isNil(assessmentTool)) return null;
    if (metabaseResource.hasAssessmentType && _.isNil(assessmentType)) return null;

    let params = {"state": state.name, "assessment_tool_mode": assessmentToolMode.name};
    if (metabaseResource.hasAssessmentTool) params["assessment_tool"] = assessmentTool.name;
    if (metabaseResource.hasAssessmentType) params["assessment_type"] = assessmentType.name;
    return params;
  }

  static isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    let loaded = this._isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes);
    console.log(loaded);
    return loaded;
  }

  static _isAllLoaded(metabaseResource, programs, assessmentTools, assessmentTypes) {
    if (_.isNil(programs)) return false;
    if (metabaseResource.hasAssessmentTool && _.isNil(assessmentTools)) return false;
    if (metabaseResource.hasAssessmentType && _.isNil(assessmentTypes)) return false;

    return true;
  }
}
