import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../utils/utils.js';
import { formConfig } from '../utils/utils.js';

const cards = document.querySelector('.cards');

const formValidationOptions = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//создаем объект информации о пользователе
const userInfo = new UserInfo(formConfig.profileName, formConfig.profileProfession);

//создаем объект открытия попапа карточки
const popupImage = new PopupWithImage(formConfig.popupViewImage);
popupImage.setEventListeners();

//валидируем формы
const formValidatorProfile = new FormValidator(formValidationOptions, formConfig.popupProfile);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formValidationOptions, formConfig.popupCard);
formValidatorCard.enableValidation();

//отрисовываем все карточки на странице
const sectionObject = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', {
      handleCardClick: () => {
        popupImage.open(item.name, item.link);
      }
    });
    const getElement = card.getCard();

    return getElement;
  }
}, cards);
sectionObject.rendererAllItems();

//форма профиля
const formProfile = new PopupWithForm(formConfig.popupProfile, {
  handleSubmitForm: (values) => {
    userInfo.setUserInfo(values['inputProfileName'], values['inputProfileProfession']);
  }
});
formProfile.setEventListeners();

//добавления карточек через форму
const formCard = new PopupWithForm(formConfig.popupCard, {
  handleSubmitForm: (values) => {
    const { 'inputCardName': name, 'inputCardImage': image } = values;
    const input = {};
    input.name = name;
    input.link = image;

    const card = new Card(input, '#card', {
      handleCardClick: () => {
        popupImage.open(input.name, input.link);
      }
    });
    const newCard = card.getCard();
    cards.prepend(newCard);
  }
});
formCard.setEventListeners();

//сбрасываем ошибки
function resetErrors(formValidator) {
  const inputList = [...document.querySelectorAll(formValidationOptions.inputSelector)];
  inputList.forEach(inputElement => {
    formValidator.errorReset(inputElement, formValidationOptions.inputErrorClass, formValidationOptions.errorClass);
  });
}

//открываем попап профиля
formConfig.buttonOpenProfile.addEventListener('click', () => {
  formProfile.open();

  const userProfile = userInfo.getUserInfo();
  formProfile.setInputsValue(userProfile.name, userProfile.profession);
  resetErrors(formValidatorProfile);
});

//попап создания карточки
formConfig.buttonOpenCard.addEventListener('click', () => {
  formCard.open();
  resetErrors(formValidatorCard);
});
