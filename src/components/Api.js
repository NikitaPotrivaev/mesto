export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    }

    getProfileData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkRequest)
    }

    sendProfileData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ name: data.name, about: data.description })
        })
        .then(this._checkRequest)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkRequest)
    }

    editAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatarUrl.avatar })
        })
        .then(this._checkRequest)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({ name, link })
        })
        .then(this._checkRequest)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
        .then(this._checkRequest)
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT'
        })
        .then(this._checkRequest)
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE'
        })
        .then(this._checkRequest)
    }
}