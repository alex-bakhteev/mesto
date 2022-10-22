const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup_add');
const popupContainer = document.querySelector('.popup__container');
const editButton = document.querySelector('.profile__edit-button');
const closeIcon = Array.from(document.querySelectorAll('.popup__close-icon'));
const addButton = document.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_occupation');
const captionInput = document.querySelector('.popup__field_type_caption');
const linkInput = document.querySelector('.popup__field_type_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#card').content.querySelector('.elements__mask');

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

function addCard(name, link) {
    const elementsCard = elementsTemplate.cloneNode(true);
    const elementsText = elementsCard.querySelector('.elements__text');
    const elementsImage = elementsCard.querySelector('.elements__element');
    const elementsDelete = elementsCard.querySelector('.elements__trash');
    const likeButton = elementsCard.querySelector('.elements__like');
    elementsText.textContent = name;
    elementsImage.src = link;
    elementsImage.alt = name;
    elementsDelete.addEventListener('click', () => { elementsDelete.closest('.elements__mask').remove(); });
    likeButton.addEventListener('click', () => { likeButton.classList.toggle('elements__like_active'); });
    elements.prepend(elementsCard);

    elementsImage.addEventListener('click', (event) => {
        const enlargedImage = event.target;
        const name = enlargedImage.alt;
        const link = enlargedImage.src;
        const popupEnlargedImage = document.querySelector('.popup_enlarged-image');
        const popupImage = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption');
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        popupEnlargedImage.classList.add('popup_opened');
    });
}

function addBaseCards() {
    initialCards.forEach(item => {
        addCard(item.name, item.link);
    });
}

function openPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

function openPopupAdd() {
    popupAdd.classList.add('popup_opened');
}

function closePopup(evt) {
    const popupClosed = evt.target.closest('.popup');
    popupClosed.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(evt);
}

function formAddSubmitHandler(evt) {
    evt.preventDefault();
    const cardName = captionInput.value;
    const cardLink = linkInput.value;
    const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!captionInput.value || !linkInput.value) {
        alert('Поле не заполнено!');
        return;
    }
    if (!regex.test(cardLink)) {
        alert('Введите корректный URL!');
        return;
    }
    addCard(cardName, cardLink);
    clear(evt);
    closePopup(evt);
}

function clear() {
    captionInput.value = '';
    linkInput.value = '';
}

addBaseCards();
editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openPopupAdd);
closeIcon.forEach((event) => {
    event.addEventListener('click', closePopup);
});
formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);