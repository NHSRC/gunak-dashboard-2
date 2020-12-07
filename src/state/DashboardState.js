export default class DashboardState {
  static newInstance() {
    return new DashboardState();
  }

  static clone(state) {
    let dashboardState = new DashboardState();
    dashboardState.mainDashboardUrl = state.mainDashboardUrl;
    dashboardState.error = null;
    return dashboardState;
  }
}