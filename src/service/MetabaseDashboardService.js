export default class MetabaseDashboardService {
  static getDashboardIframeUrl(state, dashboardId, dashboardParams) {
    let searchParams = _.isEmpty(dashboardParams) ? `state=${state.name}` : `state=${state.name}&${dashboardParams}`;
    return this.getIframeUrl(dashboardId, searchParams);
  }

  static getIframeUrl(dashboardId, urlFragment) {
    let url = `/api/metabase-dashboard-url?dashboardId=${dashboardId}&${urlFragment}`;
    const request = new Request(url, {
      method: 'GET'
    });
    return fetch(request).then((response) => {
      return response.text();
    });
  }
}
