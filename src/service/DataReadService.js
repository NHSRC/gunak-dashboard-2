import LoginService from "./LoginService";
import {getJson} from "../utils/FetchHelper";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    return getJson(`/api/state/${user.getStateId()}`);
  }

  static getEntities(filter, filterValues) {
    return getJson(filter.getUrl(filterValues), filter.resourceName);
  }

  static getPrograms() {
    return getJson(`/api/assessmentToolMode`, 'assessmentToolMode');
  }

  static getAssessmentTools(stateId, programId) {
    return getJson(`/api/assessmentTool/search/findByStateAndAssessmentToolMode?stateId=${stateId}&assessmentToolModeId=${programId}`);
  }

  static getAssessmentTypes(programId) {
    return getJson(`/api/assessmentType/search/findAllByAssessmentToolModeId?assessmentToolModeId=${programId}`, 'assessmentType');
  }
}
