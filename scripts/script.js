let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_occupation');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
/*
let like = document.querySelectorAll('.elements__like');
let likeButton = document.querySelector('.elements__like');
*/

function openPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeIcon.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

/*
like.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("elements__like_active");
    });
});
*/