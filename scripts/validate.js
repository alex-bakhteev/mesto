const showInputError = (input, errorElement, config) => {
    input.classList.add(config.invalidInputClass);
    errorElement.textContent = input.validationMessage;
};

const hideInputError = (input, errorElement, config) => {
    input.classList.remove(config.invalidInputClass);
    errorElement.textContent = '';
};

const activeButton = (submitButton, config) => {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
};

const disableButton = (submitButton, config) => {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
};

const toggleButtonState = (inputList, submitButton, config) => {
    if (inputList.some((inputElement) => !inputElement.validity.valid)) {
        activeButton(submitButton, config);
    } else {
        disableButton(submitButton, config);
    }
};

const checkInputValidity = (input, formElement, config) => {
    const errorElement = formElement.querySelector(`.popup__span_${input.name}`);

    if (!input.validity.valid) {
        showInputError(input, errorElement, config);
    } else {
        hideInputError(input, errorElement, config);
    }
};

const handleFormInput = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, formElement, config);
            toggleButtonState(inputList, submitButton, config);
        });
    });
};

const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach(formElement => {
        handleFormInput(formElement, config);
    })
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    invalidInputClass: 'popup__field_type_error',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: '.popup__span',
});