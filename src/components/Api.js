export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(res => {
      return res.json;
    })
    .then((res) => {
      console.log(res)
    });
  }
}