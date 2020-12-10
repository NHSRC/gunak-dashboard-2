import LoginService from "./LoginService";
import {getJson} from "../utils/FetchHelper";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    return getJson(`/api/state/${user.getStateId()}`);
  }
}
