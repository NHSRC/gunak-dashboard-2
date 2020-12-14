import LoginService from "./LoginService";
import {getJson} from "../utils/FetchHelper";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    return getJson(`/api/state/${user.getStateId()}`);
  }

  static getPrograms() {
    return getJson(`/api/assessmentToolMode`, 'assessmentToolMode');
  }

  static getAssessmentTools(stateId, programId) {
    return getJson(`/api/assessmentTool/search/findByStateAndAssessmentToolMode?stateId=${stateId}&assessmentToolModeId=${programId}`);
  }
}
