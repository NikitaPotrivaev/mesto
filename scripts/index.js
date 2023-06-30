const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const everyPopup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('#profile-popup'); //Попап профиля
const formProfileElement = profilePopup.querySelector('.popup__form'); //Форма
const nameInput = profilePopup.querySelector('.popup__edit_input_name'); //Инпут имени
const jobInput = profilePopup.querySelector('.popup__edit_input_description'); // Инпут деятельности
const popupProfileCloseButton = profilePopup.querySelector('.popup__close'); //Закрытие попапа профиля

const popupProfileOpenButton = document.querySelector('.profile__info-edit'); //Кнопка редактировать профиль
const profileName = document.querySelector('.profile__info-name'); //Имя профиля
const profileHobby = document.querySelector('.profile__info-hobby'); //Деятельность профиля
const popupCardOpenButton = document.querySelector('.profile__add-mesto'); //Кнопка добавления места

const cardsPopup = document.querySelector('#cards-popup'); //Попап карточек
const formElementMesto = cardsPopup.querySelector('.popup__form'); //Форма попапа карточек
const cardsButtonSubmit = cardsPopup.querySelector('.popup__submit'); //Сабмит карточек
const popupCardsCloseButton = cardsPopup.querySelector('.popup__close'); //Закрытие попапа карточек
const cardsList = document.querySelector('.cards__list'); //Секция карточек

const nameCardsInput = cardsPopup.querySelector('.popup__edit_input_name'); //Инпут названия карточки
const descriptionCardsInput = cardsPopup.querySelector('.popup__edit_input_description'); //Инпут ссылки изображения карточки

const popupImage = document.querySelector('#image-popup'); //Попап картинки
const popupImageDescription = popupImage.querySelector('.popup__description'); //Попап описания
const imageZoom = popupImage.querySelector('.popup__image'); //Увеличение картинки при клике
const popupImageClose = popupImage.querySelector('.popup__close'); //Закрытие попапа

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

popupCardsCloseButton.addEventListener('click', () => closePopup(cardsPopup));

popupImageClose.addEventListener('click', () => closePopup(popupImage));

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
popupProfileCloseButton.addEventListener('click', () => closePopup(profilePopup));

  const renderCard = (name, link) => {
    const template = document.querySelector('#template').content;
    const cardTemplate = template.querySelector('.cards__info').cloneNode(true);
    const cardsDescription = cardTemplate.querySelector('.cards__description');
    const cardsImage = cardTemplate.querySelector('.cards__image');
    const cardsDelete = cardTemplate.querySelector('.cards__delete');
    const cardsLike = cardTemplate.querySelector('.cards__like');

    cardsDescription.textContent = name;
    cardsImage.src = link;

    const zoomImage = () => {
      popupImageDescription.textContent = name;
      imageZoom.src = link;
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
    e.target.reset();
    closePopup(cardsPopup);
  }
  formElementMesto.addEventListener('submit', newCard);

  const createCards = () => {
    initialCards.forEach(function (element){
      cardsList.append(renderCard(element.name, element.link));
    });
  }
  createCards();