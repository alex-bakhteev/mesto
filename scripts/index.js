import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const closeIcons = Array.from(document.querySelectorAll('.popup__close-icon'));
const addButton = document.querySelector('.profile__add-button');
const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form-add');
const buttonSubmitFormAdd = formAdd.querySelector('.popup__submit');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_occupation');
const captionInput = document.querySelector('.popup__field_type_caption');
const linkInput = document.querySelector('.popup__field_type_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content.querySelector('.elements__mask');
const popupEnlargedImage = document.querySelector('.popup_enlarged-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupSpanName = formEdit.querySelector('.popup__span_name');
const popupSpanAbout = formEdit.querySelector('.popup__span_about');

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

function openPropfilePopup() {
    nameInput.value = profileTitle.textContent;
    nameInput.classList.remove('popup__field_type_error');
    jobInput.value = profileSubtitle.textContent;
    jobInput.classList.remove('popup__field_type_error');
    popupSpanName.classList.remove('popup__span_active');
    popupSpanAbout.classList.remove('popup__span_active');
    openPopup(popupEdit);
}

export default function openPopup(popup) {
    popup.classList.remove('popup_disabled');
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleClosePopupByEsc);
}

function closePopup(popup) {
    setTimeout(function () {
        popup.classList.remove('popup_opened');
    }, 450);
    popup.classList.add('popup_disabled');
    document.removeEventListener('keydown', handleClosePopupByEsc);
}

function handleClosePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function handleClosePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popupItem = evt.target.closest('.popup');
        closePopup(popupItem);
    }
}

function handleSubmitFormEdit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupEdit);
}

function handleSubmitFormAdd(evt) {
    evt.preventDefault();
    const cardName = captionInput.value;
    const cardLink = linkInput.value;
    const newCard = handleCards.addCard(cardName, cardLink);
    handleCards.renderCard(newCard);
    formAdd.reset();
    closePopup(popupAdd);
    buttonSubmitFormAdd.disabled = true;
    buttonSubmitFormAdd.classList.add('popup__submit_disabled');
}

const handleCards = new Card(initialCards, cardsContainer, cardTemplate, popupImage, popupCaption, popupEnlargedImage);
handleCards.addBaseCards();

editButton.addEventListener('click', openPropfilePopup);
addButton.addEventListener('click', () => { openPopup(popupAdd) });
closeIcons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
document.addEventListener('mousedown', handleClosePopupByOverlay);

formEdit.addEventListener('submit', handleSubmitFormEdit);
formAdd.addEventListener('submit', handleSubmitFormAdd);

const validatorPopupEdit = new FormValidator(config, popupEdit);
validatorPopupEdit.enableValidation();
const validatorPopupAdd = new FormValidator(config, popupAdd);
validatorPopupAdd.enableValidation();