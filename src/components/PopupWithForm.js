import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm)  {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = popupSelector.querySelector('.popup__form');
        this._inputList = Array.from(popupSelector.querySelectorAll('.popup__edit'));
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(item => {
            inputValues[item.name] = item.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}