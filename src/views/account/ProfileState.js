export default class ProfileState {
  static newInstance(user) {
    let profileState = new ProfileState();
    profileState.user = user;
    return profileState;
  }

  static clone(other) {
    let profileState = new ProfileState();
    profileState.user = other.user;
    profileState.state = other.state;
    return profileState;
  }
}
