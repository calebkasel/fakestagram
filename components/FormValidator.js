class FormValidator {
    constructor(options, formEl){
        this._formSelector = options.formSelector;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;

        this._formEl = formEl;
        this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
        this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);

    }

    _showError(inputEl) {
        const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorEl.textContent = inputEl.validationMessage;
        errorEl.classList.add(this._errorClass);
    }

    _hideError(inputEl) {
        const errorEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorEl.classList.remove(this._errorClass);
        errorEl.textContent = "";
    }

    _checkInputValidity(inputEl) {
        if(!inputEl.validity.valid){
            this._showError(inputEl);
        } else {
            this._hideError(inputEl);
        }
    }

    _hasInvalidInput() {
        this._inputList.some((inputEl) => {
            return !inputEl.validity.valid;
        })
    }

    _disableButton() {
        this._buttonEl.classList.add(this._inactiveButtonClass);
        this._buttonEl.disabled = true;
    }

    _toggleButtonState() {
        if(this._hasInvalidInput()){
            this._disableButton();
        } else {
            this._buttonEl.classList.remove(this._inactiveButtonClass);
            this._buttonEl.disabled = false;
        }
    }

    _setEventListeners() {
        this._inputList.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
        });

        this._toggleButtonState();
    }

    resetForm() {
        this._disableButton();
        this._inputList.forEach((inputEl) => {
            this._hideError(inputEl);
        });
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}

export default FormValidator;