import { apiSettings } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  setHeaders(headers) {
    this._headers = {
      ...this._headers,
      ...headers
    }
  }

  _getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  editUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.unlike(cardId);
    } else {
      return this.like(cardId);
    }
  }

  like(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  unlike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

// const token = localStorage.getItem("token");

const api = new Api({
  baseUrl: apiSettings.baseUrl,
  headers: {
    // authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default api;