export default class UserInfo {
  constructor(userName, userJob, avatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userData = {};

    userData.name = this._userName.textContent;
    userData.profession = this._userJob.textContent;

    return userData;
  }

  setUserInfo(value) {
        this._userName.textContent = value.name;
        this._userJob.textContent = value.about;
  }

  setUserAvatar(value) {
        this._avatar.src = value.avatar;
  }
}