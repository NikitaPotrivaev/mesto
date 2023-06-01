let profileEdit = document.querySelector('.profile__info-edit');
let formElement = document.querySelector('.popup');
let popupClose = formElement.querySelector('.popup__close');

function popupOpened() {
    formElement.classList.add('popup_opened');
}
profileEdit.addEventListener('click', popupOpened);

function popupClosed() {
    formElement.classList.remove('popup_opened');
}
popupClose.addEventListener('click', popupClosed);


let profileName = document.querySelector('.profile__info-name');
let profileHobby = document.querySelector('.profile__info-hobby');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__description');

function handleFormSubmit (evt) {
    evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileHobby.textContent = jobInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);

let popupSaveClose = formElement.querySelector('.popup__submit');
popupSaveClose.addEventListener('click', popupClosed);