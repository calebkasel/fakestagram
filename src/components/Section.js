export default class Section {
  constructor({items, renderer}, cardListSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._cardList = document.querySelector(cardListSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
  addItem(element){
      this._cardList.prepend(element);
  }
}