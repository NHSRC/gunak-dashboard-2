import {paramsToUrlFragment} from "../utils/FetchHelper";

export default class MetabaseDashboardService {
  static getMainDashboardIframeUrl(state, otherParams) {
    let params = Object.assign({"state": state.name}, otherParams);
    console.log(params);
    return this.getIframeUrl(2, params);
  }

  static getIframeUrl(dashboardId, params) {
    let url = `/api/metabase-dashboard-url?dashboardId=${dashboardId}&${paramsToUrlFragment(params)}`;
    const request = new Request(url, {
      method: 'GET'
    });
    return fetch(request).then((response) => {
      return response.text();
    });
  }
}
