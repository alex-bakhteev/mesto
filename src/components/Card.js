import PopupWithImage from "./PopupWithImage.js";

export default class Card {
    constructor(cardTemplate, nameCard, linkCard, handleImageClick) {
        this._cardTemplate = cardTemplate;
        this._nameCard = nameCard;
        this._linkCard = linkCard;
        this._handleImageClick = handleImageClick;
    }

    createCard() {
        this._card = this._cardTemplate.cloneNode(true);
        this._cardText = this._card.querySelector('.elements__text');
        this._cardImage = this._card.querySelector('.elements__element');
        this._buttonDelete = this._card.querySelector('.elements__trash');
        this._buttonLike = this._card.querySelector('.elements__like');
        this._cardText.textContent = this._nameCard;
        this._cardImage.src = this._linkCard;
        this._cardImage.alt = this._nameCard;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        this._buttonDelete.addEventListener('click', () => { this._card.remove(); });
        this._buttonLike.addEventListener('click', () => { this._buttonLike.classList.toggle('elements__like_active'); });
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._nameCard, this._linkCard);
        });
    }
};