import Modal from "./Modal.js";
import { validationOptions } from "../utils/constants.js";

export default class DeleteModal extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    // this._form = this._modal.querySelector(".modal__form");
    // this._sumbitButton = this._modal.querySelector(".modal__button");
    this._modalForm = this._modal.querySelector(validationOptions.formSelector);
    this._submitButton = this._modal.querySelector(
      validationOptions.submitButtonSelector
    );
    // this._handleFormSubmit = handleFormSubmit;

    this._submitForm = this._submitForm.bind(this);
  }

  setSubmitAction(action) {
    console.log("set submit action");
    this._handleFormSubmit = action;
  }

  _submitForm() {
    this._handleFormSubmit();
  }

  _handleSubmit(evt) {
    // evt.preventDefault();
    console.log("submitted");
    this._submitForm();
  }

  open() {
    super.open();
    console.log("opened");
    this.setEventListeners();
  }

  close() {
    super.close();
    this._submitButton.removeEventListener("click", this._handleSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    console.log("delete event listener created");

    this._submitButton.addEventListener("click", () => {
      console.log("before handle submit call");
      this._handleSubmit();
    });
  }
}
