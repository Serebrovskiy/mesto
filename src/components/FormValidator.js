export default class FormValidator {
  constructor(element, formSelector) {
    this._element = element;
    this._formSelector = formSelector;
  }

  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    this._buttonElement = this._formElement.querySelector(this._element.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._element.inputSelector));

    //сбрасываем кнопку
    this._handleButton(this._element.inactiveButtonClass);
    this._setEventListeners();
    this._formElement.addEventListener('input', () => this._handleButton(this._element.inactiveButtonClass))
  };

  //собираем инпуты
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._handleInput(inputElement, this._element.inputErrorClass, this._element.errorClass));
    });
  }

  //проверяем инпуты
  _handleInput(input, inputErrorClass, errorClass) {
    const isInputValid = input.checkValidity();
    if (isInputValid) {
      this.errorReset(input, inputErrorClass, errorClass);
    } else {
      this._errorShow(input, inputErrorClass, errorClass);
    }
  };

  //регулируем активность кнопки
  _handleButton(inactiveButtonClass) {
    const hasErrors = !this._formElement.checkValidity();
    this._buttonElement.disabled = hasErrors;
    this._buttonElement.classList.toggle(inactiveButtonClass, hasErrors);
  }

  //функция показа ошибок
  _errorShow(input, inputErrorClass, errorClass) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
  }

  //функция сброса ошибок
  errorReset(input, inputErrorClass, errorClass) {
    const error = this._formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    if (error) {
      error.classList.remove(errorClass);
      error.textContent = '';
    }
  }

  //сбрасываем кнопку
  buttonDisable() {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._element.inactiveButtonClass);
  }

  //первичный сброс ошибок
  primaryErrorsReset() {
    this._inputList.forEach((inputElement) => {
      this.errorReset(inputElement, this._element.inputErrorClass, this._element.errorClass);
    });
  }
}