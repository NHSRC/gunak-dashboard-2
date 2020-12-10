import User from "../model/User";
import UserRepository from "./UserRepository";

export default class UserProfileService {
  static saveProfile(user, oldPassword, newPassword) {
    let requestObject = {
      firstName: User.getFirstName(user),
      lastName: User.getLastName(user),
      email: User.getEmail(user),
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const request = new Request(`/api/currentUser`, {
      method: 'POST',
      body: JSON.stringify(requestObject),
      headers: new Headers({'Content-Type': 'application/JSON'})
    });
    return fetch(request).then((response) => {
      return response.json();
    }).then((userJson) => {
      UserRepository.setUser(userJson);
      return UserRepository.getUser();
    });
  }
}
