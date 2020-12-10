import LoginService from "./LoginService";
import {get} from "../utils/FetchHelper";

export default class DataReadService {
  static getState() {
    let user = LoginService.getUser();
    return get(`/api/state/${user.getStateId()}`);
  }
}
