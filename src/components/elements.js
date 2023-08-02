const profilePopup = document.querySelector('#profile-popup');
export const formProfileElement = profilePopup.querySelector('.popup__form'); //Форма
export const nameInput = profilePopup.querySelector('.popup__edit_input_name'); //Инпут имени
export const jobInput = profilePopup.querySelector('.popup__edit_input_description'); // Инпут деятельности

export const popupProfileOpenButton = document.querySelector('.profile__info-edit'); //Кнопка редактировать профиль
export const popupCardOpenButton = document.querySelector('.profile__add-mesto'); //Кнопка добавления места

const cardsPopup = document.querySelector('#cards-popup');
export const formElementMesto = cardsPopup.querySelector('.popup__form'); //Форма попапа карточек