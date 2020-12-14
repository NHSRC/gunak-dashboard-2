import MetabaseResources from "./MetabaseResources";
import _ from 'lodash';

export default class DashboardState {
  static newInstance(searchString) {
    let dashboardState = new DashboardState();
    dashboardState.resource = _.isEmpty(searchString) ? MetabaseResources.Main : MetabaseResources.AssessmentList;
    return dashboardState;
  }

  static clone(other) {
    let dashboardState = new DashboardState();
    dashboardState.resource = other.resource;
    return dashboardState;
  }
}
