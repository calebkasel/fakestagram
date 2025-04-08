const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

function showError (formEl, inputEl, {inputErrorClass, errorClass} ) {
  console.log(`${inputEl.id}-error`);
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorEl.textContent = inputEl.validationMessage;
  errorEl.classList.add(errorClass);
}

function hideError (formEl, inputEl, {inputErrorClass, errorClass}) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = "";
}

const checkInputValidity = (formEl, inputEl, options) => {
  if(!inputEl.validity.valid){
    showError(formEl, inputEl, options);
  } else {
    hideError(formEl, inputEl, options);
  }
}

function hasValidInput (inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

function toggleButtonState (inputList, buttonEl, {inactiveButtonClass}) {
  if(hasValidInput(inputList)){
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

function setEventListeners (formEl, {inputSelector, submitButtonSelector}) {
  const inputList = [...formEl.querySelectorAll(inputSelector)];
  const buttonEl = formEl.querySelector(submitButtonSelector);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputList, buttonEl, options)
    });
  });
}

function enableValidation ({ formSelector }) {
  const formList = [...document.querySelectorAll(formSelector)];

  formList.forEach(formEl => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, options)
  });
}

enableValidation(options);