import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupList = Array.from(document.querySelectorAll('.popup'));
// для изменения профиля
const popupProfile = document.querySelector('.popup')
const changeProfile = document.querySelector('.popup__container');
const buttonOpenProfile = document.querySelector('.profile__edit');
const buttonClose = document.querySelector('.popup__close-icon');
const nameInput = changeProfile.querySelector('.popup__input-text_type_name');
const jobInput = changeProfile.querySelector('.popup__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

// для попапа добавления карточек
const popupCard = document.querySelector('.popup_add_card');
const changeCard = document.querySelector('.popup__container_add_card');
const buttonOpenCard = document.querySelector('.profile__button');
const placeInput = document.querySelector('.popup__input-text_type_place');
const imageInput = document.querySelector('.popup__input-text_type_image');
const buttonCloseCard = document.querySelector('.popup__close-icon_add_card');
const cards = document.querySelector('.cards');

// для попапа просмотра картинок
const popupViewImage = document.querySelector('.popup_view-image');
const buttonCloseImage = document.querySelector('.popup__close-icon_image');
const captionImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

//исходный масив
const initialCards = [
  {
    name: 'Смоленск',
    link: 'images/Smolensk.jpg'
  },
  {
    name: 'Череповец',
    link: 'images/Cherepovets.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/Baikal.jpg'
  },
  {
    name: 'Карелия',
    link: 'images/Karelia2.jpg'
  },
  {
    name: 'Алтай',
    link: 'images/Altai.jpg'
  },
  {
    name: 'Петербург',
    link: 'images/Piter.jpg'
  }
];

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
  const inputList = Array.from(document.querySelectorAll(formValidationOptions.inputSelector));
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

// попап изменения профиля
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
}

//сохраняем изменения в профаиле
function changeElements(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupProfile);
}

// попап добавления карточек
function openPopupCard() {
  imageInput.value = '';
  placeInput.value = '';
  togglePopup(popupCard);
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
  const input = { name: placeInput.value, link: imageInput.value };
  addCard(input);
  togglePopup(popupCard);
}

//закрываем попап через клик на оверлей или Escape
function popupClose(evt) {
  popupList.forEach((formElement) => {
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

function cardImage(evt) {
  captionImage.textContent = evt.target.closest('.card').textContent;
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  togglePopup(popupViewImage);
}

buttonOpenProfile.addEventListener('click', openPopupProfile);
changeProfile.addEventListener('submit', changeElements);
buttonClose.addEventListener('click', () => togglePopup(popupProfile));
buttonOpenCard.addEventListener('click', openPopupCard);
changeCard.addEventListener('submit', changeElementsCard);
buttonCloseCard.addEventListener('click', () => togglePopup(popupCard));
buttonCloseImage.addEventListener('click', () => togglePopup(popupViewImage));
document.addEventListener('keydown', popupClose);
document.addEventListener('mousedown', popupClose);

primaryLoadingCards();
