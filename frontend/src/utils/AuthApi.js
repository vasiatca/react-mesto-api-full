import { apiSettings } from "./constants";

class AuthApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    login({ password, email }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password,
                email,
            }),
        })
            .then((res) => this._getResponseData(res));
    }

    register({ password, email }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                password,
                email,
            }),
        })
            .then((res) => this._getResponseData(res));
    }

    // getUser(token) {
    //     return fetch(`${this._baseUrl}/users/me`, {
    //         method: "GET",
    //         headers: {
    //             ...this._headers,
    //             Authorization: `Bearer ${token}`,
    //         },
    //     })
    //         .then((res) => this._getResponseData(res));
    // }
}

const api = new AuthApi({
    baseUrl: apiSettings.baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;