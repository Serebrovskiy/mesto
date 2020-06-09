//регулируем активность кнопки
function handleButton(formElement, submitButton, inactiveButtonClass) {
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors)
}

//выводим/убираем текст с ошибками
function handleInput(input, inputErrorClass, errorClass, reset) {
  const error = document.querySelector(`#${input.id}-error`);
  let isInputValid = input.checkValidity();

  if (isInputValid || reset) {
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
  } else {
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
  }
};

function enableValidation(elem) {
  //флаг для очистки попапа добавления карточек
  let resetFlag;
  const formList = Array.from(document.querySelectorAll(elem.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(elem.inputSelector));
    const buttonElement = formElement.querySelector(elem.submitButtonSelector);

    //сбрасываем инпуты и кнопку
    inputList.forEach((inputElement) => {
      resetFlag = true;
      handleInput(inputElement, elem.inputErrorClass, elem.errorClass, resetFlag);
      handleButton(formElement, buttonElement, elem.inactiveButtonClass);
    });

    inputList.forEach((inputElement) => {
      resetFlag = false;
      inputElement.addEventListener('input', () => handleInput(inputElement, elem.inputErrorClass, elem.errorClass, resetFlag));
    });

    formElement.addEventListener('input', () => handleButton(formElement, buttonElement, elem.inactiveButtonClass))
  });
};



