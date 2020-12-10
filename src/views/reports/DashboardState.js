import MetabaseDashboards from "./MetabaseDashboards";
import _ from 'lodash';

export default class DashboardState {
  static newInstance(searchString) {
    let dashboardState = new DashboardState();
    dashboardState.dashboardId = _.isEmpty(searchString) ? MetabaseDashboards.Main : MetabaseDashboards.AssessmentList;
    return dashboardState;
  }

  static clone(other) {
    let dashboardState = new DashboardState();
    dashboardState.apiResponse = other.apiResponse;
    dashboardState.dashboardId = other.dashboardId;
    return dashboardState;
  }
}
