import LoginService from "./LoginService";
import {getJson} from "../utils/FetchHelper";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    return getJson(`/api/state/${user.getStateId()}`);
  }

  static getFacilityView(){
    const queryParams = new URLSearchParams(window.location.search);
    const ninId = queryParams.get('ninId');
    return getJson(`/api/facility/assessments?registryUniqueId=${ninId}`);
  }

  static getEntities(filter, filterValues, stateId) {
    return getJson(filter.getUrl(filterValues, stateId), filter.resourceName);
  }
}
