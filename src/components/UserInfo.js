export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userAbout = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userAbout: this._userAbout.textContent,
        };
    }

    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }
}
