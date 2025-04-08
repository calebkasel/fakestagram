import Modal from "./Modal.js"

export default class ModalWithImage extends Modal {
  constructor(modalSelector){
    super({modalSelector});
    this._modalImage = this._modal.querySelector("#modal-image");
    this._modalTitle = this._modal.querySelector("#image-modal-title")
  }

  open(data) {
    this._modalImage.src = data._link;
    this._modalImage.alt = data._name;
    this._modalTitle.textContent = data._name;
    super.open();
  }
}