import { openPopup } from "./index.js";
import { popupImage, popupImageDescription, imageZoom } from "./constants.js";

export class Card {
    constructor(element, TemplateSelector) {
        this._name = element.name;
        this._image = element.link;
        this._template = TemplateSelector;
    }
  
    renderCard() {
        const cardTemplate = document.querySelector(this._template).content.querySelector('.cards__info').cloneNode(true);
        cardTemplate.querySelector('.cards__description').textContent = this._name;
        cardTemplate.querySelector('.cards__image').src = this._image;
        cardTemplate.querySelector('.cards__image').alt = this._name;
        this._setEventListeners(cardTemplate);
  
        return cardTemplate;
    }
  
    _zoomImage() {
        popupImageDescription.textContent = this._name;
        imageZoom.src = this._image;
        imageZoom.alt = this._name;
        openPopup(popupImage);
    }
  
    _cardsDelete = (evt) => {
        evt.target.closest('.cards__info').remove();
    }
  
    _cardsLike = (evt) => {
        evt.target.classList.toggle('cards__like_active');
    }
  
    _setEventListeners = (cardTemplate) => {
        cardTemplate.querySelector('.cards__image').addEventListener('click', () => this._zoomImage());
        cardTemplate.querySelector('.cards__delete').addEventListener('click', (evt) => this._cardsDelete(evt));
        cardTemplate.querySelector('.cards__like').addEventListener('click', (evt) => this._cardsLike(evt))
    }
  }