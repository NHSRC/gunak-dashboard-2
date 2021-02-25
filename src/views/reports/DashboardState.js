import MetabaseResources from "./MetabaseResources";

export default class DashboardState {
  static newInstance(queryParams) {
    let urlSearchParams = new URLSearchParams(queryParams);

    let dashboardState = new DashboardState();
    dashboardState.resource = MetabaseResources.getResource(urlSearchParams.get("name"));
    dashboardState.params = urlSearchParams;
    return dashboardState;
  }

  static clone(other) {
    let dashboardState = new DashboardState();
    dashboardState.resource = other.resource;
    dashboardState.params = other.params;
    return dashboardState;
  }
}
