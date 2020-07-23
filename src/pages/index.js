import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { initialCards } from '../utils/utils.js';
import { formConfig } from '../utils/utils.js';

const cards = document.querySelector('.cards');

const formValidationOptions = {
  formProfileSelector: '.popup__container',
  formCardSelector: '.popup__container_add_card',
  formAvatarSelector: '.popup__container_avatar',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//создаем объект информации о пользователе
const userInfo = new UserInfo(formConfig.profileName, formConfig.profileProfession, formConfig.profileAvatar);  //, formConfig.profileAvatar

//создаем объект открытия попапа карточки
const popupImage = new PopupWithImage(formConfig.popupViewImage);

//валидируем формы
const formValidatorProfile = new FormValidator(formValidationOptions, formValidationOptions.formProfileSelector);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formValidationOptions, formValidationOptions.formCardSelector);
formValidatorCard.enableValidation();
const formValidatorAvatar = new FormValidator(formValidationOptions, formValidationOptions.formAvatarSelector);
formValidatorAvatar.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '14553299-9691-455d-8f0e-78b62284ce7d',
    'Content-Type': 'application/json'
  }
});

let cardList = {};

//удаляем карточку после подтверждения
const handleCardRemoveClick = (id, card) => {
  const renderFormConfirm = () => {
    if (card._element) {
      api.deleteCard(id)
        .then(() => {
          card.cardDelete();
        })
        .catch((err) => console.log(err));
    }
  }
  //создаем объект подтверждения удаления карточки
  const formConfirm = new PopupWithForm(formConfig.popupConfirm, renderFormConfirm);
  formConfirm.open();
  formConfirm.closeConfirm(card);
}


//отрисовываем все карточки на странице
const addPrimaryCards = () => {
  api.getInitialCards()
    .then(res => {
      cardList = new Section({
        items: res,
        renderer: (item) => {
          const card = new Card(item, '#card', {
            handleCardClick: () => {
              popupImage.open(item.name, item.link);
            },
            handleCardRemoveClick,
            addCardLike: (id) => {
              api.addLike(id)
                .then(res => {
                  card.addLike(res.likes);
                })
                .catch((err) => console.log(err));
            },
            deleteCardLike: (id) => {
              api.deleteLike(id)
                .then(res => {
                  card.deleteLike(res.likes);
                })
                .catch((err) => console.log(err));
            },
          });
          const getElement = card.getCard();
          cardList.addAppendItem(getElement);
        }
      }, cards);
      cardList.renderCards(res);
    })
}
addPrimaryCards();

//слушаем клик по картинке
popupImage.setEventListeners();

//отрисовываем данные пользователя name, about
userInfo.rendererUserInfo(api.getProfile());

//форма профиля
const renderFormProfile = (values) => {
  api.setProfile(values['inputProfileName'], values['inputProfileProfession']);
  userInfo.rendererUserInfo(api.getProfile());
}

//форма аватара
const renderFormAvatar = (values) => {
  api.setAvatar(values.inputAvatar).then(() => userInfo.setUserAvatar(api.getProfile()));
}

//создаем объект попапа профайла
const formProfile = new PopupWithForm(formConfig.popupProfile, renderFormProfile);
formProfile.setEventListeners();

//отрисовываем созданную карточку
const renderFormCard = (data) => {
  const { 'inputCardName': name, 'inputCardImage': link } = data;
  const input = {};
  input.name = name;
  input.link = link;
  api.createCard(input.name, input.link).then(res => {
    const card = new Card(res, '#card', {
      handleCardClick: () => {
        popupImage.open(input.name, input.link);
      },
      handleCardRemoveClick,
      addCardLike: (id) => {
        api.addLike(id)
          .then(res => {
            card.addLike(res.likes);
          })
          .catch((err) => console.log(err));
      },
      deleteCardLike: (id) => {
        api.deleteLike(id)
          .then(res => {
            card.deleteLike(res.likes);
          })
          .catch((err) => console.log(err));
      },
    });
    const newCard = card.getCard();
    cardList.addPrependItem(newCard);
  })
}
//создаем объект попапа создания карточки
const formCard = new PopupWithForm(formConfig.popupCard, renderFormCard);
formCard.setEventListeners();

//создаем объект попапа изменения аватара
const formAvatar = new PopupWithForm(formConfig.popupAvatar, renderFormAvatar);
formAvatar.setEventListeners();

//открываем попап профиля
formConfig.buttonOpenProfile.addEventListener('click', () => {
  const userProfile = userInfo.getUserInfo();
  formProfile.buttonResetName('Сохранить');
  formProfile.open();
  formValidatorProfile.primaryErrorsReset();
  formValidatorProfile.buttonDisable();
  formProfile.setInputsValue([userProfile.name, userProfile.profession]);
});

//попап создания карточки
formConfig.buttonOpenCard.addEventListener('click', () => {
  formCard.buttonResetName('Создать');
  formCard.open();
  formValidatorCard.primaryErrorsReset();
  formValidatorCard.buttonDisable();
});

//попап аватара
formConfig.buttonOpenAvatar.addEventListener('click', () => {
  formAvatar.buttonResetName('Сохранить');
  formAvatar.open();
  formValidatorAvatar.primaryErrorsReset();
  formValidatorAvatar.buttonDisable();
  formAvatar.setInputsValue('');
})
