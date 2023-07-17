import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
import { everyPopup, everyPopupCloseButton, profilePopup, formProfileElement, nameInput, jobInput, popupProfileOpenButton, profileName,
         profileHobby, popupCardOpenButton, cardsPopup, formElementMesto, cardsList, nameCardsInput, descriptionCardsInput, config } from "./constants.js";
import { Card } from "./Card.js";

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

const openProfile = () => {
  const formProfileElementValidator = new FormValidator(config, formProfileElement);
  formProfileElementValidator.defaultForm();
  nameInput.value = profileName.textContent;
  jobInput.value = profileHobby.textContent;
  formProfileElementValidator.enableValidation();
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
  const formElementMestoValidator = new FormValidator(config, formElementMesto);
  formElementMestoValidator.defaultForm();
  formElementMestoValidator.enableValidation();
  openPopup(cardsPopup);
});

const closeByEscape = (evt) => {
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
  document.removeEventListener('keydown', closeByEscape);
}

everyPopupCloseButton.forEach((icon) => {
  const popupIcon = icon.closest('.popup');
  icon.addEventListener('click', () => closePopup(popupIcon));
});

  const newCard = (e) => {
    e.preventDefault();
    cardsList.prepend(new Card({
      name: nameCardsInput.value, 
      link: descriptionCardsInput.value}, '#template').renderCard());
    closePopup(cardsPopup);
  }
  formElementMesto.addEventListener('submit', newCard);

  const createCards = () => {
    initialCards.forEach(function (element){
      cardsList.append(new Card(element, '#template').renderCard());
    });
  }
  createCards();