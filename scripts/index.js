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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#edit-modal-close-button"
);

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector("#add-card-close-button");

const imageModal = document.querySelector("#image-modal");
const imageModalCloseButton = imageModal.querySelector(
  "#image-modal-close-button"
);

const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = profileEditModal.querySelector("#edit-profile-title");
const profileDescriptionInput = profileEditModal.querySelector(
  "#edit-profile-description"
);

const addCardTitleInput = addCardModal.querySelector("#add-card-title");
const addCardImageInput = addCardModal.querySelector("#add-card-image");

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
  if (modal == profileEditModal) {
    fillEditModalForm();
  }
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleClickEscape);
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleClickEscape);
  document.removeEventListener("keydown", handleEscapeKey);
}

function fillEditModalForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function fillImageModal(data) {
  const imageModalImage = imageModal.querySelector("#modal-image");
  const imageModalTitle = imageModal.querySelector("#image-modal-title");
  imageModalImage.src = data.link;
  imageModalImage.alt = data.name;
  imageModalTitle.textContent = data.name;
  openModal(imageModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector("#card-image");
  const cardTitleElement = cardElement.querySelector("#card-title");
  const likeButtonElement = cardElement.querySelector("#card-like-button");
  const cardDeleteButton = cardElement.querySelector("#card-delete-button");

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  likeButtonElement.addEventListener("click", () => {
    likeButtonElement.classList.toggle("card__like-button_active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageElement.addEventListener("click", () => {
    fillImageModal(data);
  });

  return cardElement;
}

function appendCard(data) {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement({
    name: addCardTitleInput.value,
    link: addCardImageInput.value,
  });
  cardList.prepend(cardElement);
  closeModal(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});
editModalForm.addEventListener("submit", handleEditProfileSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach(appendCard);
