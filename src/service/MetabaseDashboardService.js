import {getText} from "../utils/FetchHelper";
import _ from 'lodash';

//#hide_parameters=id

export default class MetabaseDashboardService {
  static getIframeResource(params, resource) {
    let url = `/api/metabase-${resource.type}-url?`;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append("resourceId", resource.id);
    Object.keys(params).forEach((key) => urlSearchParams.append(key, params[key]));
    return getText(url + urlSearchParams.toString());
  }
}
