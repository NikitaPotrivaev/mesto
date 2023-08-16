import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitForm })  {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__edit'));
        this._submitButton = this._popup.querySelector('.popup__submit');
        this._text = this._submitButton.textContent;
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

    showLoading(loading) {
        if (loading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            this._submitButton.textContent = this._text;
        }
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}