const popups = Array.from(document.querySelectorAll('.popup__container'));
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const closeIcons = Array.from(document.querySelectorAll('.popup__close-icon'));
const addButton = document.querySelector('.profile__add-button');
const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form-add');
const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_occupation');
const captionInput = document.querySelector('.popup__field_type_caption');
const linkInput = document.querySelector('.popup__field_type_link');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const elementsContainer = document.querySelector('.elements');
const elementsTemplate = document.querySelector('#card').content.querySelector('.elements__mask');
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

    elementsImage.addEventListener('click', () => {
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        popupEnlargedImage.classList.add('popup_opened');
    });
    return elementsCard;
}

function addBaseCards() {
    initialCards.forEach(item => {
        const newCard = addCard(item.name, item.link);
        renderCard(newCard);
    });
}

function renderCard(elementsCard) {
    elementsContainer.prepend(elementsCard);
}

function openPropfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEdit);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function closePopupClick(evt) {
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
    const newCard = addCard(cardName, cardLink);
    renderCard(newCard);
    formAdd.reset();
    closePopup(popupAdd);
}


addBaseCards();
editButton.addEventListener('click', openPropfilePopup);
addButton.addEventListener('click', () => { openPopup(popupAdd) });
closeIcons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        popups.forEach((push) => {
            closePopup(push);
        });
    }
});
document.addEventListener('mousedown', closePopupClick);

formEdit.addEventListener('submit', handleSubmitFormEdit);
formAdd.addEventListener('submit', handleSubmitFormAdd);