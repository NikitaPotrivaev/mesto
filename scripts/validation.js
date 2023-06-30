const config = {  
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__edit_input_error',
  errorClass: 'popup__error_active',
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add('popup__edit_input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
};

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove('popup__edit_input_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
};

const checkValidity = (formElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => Array.from(inputList).some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit_inactive');
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener ('input', function () {
      checkValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

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

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(config);