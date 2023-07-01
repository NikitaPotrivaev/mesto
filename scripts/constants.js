const everyPopup = document.querySelectorAll('.popup'); //Все попапы
const everyPopupCloseButton = document.querySelectorAll('.popup__close'); //Иконка закрытия всех попапов
const profilePopup = document.querySelector('#profile-popup'); //Попап профиля
const formProfileElement = profilePopup.querySelector('.popup__form'); //Форма
const nameInput = profilePopup.querySelector('.popup__edit_input_name'); //Инпут имени
const jobInput = profilePopup.querySelector('.popup__edit_input_description'); // Инпут деятельности

const popupProfileOpenButton = document.querySelector('.profile__info-edit'); //Кнопка редактировать профиль
const profileName = document.querySelector('.profile__info-name'); //Имя профиля
const profileHobby = document.querySelector('.profile__info-hobby'); //Деятельность профиля
const popupCardOpenButton = document.querySelector('.profile__add-mesto'); //Кнопка добавления места

const cardsPopup = document.querySelector('#cards-popup'); //Попап карточек
const formElementMesto = cardsPopup.querySelector('.popup__form'); //Форма попапа карточек
const cardsList = document.querySelector('.cards__list'); //Секция карточек

const nameCardsInput = cardsPopup.querySelector('.popup__edit_input_name'); //Инпут названия карточки
const descriptionCardsInput = cardsPopup.querySelector('.popup__edit_input_description'); //Инпут ссылки изображения карточки

const popupImage = document.querySelector('#image-popup'); //Попап картинки
const popupImageDescription = popupImage.querySelector('.popup__description'); //Попап описания
const imageZoom = popupImage.querySelector('.popup__image'); //Увеличение картинки при клике