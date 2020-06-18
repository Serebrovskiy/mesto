//функция сброса ошибок
function errorReset(input, inputErrorClass, errorClass){
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
  error.textContent = '';
};

//регулируем активность кнопки
function handleButton(formElement, submitButton, inactiveButtonClass) {
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors);
}

//выводим/убираем текст с ошибками
function handleInput(input, inputErrorClass, errorClass) {
  const error = document.querySelector(`#${input.id}-error`);
  const isInputValid = input.checkValidity();

  if (isInputValid) {
    errorReset(input, inputErrorClass, errorClass);
  } else {
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
  }
};

function enableValidation(elem) {
  const formList = Array.from(document.querySelectorAll(elem.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(elem.inputSelector));
    const buttonElement = formElement.querySelector(elem.submitButtonSelector);

    //сбрасываем инпуты и кнопку
    inputList.forEach((inputElement) => {
      errorReset(inputElement, elem.inputErrorClass, elem.errorClass);
      handleButton(formElement, buttonElement, elem.inactiveButtonClass);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => handleInput(inputElement, elem.inputErrorClass, elem.errorClass));
    });

    formElement.addEventListener('input', () => handleButton(formElement, buttonElement, elem.inactiveButtonClass))
  });
};



