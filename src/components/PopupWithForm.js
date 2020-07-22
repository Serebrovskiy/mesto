import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  setInputsValue(values) {
    const inputs = this._formSelector.querySelectorAll('.popup__input-text');

    if (inputs.length > 1) {
      inputs.forEach((input, i) => {
        input.value = values[i]
      })
    }
    else {
      inputs[0].value = '';
    }
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll('.popup__input-text');
    this.inputValues = {};
    this._inputList.forEach(input => {
      this.inputValues[input.name] = input.value;
    });

    return this.inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector = this._selector.querySelector('.popup__container');
    this._formButton = this._formSelector.querySelector('.popup__button');

    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this._formButton.textContent = 'Сохранение...';
      this.close();
    });
  }

  //слушатель для попапа подтврждения удаления
  closeConfirm() {
    super.setEventListeners();
    this._formSelector = this._selector.querySelector('.popup__container');
    this._formSelector.addEventListener('click', () => {
      this._handleSubmitForm();
      this.close();
    });
  }

  //возвращаем исходный текст на кнопке
  buttonResetName(text) {
    this._formButton.textContent = text;
  }

  close() {
    super.close();
    this._formSelector.reset();
  }
}