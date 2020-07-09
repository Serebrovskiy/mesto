import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  setInputsValue(userName, userProfession) {
    const inputName = this._formSelector.querySelector('.popup__input-text_type_name');
    const inputProfession = this._formSelector.querySelector('.popup__input-text_type_job');
    inputName.value = userName;
    inputProfession.value = userProfession;
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
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formSelector.reset();
  }
}