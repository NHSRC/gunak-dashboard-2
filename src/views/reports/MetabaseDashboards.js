export default class MetabaseDashboards {
  static Main = this.createDashboard(2);
  static AssessmentList = this.createQuestion(9);
  static Statistics = this.createDashboard(3);
  static FacilitiesRanking = this.createDashboard(4);
  static ExportAssessments = this.createDashboard(7);

  static createDashboard(id) {
    return {
      id: id,
      type: "dashboard"
    };
  }

  static createQuestion(id) {
    return {
      id: id,
      type: "question"
    };
  }
}
