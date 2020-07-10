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
  formProfileSelector: '.popup__container',
  formCardSelector: '.popup__container_add_card',
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
const formValidatorProfile = new FormValidator(formValidationOptions, formValidationOptions.formProfileSelector);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formValidationOptions, formValidationOptions.formCardSelector);
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
    sectionObject.addAppendItem(getElement);
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
    sectionObject.addPrependItem(newCard);
  }
});
formCard.setEventListeners();

//открываем попап профиля
formConfig.buttonOpenProfile.addEventListener('click', () => {
  const userProfile = userInfo.getUserInfo();
  formProfile.open();
  formValidatorProfile.primaryErrorsReset();
  formValidatorProfile.buttonDisable();
  formProfile.setInputsValue(userProfile.name, userProfile.profession);
});

//попап создания карточки
formConfig.buttonOpenCard.addEventListener('click', () => {
  formCard.open();
  formValidatorCard.primaryErrorsReset();
  formValidatorCard.buttonDisable();
});
