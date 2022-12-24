import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
    popupEdit,
    popupAdd,
    buttonEditProfile,
    buttonAddProfile,
    formAdd,
    nameInput,
    jobInput,
    cardTemplate,
    initialCards,
    validationConfig,
} from "../utils/constants.js"

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
});

const cardsSection = new Section(
    {
        items: initialCards,
        renderer: createCard,
    },
    '.elements'
);
cardsSection.renderElements();

const popupEditProfile = new PopupWithForm('.popup_edit', handleSubmitFormEdit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_add', handleSubmitFormAdd);
popupAddCard.setEventListeners();

const enlargedImagePopup = new PopupWithImage('.popup_enlarged-image');
enlargedImagePopup.setEventListeners();

const validatorPopupEdit = new FormValidator(validationConfig, popupEdit);
validatorPopupEdit.setEventListeners();
const validatorPopupAdd = new FormValidator(validationConfig, popupAdd);
validatorPopupAdd.setEventListeners();

const { name, about } = userInfo.getUserInfo();

function openPropfilePopup() {
    validatorPopupEdit.clearInputError();
    const { userName, userAbout } = userInfo.getUserInfo();
    nameInput.value = userName;
    jobInput.value = userAbout;
    popupEditProfile.open();
}

function handleSubmitFormEdit({ name, about }) {
    userInfo.setUserInfo(name, about);
}

function handleSubmitFormAdd({ caption, link }) {
    const newCard = getCard(caption, link);
    cardsSection.addItem(newCard);
    validatorPopupAdd.disableButton();
    formAdd.reset();
}

function handleImageClick(caption, link) {
    enlargedImagePopup.open(caption, link);
}

function createCard(card) {
    const newCard = getCard(card.name, card.link);
    cardsSection.addItem(newCard);
}

function getCard(caption, link) {
    const createCards = new Card(cardTemplate, caption, link, handleImageClick);
    return createCards.createCard(caption, link);
}

buttonEditProfile.addEventListener('click', () => { openPropfilePopup(); });
buttonAddProfile.addEventListener('click', () => { popupAddCard.open(); validatorPopupAdd.clearInputError(); });