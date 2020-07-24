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

  rendererUserInfo(api) {
    api
      .then(res => {
        this._userName.textContent = res.name;
        this._userJob.textContent = res.about;
        this._avatar.src = res.avatar;
      })
      .catch((err) => console.log(err));
  }

  setUserAvatar(api) {
    api
      .then(res => {
        this._avatar.src = res.avatar;
      })
      .catch((err) => console.log(err));
  }
}