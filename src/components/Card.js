class Card {
  constructor({data, cardSelector, handleImageClick, handleDeleteCard}) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
  }

  _handleDeleteCardClick() {
    this._handleDeleteCard();
  }

  _deleteCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  handleDeleteCard() {
    this._deleteCard();
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _fillCardData() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  getCard() {
    this._cardEl = this._getTemplate();
    this._cardTitle = this._cardEl.querySelector("#card-title");
    this._cardImage = this._cardEl.querySelector("#card-image");
    this._likeButton = this._cardEl.querySelector("#card-like-button");
    this._cardDeleteButton = this._cardEl.querySelector("#card-delete-button");

    this._fillCardData();
    this._setEventListeners();

    return this._cardEl;
  }
}

export default Card;
