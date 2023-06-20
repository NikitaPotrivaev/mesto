let profilePopup = document.querySelector('#profile-popup'); //Попап профиля
let formElement = profilePopup.querySelector('.popup__form'); //Форма
let nameInput = profilePopup.querySelector('.popup__edit_input_name'); //Инпут имени
let jobInput = profilePopup.querySelector('.popup__edit_input_description'); // Инпут деятельности
let closeProfilePopup = profilePopup.querySelector('.popup__close'); //Закрытие попапа профиля

let popupOpen = document.querySelector('.profile__info-edit'); //Кнопка редактировать профиль
let profileName = document.querySelector('.profile__info-name'); //Имя профиля
let profileHobby = document.querySelector('.profile__info-hobby'); //Деятельность профиля
let addMesto = document.querySelector('.profile__add-mesto'); //Кнопка добавления места

const cardsPopup = document.querySelector('#cards-popup'); //Попап карточек
const formElementMesto = cardsPopup.querySelector('.popup__form');
const closeCardsPopup = cardsPopup.querySelector('.popup__close'); //Закрытие попапа карточек
const cardsList = document.querySelector('.cards__list'); //Секция карточек

const nameCardsInput = cardsPopup.querySelector('.popup__edit_input_name'); //Инпут названия карточки
const descriptionCardsInput = cardsPopup.querySelector('.popup__edit_input_description'); //Инпут ссылки изображения карточки

const openButton = (popup) => {
  popup.classList.add('popup_opened');
}

const openProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileHobby.textContent;
  openButton(profilePopup);
}
popupOpen.addEventListener('click', openProfile);

const popupClosed = (popup) => {
  popup.classList.remove('popup_opened');
}
closeProfilePopup.addEventListener('click', () => popupClosed(profilePopup));

const handleFormSubmit = (evt) => {
    evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileHobby.textContent = jobInput.value;
        popupClosed(profilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);

const openCards = () => {
  openButton(cardsPopup);
}
addMesto.addEventListener('click', openCards);

const closeCards = () => {
  popupClosed(cardsPopup);
}
closeCardsPopup.addEventListener('click', closeCards);

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

  const renderCard = (name, link) => {
    const template = document.querySelector('#template').content;
    const cardTemplate = template.querySelector('.cards__info').cloneNode(true);
    const cardsDescription = cardTemplate.querySelector('.cards__description');
    const cardsImage = cardTemplate.querySelector('.cards__image');
    const cardsDelete = cardTemplate.querySelector('.cards__delete');
    const cardsLike = cardTemplate.querySelector('.cards__like');

    const popupImage = document.querySelector('#image-popup');
    const closeImagePopup = popupImage.querySelector('.popup__close');
    const popupImageDescription = popupImage.querySelector('.popup__description');
    const imageZoom = popupImage.querySelector('.popup__image');

    cardsDescription.textContent = name;
    cardsImage.src = link;

    const zoomImage = () => {
      popupImageDescription.textContent = name;
      imageZoom.src = link;
      openButton(popupImage);
    }
    cardsImage.addEventListener('click', zoomImage);

    const closeImage = () => {
      popupClosed(popupImage);
    }
    closeImagePopup.addEventListener('click', closeImage);

    cardsDelete.addEventListener('click', function  (evt) {
      evt.target.closest('.cards__info').remove();
    });

    cardsLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('cards__like_active');
    });
    return cardTemplate;
  }
  const newCard = (evt) => {
    evt.preventDefault();
    cardsList.prepend(renderCard(
      nameCardsInput.value, descriptionCardsInput.value,
    ));
    popupClosed(cardsPopup);
  }
  formElementMesto.addEventListener('submit', newCard);

  const createCards = () => {
    initialCards.forEach(function (element){
      cardsList.append(renderCard(element.name, element.link));
    });
  }
  createCards();