import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const closeButtons = document.querySelectorAll(".modal__close-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");

const imageModal = document.querySelector("#image-modal");

const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = profileEditModal.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditModal.querySelector(
  "#edit-profile-description"
);

const addCardTitleInput = addCardModal.querySelector("#add-card-title");
const addCardImageInput = addCardModal.querySelector("#add-card-url");

const editModalForm = profileEditModal.querySelector("#modal-form");
const addCardModalForm = addCardModal.querySelector("#modal-form");
const cardList = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;



function handleClickEscape(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleClickEscape);
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleClickEscape);
  document.removeEventListener("keydown", handleEscapeKey);
}

function fillImageModal(data) {
  const imageModalImage = imageModal.querySelector("#modal-image");
  const imageModalTitle = imageModal.querySelector("#image-modal-title");
  imageModalImage.src = data._link;
  imageModalImage.alt = data._name;
  imageModalTitle.textContent = data._name;
  openModal(imageModal);
}

function createCard(data){
  const newCard = new Card(data, cardTemplate, fillImageModal);
  return newCard;
}

function appendCard(data) {
  const cardElement = createCard(data);
  cardList.append(cardElement.getCard());
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  console.log(addCardTitleInput.value);
  console.log()
  const link = addCardImageInput.value;

  const cardElement = createCard({name, link});

  cardList.prepend(cardElement.getCard());
  evt.target.reset();
  closeModal(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillEditModalForm();
  editFormValidator.resetForm();
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");

  button.addEventListener("click", () => closeModal(modal));
});

editModalForm.addEventListener("submit", handleEditProfileSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardValidator.resetForm();
});

addCardModalForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(appendCard);

const validationOptions = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const editFormValidator = new FormValidator(validationOptions, editModalForm);
const addCardValidator = new FormValidator(validationOptions, addCardModalForm);

editFormValidator.enableValidation();
addCardValidator.enableValidation();