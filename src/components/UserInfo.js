export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.profession = this._userJob.textContent;

    return userData;
  }

  setUserInfo(name, profession) {
    this._userName.textContent = name;
    this._userJob.textContent = profession;
  }

}