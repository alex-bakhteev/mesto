import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const formAdd = popupAdd.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_occupation');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__mask');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    invalidInputClass: 'popup__field_type_error',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: '.popup__span_',
    inputErrorClassActive: 'popup__span_active'
};

const cardsSection = new Section(
    {
        items: initialCards,
        renderer: createCard,
    },
    '.elements'
);
cardsSection.renderElements();

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
});

const cardInfo = new UserInfo({
    captionSelector: '.popup__field_type_caption',
    linkSelector: '.popup__field_type_link',
});

const editPopup = new PopupWithForm('.popup_edit', handleSubmitFormEdit);
editPopup.setEventListeners();
const addPopup = new PopupWithForm('.popup_add', handleSubmitFormAdd);
addPopup.setEventListeners();

const enlargedImagePopup = new PopupWithImage('.popup_enlarged-image');
enlargedImagePopup.setEventListeners();

const validatorPopupEdit = new FormValidator(validationConfig, popupEdit);
validatorPopupEdit.setEventListeners();
const validatorPopupAdd = new FormValidator(validationConfig, popupAdd);
validatorPopupAdd.setEventListeners();

const getUserInfo = () => {
    const { name, about } = userInfo.getUserInfo();
}

const getCardInfo = () => {
    const { caption, link } = cardInfo.getUserInfo();
}

function openPropfilePopup() {
    validatorPopupEdit.clearInputError();
    const { userName, userAbout } = userInfo.getUserInfo();
    nameInput.value = userName;
    jobInput.value = userAbout;
    editPopup.open();
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

function handleImageClick(caption, link ) {
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
buttonAddProfile.addEventListener('click', () => { addPopup.open(); validatorPopupAdd.clearInputError(); });