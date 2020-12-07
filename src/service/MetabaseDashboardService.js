import {paramsToUrlFragment} from "../utils/FetchHelper";

export default class MetabaseDashboardService {
  static getMainDashboardIframeUrl(state, urlFragment) {
    let params = Object.assign({"state": state.name}, urlFragment);
    // let urlFragment = paramsToUrlFragment(params);
    let dashboardId = _.isEmpty(urlFragment) ? 2 : 7;
    return this.getIframeUrl(dashboardId, urlFragment);
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
