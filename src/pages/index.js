import { FormValidator } from "../components/FormValidator.js";
import { initialCards, config } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { formProfileElement, nameInput, jobInput, popupProfileOpenButton, popupCardOpenButton, formElementMesto} from "../components/elements.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import "../pages/index.css";

const formProfileElementValidator = new FormValidator(config, formProfileElement);
const formElementMestoValidator = new FormValidator(config, formElementMesto);

formProfileElementValidator.enableValidation();
formElementMestoValidator.enableValidation();

const userInfo = new UserInfo({ 
  nameInfo: '.profile__info-name',
  descriptionInfo: '.profile__info-hobby'
});

const popupEditProfile = new PopupWithForm('#profile-popup', {
  submitForm: (data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  }});
popupEditProfile.setEventListeners()

popupProfileOpenButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  formProfileElementValidator.clearForm();
  nameInput.value = user.name;
  jobInput.value = user.description;
  popupEditProfile.open();
});

popupCardOpenButton.addEventListener('click', () => {
  formElementMestoValidator.clearForm();
  addCard.open();
})

const zoomImage = new PopupWithImage('#image-popup');
zoomImage.setEventListeners();

const handleCardClick = (name, link) => {
  zoomImage.open(name, link);
}

const createCard = (cardData) => {
  const card = new Card(cardData, '#template', handleCardClick).renderCard();
  return card;
}

const createInitialCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    createInitialCards.setItem(createCard(cardData));
  }
}, '.cards__list');
createInitialCards.renderItems();

const addCard = new PopupWithForm('#cards-popup', {
  submitForm: (cardData) => {
    createInitialCards.addItem(createCard({
      name: cardData.cards,
      link: cardData.link
    }));
    addCard.close();
  }
});
addCard.setEventListeners();