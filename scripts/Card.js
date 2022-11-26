import openPopup from "./index.js";

export default class Card {
    constructor(initialCards, cardsContainer, cardTemplate, popupImage, popupCaption, popupEnlargedImage) {
        this._initialCards = initialCards;
        this._cardsContainer = cardsContainer;
        this._cardTemplate = cardTemplate;
        this._popupImage = popupImage;
        this._popupCaption = popupCaption;
        this._popupEnlargedImage = popupEnlargedImage;
    }

    addCard(name, link) {
        this._card = this._cardTemplate.cloneNode(true);
        this._cardText = this._card.querySelector('.elements__text');
        this._cardImage = this._card.querySelector('.elements__element');
        this._deleteButtons = this._card.querySelectorAll('.elements__trash');
        this._likeButtons = this._card.querySelectorAll('.elements__like');
        this._cardText.textContent = name;
        this._cardImage.src = link;
        this._cardImage.alt = name;
        this._deleteButtons.forEach(item => { item.addEventListener('click', () => { item.closest('.elements__mask').remove(); }); });
        this._likeButtons.forEach(item => { item.addEventListener('click', () => { item.classList.toggle('elements__like_active'); }); });

        this._cardImage.addEventListener('click', () => {
            this._popupImage.src = link;
            this._popupImage.alt = name;
            this._popupCaption.textContent = name;
            openPopup(this._popupEnlargedImage);
        });
        return this._card;
    };
};