import "./pages/index.css";
import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formAdd = popupAdd.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_occupation');
const captionInput = document.querySelector('.popup__field_type_caption');
const linkInput = document.querySelector('.popup__field_type_link');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__mask');
const popupEnlargedImage = document.querySelector('.popup_enlarged-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

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

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    invalidInputClass: 'popup__field_type_error',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: '.popup__span_',
    inputErrorClassActive: 'popup__span_active'
};

const handleSections = new Section(
    {
        items: initialCards,
        renderer: createCard,
    },
    '.elements'
);
handleSections.renderElements();

const infoList = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
});

const editPopup = new PopupWithForm('.popup_edit', handleSubmitFormEdit);
editPopup.setEventListeners();
const addPopup = new PopupWithForm('.popup_add', handleSubmitFormAdd);
addPopup.setEventListeners();

const enlargedImagePopup = new PopupWithImage('.popup_enlarged-image');
enlargedImagePopup.setEventListeners();

const validatorPopupEdit = new FormValidator(config, popupEdit);
validatorPopupEdit.setEventListeners();
const validatorPopupAdd = new FormValidator(config, popupAdd);
validatorPopupAdd.setEventListeners();

function openPropfilePopup() {
    validatorPopupEdit.clearInputError();
    const { userName, userAbout } = infoList.getUserInfo();
    nameInput.value = userName;
    jobInput.value = userAbout;
}

function handleSubmitFormEdit() {
    infoList.setUserInfo(nameInput.value, jobInput.value);
}

function handleSubmitFormAdd() {
    const cardName = captionInput.value;
    const cardLink = linkInput.value;
    const newCard = getCard(cardName, cardLink);
    handleSections.addItem(newCard);
    validatorPopupAdd.enableButton();
    formAdd.reset();
}

function createCard(card) {
    const newCard = getCard(card.name, card.link);
    handleSections.addItem(newCard);
}

function getCard(name, link) {
    const handleCards = new Card(initialCards, cardsContainer, cardTemplate, popupImage, popupCaption, popupEnlargedImage);
    return handleCards.addCard(name, link);
}

editButton.addEventListener('click', () => { editPopup.open(); openPropfilePopup(); });
addButton.addEventListener('click', () => { addPopup.open(); validatorPopupAdd.clearInputError(); });