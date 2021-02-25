import {getText} from "../utils/FetchHelper";
import _ from 'lodash';

//#hide_parameters=id

export default class MetabaseDashboardService {
  static getResourceIframeUrl(params, resource, otherParams) {
    let keys = Object.keys(params);
    let queryPart = _.join(keys.map((key) => `${key}=${params[key]}`), '&');
    let searchParams = _.isEmpty(otherParams) ? queryPart : `${queryPart}&${otherParams}`;
    return this.getIframeUrl(resource, searchParams);
  }

  static getIframeUrl(resource, urlFragment) {
    let url = `/api/metabase-${resource.type}-url?resourceId=${resource.id}&${urlFragment}`;
    return getText(url);
  }
}
