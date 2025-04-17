export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(result) {
    if(result.ok){
      return result.json();
    }

    return Promise.reject(`Error: ${result.status}`);
  }

  _fetch(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  addCard(name, link) {
    return this._fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
  }

  deleteCard(cardId) {
    console.log("here");
    console.log(cardId);
    return this._fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}