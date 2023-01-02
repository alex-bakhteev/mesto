import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupVerify from "../components/PopupVerify";

import {
    popupEdit,
    popupAdd,
    popupEditAvatar,
    buttonEditProfile,
    buttonAddProfile,
    buttonEditAvatar,
    nameInput,
    jobInput,
    cardTemplate,
    validationConfig,
} from "../utils/constants.js"

const userID = {
    id: null,
};

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
    headers: {
        authorization: 'bd0daa13-51ff-4893-a3a0-a387cfecc208',
        'Content-Type': 'application/json'
    }
};

const api = new Api(apiConfig);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([{ name, about, avatar, _id }, cards]) => {
        userInfo.setUserInfo(name, about);
        userInfo.setAvatar(avatar);
        userID.id = _id;
        cardsSection.renderElements(cards.reverse());
    })
    .catch((err) => {
        console.log(err);
    });

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar',
});

const cardsSection = new Section(
    {
        renderer: createCard,
    },
    '.elements'
);

const popupEditProfile = new PopupWithForm('.popup_edit', handleSubmitFormEdit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm('.popup_add', handleSubmitFormAdd);
popupAddCard.setEventListeners();

const popupEditUserAvatar = new PopupWithForm(
    '.popup_edit-avatar',
    handleSubmitFormEditAvatar
);
popupEditUserAvatar.setEventListeners();

const enlargedImagePopup = new PopupWithImage('.popup_enlarged-image');
enlargedImagePopup.setEventListeners();

const popupVerify = new PopupVerify('.popup_verify-delete', handleDeleteCard);
popupVerify.setEventListeners();

const validatorPopupEdit = new FormValidator(validationConfig, popupEdit);
validatorPopupEdit.setEventListeners();
const validatorPopupAdd = new FormValidator(validationConfig, popupAdd);
validatorPopupAdd.setEventListeners();
const validatorPopupEditAvatar = new FormValidator(validationConfig, popupEditAvatar);
validatorPopupEditAvatar.setEventListeners();

const { name, about } = userInfo.getUserInfo();

function openPropfilePopup() {
    validatorPopupEdit.clearInputError();
    const { userName, userAbout } = userInfo.getUserInfo();
    nameInput.value = userName;
    jobInput.value = userAbout;
    popupEditProfile.open();
}

function handleSubmitFormEdit(info) {
    api.editProfileInfo(info).then(({ name, about }) => {
        userInfo.setUserInfo(name, about);
    }).finally(() => {
        popupEditProfile.close();
        popupEditProfile.toggleLoader(false);
    })
        .catch((err) => {
            console.log(err);
        });
}

function handleSubmitFormEditAvatar(avatar) {
    api
        .editProfileAvatar(avatar)
        .then(({ avatar }) => {
            userInfo.setAvatar(avatar);
        })
        .finally(() => {
            popupEditUserAvatar.close();
            popupEditUserAvatar.toggleLoader(false);
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleSubmitFormAdd(card) {
    api.addCard(card).then((data) => {
        const newCard = getCard(data);
        cardsSection.addItem(newCard);
    })
        .finally(() => {
            validatorPopupAdd.disableButton();
            popupAddCard.close();
            popupAddCard.toggleLoader(false);
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleImageClick(caption, link) {
    enlargedImagePopup.open(caption, link);
}

function putLike(cardID, likes, likeAmount, showLikeAmount) {
    api
        .addLike(cardID, likes)
        .then((data) => {
            likeAmount.textContent = data.likes.length;
            showLikeAmount();
        })
        .catch((err) => console.log(err));
}

function deleteLike(cardID, likes, likeAmount, showLikeAmount) {
    api
        .deleteLike(cardID, likes)
        .then((data) => {
            likeAmount.textContent = data.likes.length;
            showLikeAmount();
        })
        .catch((err) => console.log(err));
}

function createCard(card) {
    const newCard = getCard(card);
    cardsSection.addItem(newCard);
}

function getCard(card) {
    const createCards = new Card(cardTemplate, card, userID.id, handleImageClick, popupVerify.getCardID.bind(popupVerify), popupVerify.getClean.bind(popupVerify), putLike, deleteLike);
    return createCards.createCard(card);
}

function handleDeleteCard(cardID, removeCard) {
    api
        .deleteCard(cardID)
        .then(() => {
            removeCard();
            popupVerify.close();
        })
        .catch((err) => {
            console.log(err);
        });
}

buttonEditProfile.addEventListener('click', () => { openPropfilePopup(); });
buttonAddProfile.addEventListener('click', () => { popupAddCard.open(); validatorPopupAdd.clearInputError(); validatorPopupAdd.disableButton(); });
buttonEditAvatar.addEventListener('click', () => { validatorPopupEditAvatar.clearInputError(); popupEditUserAvatar.open(); validatorPopupEditAvatar.disableButton(); });