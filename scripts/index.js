const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

const openProfile = () => {
  defaultForm(profilePopup, config);
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
  defaultForm(cardsPopup, config);
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

  const renderCard = (name, link) => {
    const template = document.querySelector('#template').content;
    const cardTemplate = template.querySelector('.cards__info').cloneNode(true);
    const cardsDescription = cardTemplate.querySelector('.cards__description');
    const cardsImage = cardTemplate.querySelector('.cards__image');
    const cardsDelete = cardTemplate.querySelector('.cards__delete');
    const cardsLike = cardTemplate.querySelector('.cards__like');

    cardsDescription.textContent = name;
    cardsImage.src = link;
    cardsImage.alt = name;

    const zoomImage = () => {
      popupImageDescription.textContent = name;
      imageZoom.src = link;
      cardsImage.alt = name;
      openPopup(popupImage);
    }
    cardsImage.addEventListener('click', zoomImage);

    cardsDelete.addEventListener('click', function  (evt) {
      evt.target.closest('.cards__info').remove();
    });

    cardsLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_active');
    });
    return cardTemplate;
  }

  const newCard = (e) => {
    e.preventDefault();
    cardsList.prepend(renderCard(
      nameCardsInput.value, descriptionCardsInput.value));
    closePopup(cardsPopup);
  }
  formElementMesto.addEventListener('submit', newCard);

  const createCards = () => {
    initialCards.forEach(function (element){
      cardsList.append(renderCard(element.name, element.link));
    });
  }
  createCards();

  function defaultForm(everyPopup, config) {
    const inputList = Array.from(everyPopup.querySelectorAll(config.inputSelector));
    const formElement = everyPopup.querySelector(config.formSelector);
    const buttonElement = everyPopup.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
       inputElement.value = '';
       hideError(formElement, inputElement, config);
       toggleButtonState(inputList, buttonElement, formElement, config);
    });
    buttonElement.disabled = true;
  };