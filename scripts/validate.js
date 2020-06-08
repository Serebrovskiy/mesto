function enableValidation(elem) {

  const formList = Array.from(document.querySelectorAll(elem.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(elem.inputSelector));   //'.popup__input-text'
    const buttonElement = formElement.querySelector(elem.submitButtonSelector);  //'.popup__button'

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', evt => handleInput(evt, elem.inputErrorClass, elem.errorClass));
    });

    formElement.addEventListener('input', () => handleButton(formElement, buttonElement, elem.inactiveButtonClass))

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
};


function handleButton(formElement, submitButton, inactiveButtonClass) {
  const hasErrors = !formElement.checkValidity();
  console.log(hasErrors);
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(inactiveButtonClass, hasErrors)
}

function handleInput(evt, inputErrorClass, errorClass) {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);
  const isInputValid = input.checkValidity();


  if (isInputValid) {
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
  } else {
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;

  }
};




// enableValidation();
// const formValidationOptions = {
//   formSelector: '.popup__container',
// inputSelector: '.popup__input-text',
// submitButtonSelector: '.popup__button',
// inactiveButtonClass: 'popup__button_disabled',
// inputErrorClass: 'popup__input_type_error',
// errorClass: 'popup__input-error_active'
// };

// enableValidation(formValidationOptions);