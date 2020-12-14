import {getText} from "../utils/FetchHelper";
import _ from 'lodash';

export default class MetabaseDashboardService {
  static getResourceIframeUrl(state, resource, dashboardParams) {
    let searchParams = _.isEmpty(dashboardParams) ? `state=${state.name}` : `state=${state.name}&${dashboardParams}`;
    return this.getIframeUrl(resource, searchParams);
  }

  static getIframeUrl(resource, urlFragment) {
    let url = `/api/metabase-${resource.type}-url?resourceId=${resource.id}&${urlFragment}`;
    return getText(url);
  }
}
