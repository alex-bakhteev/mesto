export default class Api {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    _getStatus(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers,
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, { headers: this.headers }).then((res) => {
            return this._getStatus(res);
        });
    }

    editProfileInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ name: name, about: about }),
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    editProfileAvatar({ link }) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ avatar: link }),
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    addCard({ caption, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name: caption, link: link }),
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    addLike(id, likes) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify({ likes }),
        }).then((res) => {
            return this._getStatus(res);
        });
    }

    deleteLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        }).then((res) => {
            return this._getStatus(res);
        });
    }
}