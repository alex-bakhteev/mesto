export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close-icon');
        this._handleClosePopupByEsc = this._handleClosePopupByEsc.bind(this);
        this._handleClosePopupByOverlay = this._handleClosePopupByOverlay.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleClosePopupByEsc);
    }

    close() {
        setTimeout(() => {
            this._popup.classList.remove('popup_opened');
            // Удаление модификатора плавного закрытия
            this._popup.classList.remove('popup_disabled');
        }, 450);
        // Добавление модификатора плавного закрытия
        this._popup.classList.add('popup_disabled');
        document.removeEventListener('keydown', this._handleClosePopupByEsc);
    }

    _handleClosePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClosePopupByOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', this._handleClosePopupByOverlay);
    }
}
