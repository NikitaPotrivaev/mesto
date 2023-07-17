export const everyPopup = document.querySelectorAll('.popup'); //Все попапы
export const everyPopupCloseButton = document.querySelectorAll('.popup__close'); //Иконка закрытия всех попапов
export const profilePopup = document.querySelector('#profile-popup'); //Попап профиля
export const formProfileElement = profilePopup.querySelector('.popup__form'); //Форма
export const nameInput = profilePopup.querySelector('.popup__edit_input_name'); //Инпут имени
export const jobInput = profilePopup.querySelector('.popup__edit_input_description'); // Инпут деятельности

export const popupProfileOpenButton = document.querySelector('.profile__info-edit'); //Кнопка редактировать профиль
export const profileName = document.querySelector('.profile__info-name'); //Имя профиля
export const profileHobby = document.querySelector('.profile__info-hobby'); //Деятельность профиля
export const popupCardOpenButton = document.querySelector('.profile__add-mesto'); //Кнопка добавления места

export const cardsPopup = document.querySelector('#cards-popup'); //Попап карточек
export const formElementMesto = cardsPopup.querySelector('.popup__form'); //Форма попапа карточек
export const cardsList = document.querySelector('.cards__list'); //Секция карточек

export const nameCardsInput = cardsPopup.querySelector('.popup__edit_input_name'); //Инпут названия карточки
export const descriptionCardsInput = cardsPopup.querySelector('.popup__edit_input_description'); //Инпут ссылки изображения карточки

export const popupImage = document.querySelector('#image-popup'); //Попап картинки
export const popupImageDescription = popupImage.querySelector('.popup__description'); //Попап описания
export const imageZoom = popupImage.querySelector('.popup__image'); //Увеличение картинки при клике

export const config = {  
    formSelector: '.popup__form',
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__edit_input_error',
    errorClass: 'popup__error_active',
  };