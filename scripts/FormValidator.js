export default class FormValidator {
    constructor(config, formType) {
        this.config = config;
        this.formType = formType;

        this.formSelector = config.formSelector;
        this.inputSelector = config.inputSelector;
        this.invalidInputClass = config.invalidInputClass;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.inputErrorClassActive = config.inputErrorClassActive;
    }

    showInputError(input) {
        input.classList.add(this.config.invalidInputClass);
        this.errorElement.textContent = input.validationMessage;
        this.errorElement.classList.add(this.config.inputErrorClassActive);
    };

    hideInputError(input) {
        input.classList.remove(this.config.invalidInputClass);
        this.errorElement.textContent = '';
        this.errorElement.classList.remove(this.config.inputErrorClassActive);
    };

    enableButton() {
        this.submitButton.classList.add(this.config.inactiveButtonClass);
        this.submitButton.disabled = true;
    };

    disableButton() {
        this.submitButton.classList.remove(this.config.inactiveButtonClass);
        this.submitButton.disabled = false;
    };

    checkInputError() {
        return this.inputList.some(inputElement => {
            return !inputElement.validity.valid
        })
    };

    toggleButtonState() {
        if (this.checkInputError(this.inputList)) {
            this.enableButton();
        } else {
            this.disableButton();
        }
    };

    checkInputValidity(input, formElement) {
        this.errorElement = formElement.querySelector(`${this.config.inputErrorClass}${input.name}`);

        if (!input.validity.valid) {
            this.showInputError(input);
        } else {
            this.hideInputError(input);
        }
    };

    setEventListeners(formElement) {
        this.inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
        this.submitButton = formElement.querySelector(this.config.submitButtonSelector);

        this.inputList.forEach(input => {
            input.addEventListener('input', () => {
                this.checkInputValidity(input, formElement);
                this.checkInputError();
                this.toggleButtonState();
            });
        });
    };

    enableValidation() {
        const forms = Array.from(this.formType.querySelectorAll(this.config.formSelector));

        forms.forEach(formElement => {
            this.setEventListeners(formElement);
        })
    };
};