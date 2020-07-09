export default class FormValidator {
  constructor(element, formSelector) {
    this._element = element;
    this._formSelector = formSelector;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._element.formSelector));

    formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(this._element.inputSelector));
      const buttonElement = formElement.querySelector(this._element.submitButtonSelector);
      //сбрасываем кнопку
      this._handleButton(formElement, buttonElement, this._element.inactiveButtonClass);

      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => this._handleInput(inputElement, this._element.inputErrorClass, this._element.errorClass));
      });

      formElement.addEventListener('input', () => this._handleButton(formElement, buttonElement, this._element.inactiveButtonClass))
    });
  };

  //проверяем инпуты
  _handleInput(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    const isInputValid = input.checkValidity();

    if (isInputValid) {
      this.errorReset(input, inputErrorClass, errorClass);
    } else {
      input.classList.add(inputErrorClass);
      error.classList.add(errorClass);
      error.textContent = input.validationMessage;
    }
  };

  //регулируем активность кнопки
  _handleButton(formElement, submitButton, inactiveButtonClass) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);
  }

  //функция сброса ошибок
  errorReset(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
  };


}