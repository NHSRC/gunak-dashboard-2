export default class MetabaseDashboardService {
  static getMainDashboardIframeUrl(onError) {
    return this.getIframeUrl(2, onError);
  }

  static getIframeUrl(dashboardId, onError) {
    const request = new Request(`/api/metabase-dashboard-url?dashboardId=${dashboardId}`, {
      method: 'GET'
    });
    return fetch(request).then((response) => {
      return response.text();
    }).catch((error) => onError(error));
  }
}
