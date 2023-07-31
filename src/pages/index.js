import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../components/initialCards.js";
import { Section } from "../components/Section.js";
import { profilePopup, formProfileElement, nameInput, jobInput, popupProfileOpenButton, profileName,
         profileHobby, popupCardOpenButton, cardsPopup, formElementMesto, cardsList, nameCardsInput, descriptionCardsInput, config, popupImage } from "../components/constants.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";

const formProfileElementValidator = new FormValidator(config, formProfileElement);
const formElementMestoValidator = new FormValidator(config, formElementMesto);

formProfileElementValidator.enableValidation();
formElementMestoValidator.enableValidation();

const userInfo = new UserInfo({ 
  nameInfo: profileName,
  descriptionInfo: profileHobby
});

const popupEditProfile = new PopupWithForm(profilePopup,
(data) => {
    userInfo.setUserInfo(data);
    popupEditProfile.close();
  });
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

const zoomImage = new PopupWithImage(popupImage);
zoomImage.setEventListeners();

const handleCardClick = (name, link) => {
  zoomImage.open(name, link);
}

const createCard = (cardData) => {
  const card = new Card(cardData, '#template', handleCardClick).renderCard();
  return card;
}

const createInitialCards = new Section({
  data: initialCards,
  renderer: (cardData) => {
    createInitialCards.setItem(createCard(cardData));
  }
}, cardsList);
createInitialCards.renderItems();

const addCard = new PopupWithForm(cardsPopup, 
  () => {
    createInitialCards.addItem(createCard({
      name: nameCardsInput.value,
      link: descriptionCardsInput.value
    }));
    addCard.close();
  }
)
addCard.setEventListeners();