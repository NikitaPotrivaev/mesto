import { openPopup } from "./index.js";
import { popupImage, popupImageDescription, imageZoom } from "./constants.js";

export class Card {
    constructor(element, templateSelector) {
        this._name = element.name;
        this._link = element.link;
        this._template = templateSelector;
    }

    renderCard() {
        this._cardsTemplate = document.querySelector(this._template).content.querySelector('.cards__info').cloneNode(true);
        this._cardsDescription = this._cardsTemplate.querySelector('.cards__description');
        this._cardsImage = this._cardsTemplate.querySelector('.cards__image');
        this._cardsDelete = this._cardsTemplate.querySelector('.cards__delete');
        this._cardsLike = this._cardsTemplate.querySelector('.cards__like');

        this._cardsDescription.textContent = this._name;
        this._cardsImage.src = this._link;
        this._cardsImage.alt = this._name;
        this._setEventListeners();
      
        return this._cardsTemplate;
    }
      
    _zoomImage() {
        popupImageDescription.textContent = this._name;
        imageZoom.src = this._link;
        imageZoom.alt = this._name;
        openPopup(popupImage);
    }
      
    _deleteCards() {
        this._cardsTemplate.remove();
    }
      
    _likeCards(evt) {
        evt.target.classList.toggle('cards__like_active');
    }
      
    _setEventListeners() {
        this._cardsImage.addEventListener('click', () => this._zoomImage());
        this._cardsDelete.addEventListener('click', () => this._deleteCards());
        this._cardsLike.addEventListener('click', (evt) => this._likeCards(evt));
    }
}