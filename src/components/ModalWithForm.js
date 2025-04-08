import { validationOptions } from "../utils/constants";
import Modal from "./Modal";

export default class ModalWithForm extends Modal {
  constructor({modalSelector, handleFormSubmit}) {
    super({ modalSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._modalForm = this._modal.querySelector(validationOptions.formSelector);
    this._submitButton = this._modal.querySelector(
      validationOptions.submitButtonSelector
    );
    this._inputList = this._modal.querySelectorAll(
      validationOptions.inputSelector
    );
  }

  _getInputValues() {
    const inputs = {};

    this._inputList.forEach((input) => {
      inputs[input.name] = input.value
    });
    console.log(inputs);
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
