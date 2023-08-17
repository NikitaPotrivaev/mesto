export class Card {
    constructor(element, templateSelector, handleCardClick, handleDeleteCardClick, handleLikeCard) {
        this._name = element.name;
        this._link = element.link;
        this._likes = element.likes;
        this._cardId = element.cardId;
        this._userId = element.userId;
        this._ownerId = element.ownerId;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeCard = handleLikeCard;
        this._handleDeleteCardClick = handleDeleteCardClick;
    }

    renderCard() {
        this._cardsTemplate = document.querySelector(this._template).content.querySelector('.cards__info').cloneNode(true);
        this._likeCounterZone = this._cardsTemplate.querySelector('.cards__like-counter');
        this._cardsDescription = this._cardsTemplate.querySelector('.cards__description');
        this._cardsImage = this._cardsTemplate.querySelector('.cards__image');
        this._cardsDelete = this._cardsTemplate.querySelector('.cards__delete');
        this._cardsLike = this._cardsTemplate.querySelector('.cards__like');

        this._cardsDescription.textContent = this._name;
        this._cardsImage.src = this._link;
        this._cardsImage.alt = this._name;
        this.renderLikes(this._likes);
        this._setEventListeners();

        if (this._ownerId !== this._userId) {
            this._cardsDelete.remove();
        }
      
        return this._cardsTemplate;
    }

    deleteCard() {
        this._cardsTemplate.remove()
        this._cardsTemplate = null
    }

    isLike() {
        return this._likes.find(user => user._id === this._userId)
     }

    renderLikes(cardLikes) {
        this._likes = cardLikes
        this._likeCounterZone.textContent = this._likes.length;

        if (this._likes.length === 0) {
            this._likeCounterZone.textContent = '';
        }

        if (this.isLike) {
            this._cardsLike.classList.toggle('card__like_active');
        } else {
            this._cardsLike.classList.remove('card__like_active');
        }
    }
      
    _setEventListeners() {
        this._cardsImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
        this._cardsDelete.addEventListener('click', () => this._handleDeleteCardClick(this._cardId));
        this._cardsLike.addEventListener('click', () => this._handleLikeCard(this._cardId));
    }
}