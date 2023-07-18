import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { everyPopup, everyPopupCloseButton, profilePopup, formProfileElement, nameInput, jobInput, popupProfileOpenButton, profileName,
         profileHobby, popupCardOpenButton, cardsPopup, formElementMesto, cardsList, nameCardsInput, descriptionCardsInput, config } from "./constants.js";
import { Card } from "./Card.js";

const formProfileElementValidator = new FormValidator(config, formProfileElement);
const formElementMestoValidator = new FormValidator(config, formElementMesto);

formProfileElementValidator.enableValidation();
formElementMestoValidator.enableValidation();

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleByEscape);
}

const openProfile = () => {
  formProfileElementValidator.clearForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileHobby.textContent;
  openPopup(profilePopup);
}
popupProfileOpenButton.addEventListener('click', openProfile);

const submitProfileForm = (evt) => {
  evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileHobby.textContent = jobInput.value;
    closePopup(profilePopup);
}
formProfileElement.addEventListener('submit', submitProfileForm);

popupCardOpenButton.addEventListener('click', () => {
  formElementMestoValidator.clearForm();
  openPopup(cardsPopup);
});

const handleByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openPopups = document.querySelector('.popup_opened');
    closePopup(openPopups);
  }
}

everyPopup.forEach((popupForm) => {
  popupForm.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupForm);
    }
  });
});

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleByEscape);
}

everyPopupCloseButton.forEach((icon) => {
  const popupIcon = icon.closest('.popup');
  icon.addEventListener('click', () => closePopup(popupIcon));
});

const newCard = () => {
cardsList.prepend(new Card({
  name: nameCardsInput.value, 
  link: descriptionCardsInput.value}, '#template').renderCard());
closePopup(cardsPopup);

initialCards.forEach(function (element){
  cardsList.append(new Card(element, '#template').renderCard());
});
}
formElementMesto.addEventListener('submit', newCard);