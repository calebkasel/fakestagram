import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";
import {
  initialCards,
  selectors,
  validationOptions,
} from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");

const addCardButton = document.querySelector("#add-card-button");

const profileTitleInput = profileEditModal.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditModal.querySelector(
  "#edit-profile-description"
);

const editModalForm = document.forms["edit-profile-form"];
const addCardModalForm = document.forms["add-card-form"];

const editFormValidator = new FormValidator(validationOptions, editModalForm);
const addCardValidator = new FormValidator(validationOptions, addCardModalForm);

const imageModal = new ModalWithImage(selectors.imageModal);

const renderCard = (data) => {
  const card = new Card(data, selectors.cardTemplate, (data) => {
    imageModal.open(data);
  });

  cardList.addItem(card.getCard());
};

editFormValidator.enableValidation();
addCardValidator.enableValidation();

const userInfo = new UserInfo({
  userName: selectors.profileTitle,
  userDescription: selectors.profileDescription,
});

const cardList = new Section(
  { items: initialCards, renderer: renderCard },
  selectors.cardsList
);

const userInfoModal = new ModalWithForm({
  modalSelector: selectors.profileEditModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.title, data.description);
    userInfoModal.close();
  },
});

const newCardModal = new ModalWithForm({
  modalSelector: selectors.addCardModal,
  handleFormSubmit: (data) => {
    console.log(data);
    renderCard(data);
    newCardModal.close();
  },
});

imageModal.setEventListeners();
userInfoModal.setEventListeners();
newCardModal.setEventListeners();

cardList.renderItems();

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();

  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.description;

  editFormValidator.resetForm();
  userInfoModal.open();
});

addCardButton.addEventListener("click", () => {
  addCardValidator.resetForm();
  newCardModal.open();
});

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d80739d0-706b-4b94-8e8d-9efce9e4b748",
    "Content-Type": "application/json",
  }
});

const cards = api.getInitialCards();


