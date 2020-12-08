import User from "../model/User";

export default class UserProfileService {
  static saveProfile(user, oldPassword, newPassword) {
    let requestObject = {
      firstName: User.getFirstName(user),
      lastName: User.getLastName(user),
      email: User.getEmail(user)
    };
    const request = new Request(`/api/currentUser`, {
      method: 'POST',
      body: requestObject
    });
    return fetch(request).then((response) => {
      console.log(response.statusText);
    });
  }
}
