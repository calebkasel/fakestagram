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
import DeleteModal from "../components/DeleteModal.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");

const addCardButton = document.querySelector("#add-card-button");

const profileTitleInput = profileEditModal.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditModal.querySelector(
  "#edit-profile-description"
);

const editModalForm = document.forms["edit-profile-form"];
const addCardModalForm = document.forms["add-card-form"];
const editProfilePicForm = document.forms["edit-profile-pic-form"];

const editFormValidator = new FormValidator(validationOptions, editModalForm);
const addCardValidator = new FormValidator(validationOptions, addCardModalForm);

const imageModal = new ModalWithImage(selectors.imageModal);

const renderCard = (data) => {
  const card = new Card({
    data,
    cardSelector: selectors.cardTemplate,
    handleImageClick: (data) => {
      imageModal.open(data);
    },
    handleDeleteCard: () => {
      deleteCardModal.setSubmitAction(() => {
        console.log("in submit action");
        console.log();
        api
          .deleteCard(card._id)
          .then((result) => {
            card.handleDeleteCard(result._id);
            deleteCardModal.close();
          })
          .catch(console.error);
      });
      deleteCardModal.open();
    },
  });

  cardList.addItem(card.getCard());
};

editFormValidator.enableValidation();
addCardValidator.enableValidation();

const userInfo = new UserInfo({
  userName: selectors.profileTitle,
  userDescription: selectors.profileDescription,
  currentProfPic: selectors.profileAvatar,
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
  handleFormSubmit: ({ name, link }) => {
    api
      .addCard(name, link)
      .then((data) => {
        renderCard(data);
        newCardModal.close();
      })
      .catch(console.error);
  },
});

// const deleteCardModal = new DeleteModal({
//   modalSelector: selectors.deleteModal,
//   handleFormSubmit: () => {
//     console.log("in submit action");
//     console.log()
//     api
//       .deleteCard(card._id)
//       .then((result) => {
//         card.handleDeleteCard(result._id);
//         deleteCardModal.close();
//       })
//       .catch(console.error);
//   },
// });

const deleteCardModal = new DeleteModal(selectors.deleteModal);

imageModal.setEventListeners();
userInfoModal.setEventListeners();
newCardModal.setEventListeners();
deleteCardModal.setEventListeners();

// cardList.renderItems();

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
  },
});

let userId;
let cardListSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.description);
    userInfo.setUserAvatar(userData.avatar);
    cardListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          renderCard(data);
        },
      },
      selectors.cardsList
    );
    cardListSection.renderItems();
  })
  .catch(console.error);

console.log(api.getInitialCards());
