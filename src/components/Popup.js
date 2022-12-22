export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._closeIcon = this._popupSelector.querySelector('.popup__close-icon');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleClosePopupByEsc.bind(this));
    }

    close() {
        setTimeout(() => {
            this._popupSelector.classList.remove('popup_opened');
            // Удаление модификатора плавного закрытия
            this._popupSelector.classList.remove('popup_disabled');
        }, 450);
        // Добавление модификатора плавного закрытия
        this._popupSelector.classList.add('popup_disabled');
        document.removeEventListener('keydown', this._handleClosePopupByEsc.bind(this));
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
        this._closeIcon.addEventListener('click', () => this.close());
        document.addEventListener('mousedown', this._handleClosePopupByOverlay.bind(this));
    }
}
