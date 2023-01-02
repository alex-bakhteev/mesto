export default class FormValidator {
    constructor(config, formType) {
        this._formType = formType;
        this._inputSelector = config.inputSelector;
        this._invalidInputClass = config.invalidInputClass;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._inputErrorClassActive = config.inputErrorClassActive;
    }

    _showInputError(input) {
        input.classList.add(this._invalidInputClass);
        this._errorElement.textContent = input.validationMessage;
        this._errorElement.classList.add(this._inputErrorClassActive);
    };

    _hideInputError(input) {
        input.classList.remove(this._invalidInputClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._inputErrorClassActive);
    };

    clearInputError() {
        this._inputList.forEach(input => {
            this._errorElement = this._formType.querySelector(`${this._inputErrorClass}${input.name}`);
            this._hideInputError(input);
        });
    };

    disableButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    };

    _enableButton() {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    };

    _checkInputError() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    };

    toggleButtonState() {
        if (this._checkInputError(this._inputList)) {
            this.disableButton();
        } else {
            this._enableButton();
        }
    };

    _checkInputValidity(input) {
        this._errorElement = this._formType.querySelector(`${this._inputErrorClass}${input.name}`);

        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    };

    setEventListeners() {
        this._inputList = Array.from(this._formType.querySelectorAll(this._inputSelector));
        this._submitButton = this._formType.querySelector(this._submitButtonSelector);
        this._inputList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this.toggleButtonState();
            });
        });
    };
};