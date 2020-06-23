import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './utils.js';
import { formConfig } from './utils.js';


const cards = document.querySelector('.cards');

const formValidationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//сбрасываем ошибки
function resetErrors(formValidator) {
  const inputList = [...document.querySelectorAll(formValidationOptions.inputSelector)];
  console.log(inputList);
  inputList.forEach(inputElement => {
    formValidator.errorReset(inputElement, formValidationOptions.inputErrorClass, formValidationOptions.errorClass);
  });
}

//открываем/закрываем попап и включаем валидацию
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');

  const formValidator = new FormValidator(formValidationOptions, popup);
  formValidator.enableValidation();
  resetErrors(formValidator);
}

function popupCloseListener() {
  document.addEventListener('keydown', popupClose);
  document.addEventListener('mousedown', popupClose);
}

// попап изменения профиля
function openPopupProfile() {
  formConfig.nameInput.value = formConfig.profileName.textContent;
  formConfig.jobInput.value = formConfig.profileJob.textContent;

  popupCloseListener();

  togglePopup(formConfig.popupProfile);
}

//сохраняем изменения в профаиле
function changeElements(evt) {
  evt.preventDefault();
  formConfig.profileName.textContent = formConfig.nameInput.value;
  formConfig.profileJob.textContent = formConfig.jobInput.value;
  togglePopup(formConfig.popupProfile);
}

// попап добавления карточек
function openPopupCard() {
  formConfig.imageInput.value = '';
  formConfig.placeInput.value = '';

  popupCloseListener();

  togglePopup(formConfig.popupCard);
}

//добавляем карточку в разметку
function pasteCard(elem) {
  cards.prepend(elem);
}

//добавляем карточкy
function addCard(newCard) {
  const card = new Card(newCard, '#card');
  const cardElement = card.getCard();
  pasteCard(cardElement);
}

//добавляем исходные карточки создавая экземпляры класса Card
function primaryLoadingCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, '#card');
    const cardElement = card.getCard();
    cards.append(cardElement);
  });
}

//сохраняем изменения в карточке
function changeElementsCard(evt) {
  evt.preventDefault();
  const input = { name: formConfig.placeInput.value, link: formConfig.imageInput.value };
  addCard(input);
  togglePopup(formConfig.popupCard);
}

//закрываем попап через клик на оверлей или Escape
function popupClose(evt) {
  formConfig.popupList.forEach((formElement) => {
    const elementGrid = formElement.querySelector('.popup__grid');

    //если нажимаем Escape при условии что форма открыта
    if (evt.key === 'Escape' && formElement.classList.contains('popup_opened')) {
      togglePopup(formElement);
    }
    //если кликаем вне формы
    if (evt.target === formElement || evt.target === elementGrid) {
      togglePopup(formElement);
    }
  });
  //удаляем слушатели
  evt.target.removeEventListener('keydown', popupClose);
  evt.target.removeEventListener('mousedown ', popupClose);
}

formConfig.buttonOpenProfile.addEventListener('click', openPopupProfile);
formConfig.changeProfile.addEventListener('submit', changeElements);
formConfig.buttonClose.addEventListener('click', () => togglePopup(formConfig.popupProfile));
formConfig.buttonOpenCard.addEventListener('click', openPopupCard);
formConfig.changeCard.addEventListener('submit', changeElementsCard);
formConfig.buttonCloseCard.addEventListener('click', () => togglePopup(formConfig.popupCard));
formConfig.buttonCloseImage.addEventListener('click', () => togglePopup(formConfig.popupViewImage));

primaryLoadingCards();
