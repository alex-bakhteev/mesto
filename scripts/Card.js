import openPopup from "./index.js";

export default class Card {
    constructor(initialCards, cardsContainer, cardTemplate, popupImage, popupCaption, popupEnlargedImage) {
        this.initialCards = initialCards;
        this.cardsContainer = cardsContainer;
        this.cardTemplate = cardTemplate;
        this.popupImage = popupImage;
        this.popupCaption = popupCaption;
        this.popupEnlargedImage = popupEnlargedImage;
    }

    addCard(name, link) {
        this.card = this.cardTemplate.cloneNode(true);
        this.cardText = this.card.querySelector('.elements__text');
        this.cardImage = this.card.querySelector('.elements__element');
        this.cardDelete = this.card.querySelector('.elements__trash');
        this.likeButton = this.card.querySelector('.elements__like');
        this.cardText.textContent = name;
        this.cardImage.src = link;
        this.cardImage.alt = name;
        this.cardDelete.addEventListener('click', () => { this.cardDelete.closest('.elements__mask').remove(); });
        this.likeButton.addEventListener('click', () => { this.likeButton.classList.toggle('elements__like_active'); });

        this.cardImage.addEventListener('click', () => {
            this.popupImage.src = link;
            this.popupImage.alt = name;
            this.popupCaption.textContent = name;
            openPopup(this.popupEnlargedImage);
        });
        return this.card;
    };

    addBaseCards() {
        this.initialCards.forEach(item => {
            const newCard = this.addCard(item.name, item.link);
            this.renderCard(newCard);
        });
    };

    renderCard(card) {
        this.cardsContainer.prepend(card);
    };

};