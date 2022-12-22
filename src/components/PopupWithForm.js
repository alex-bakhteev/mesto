import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._formInputs = Array.from(
            this._form.querySelectorAll('.popup__field')
        );
    }

    _getInputValues() {
        this._inputs = {};
        this._formInputs.forEach((element) => {
            this._inputs[element.name] = element.value;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._submitForm(this._inputs);
            this.close();
        });
    }
}
