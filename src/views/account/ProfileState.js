export default class ProfileState {
  static newInstance(user) {
    let profileState = new ProfileState();
    profileState.user = user;
    profileState.oldPassword = null;
    profileState.newPassword = null;
    return profileState;
  }

  static clone(other) {
    let profileState = new ProfileState();
    profileState.user = other.user;
    profileState.oldPassword = other.oldPassword;
    profileState.newPassword = other.newPassword;
    profileState.apiResponse = other.apiResponse;
    return profileState;
  }
}
