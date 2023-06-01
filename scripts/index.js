let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__edit_input_name');
let jobInput = document.querySelector('.popup__edit_input_description');
let popupClose = document.querySelector('.popup__close');

let popupOpen = document.querySelector('.profile__info-edit');
let profileName = document.querySelector('.profile__info-name');
let profileHobby = document.querySelector('.profile__info-hobby');

function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileHobby.textContent;
    popup.classList.add('popup_opened');
}
popupOpen.addEventListener('click', openPopup);

function popupClosed() {
    popup.classList.remove('popup_opened');
}
popupClose.addEventListener('click', popupClosed);

function handleFormSubmit (evt) {
    evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileHobby.textContent = jobInput.value;
        popupClosed();
}
formElement.addEventListener('submit', handleFormSubmit);