import Modal from "./Modal.js";

export default class DeleteModal {
  constructor(modalSelector) {
    super({modalSelector});
    this._form = this._modal.querySelector(".modal__form");
    this._sumbitButton = this._modal.querySelector(".modal__button");

    this._submitForm = this._submitForm.bind(this);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  _submitForm() {
    this._handleFormSubmit();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitForm();
  }

  open() {
    super.open();
    this.setEventListeners();
  }

  close() {
    super.close();
    this._sumbitButton.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();

    this._sumbitButton.addEventListener("submit", this._handleSubmit);
  }




}