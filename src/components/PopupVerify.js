import Popup from './Popup';

export default class PopupVerify extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.popup__submit');
    this._handleDeleteCard = handleDeleteCard;
  }

  getCardID(id) {
    this._cardID = id;
    super.open();
  }

  getClean(clean) {
    this._clean = clean;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._handleDeleteCard(this._cardID, this._clean);
    });
  }
}
