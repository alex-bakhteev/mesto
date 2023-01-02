export default class Card {
    constructor(cardTemplate, { name, link, likes, owner, _id }, userID, handleImageClick, handleOpenVerify, handleCleanVerify, putLike, deleteLike) {
        this._cardTemplate = cardTemplate;
        this._nameCard = name;
        this._linkCard = link;
        this._likes = likes;
        this._ownerID = owner._id;
        this._cardID = _id;
        this._userID = userID;
        this._handleImageClick = handleImageClick;
        this._handleOpenVerify = handleOpenVerify;
        this._handleCleanVerify = handleCleanVerify;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
    }

    createCard() {
        this._card = this._cardTemplate.cloneNode(true);
        this._cardText = this._card.querySelector('.elements__text');
        this._cardImage = this._card.querySelector('.elements__element');
        this._buttonDelete = this._card.querySelector('.elements__trash');
        this._buttonLike = this._card.querySelector('.elements__like');
        this._cardText.textContent = this._nameCard;
        this._cardImage.src = this._linkCard;
        this._cardImage.alt = this._nameCard;

        if (this._ownerID !== this._userID) {
            this._buttonDelete.remove();
        }

        if (this._likes.some((user) => user._id === this._userID)) {
            this._like();
        }

        this._likeAmount = this._card.querySelector('.elements__counter-likes');
        this._likeAmount.textContent = this._likes.length;

        this._setEventListeners();
        return this._card;
    }

    _delete() {
        this._card.remove();
    }

    _like() {
        this._buttonLike.classList.toggle('elements__like_active');
    }

    _setListenerButtonLike() {
        this._buttonLike.addEventListener('click', () => {
            if (!this._buttonLike.classList.contains('elements__like_active')) {
                this._putLike(
                    this._cardID,
                    this._likes,
                    this._likeAmount,
                    this._like.bind(this)
                );
            } else {
                this._deleteLike(
                    this._cardID,
                    this._likes,
                    this._likeAmount,
                    this._like.bind(this)
                );
            }
        });
    }

    _setListenerButtonDelete() {
        this._buttonDelete.addEventListener('click', () => { this._handleOpenVerify(this._cardID); this._handleCleanVerify(this._delete.bind(this)); });
    }

    _setListenerClickImage() {
        this._cardImage.addEventListener('click', () => {
            this._handleImageClick(this._nameCard, this._linkCard);
        });
    }

    _setEventListeners() {
        this._setListenerButtonLike();
        this._setListenerButtonDelete();
        this._setListenerClickImage();
    }
};