import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupEnlargedImage = this._popupSelector.querySelector('.popup__image');
        this._popupCaption = this._popupSelector.querySelector('.popup__caption');
    }

    open(name, link) {
        this._popupEnlargedImage.src = link;
        this._popupEnlargedImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}
