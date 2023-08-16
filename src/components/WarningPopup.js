import { Popup } from './Popup.js'

export class WarningPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  callbackWarning(newCallbackWarning) {
    this._warning = newCallbackWarning
  }

  setEventListeners() {
    this._submitButton.addEventListener('click', (evt) => { 
      evt.preventDefault(); 
      this._warning()
    });
    super.setEventListeners();
  }
}