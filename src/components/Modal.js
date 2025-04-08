export default class Modal {
  constructor({modalSelector}) {
    this._modal = document.querySelector(modalSelector);
    this._handleEscDown = this._handleEscapeKey.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened");
    this._modal.addEventListener("keydown", this._handleEscDown);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    this._modal.removeEventListener("keydown", this._handleEscDown);
  }

  _handleEscapeKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modal.closest(".modal").addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal__close-button") || evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
