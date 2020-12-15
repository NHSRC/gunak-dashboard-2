import _ from 'lodash';

export default class MetabaseResources {
  static Main = this.createDashboard(2, false, false);
  static AssessmentList = this.createQuestion(9);
  static Statistics = this.createDashboard(5, true, true);
  static FacilitiesRanking = this.createDashboard(4);
  static ExportAssessments = this.createDashboard(7);

  static createDashboard(id, hasAssessmentTool, hasAssessmentType) {
    return {
      id: id,
      type: "dashboard",
      hasAssessmentTool: hasAssessmentTool,
      hasAssessmentType: hasAssessmentType
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
}
