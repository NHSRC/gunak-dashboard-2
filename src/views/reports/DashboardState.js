import MetabaseDashboards from "./MetabaseDashboards";

export default class DashboardState {
  static newInstance(searchString) {
    let dashboardState = new DashboardState();
    dashboardState.dashboardId = _.isEmpty(searchString) ? MetabaseDashboards.Main : MetabaseDashboards.AssessmentList;
    return dashboardState;
  }

  static clone(other) {
    let dashboardState = new DashboardState();
    dashboardState.mainDashboardUrl = other.mainDashboardUrl;
    dashboardState.error = null;
    dashboardState.other = other.state;
    dashboardState.dashboardId = other.dashboardId;
    return dashboardState;
  }
}
