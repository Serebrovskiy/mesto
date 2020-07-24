export const formConfig = {
  popupList: Array.from(document.querySelectorAll('.popup')),
  popupProfile: document.querySelector('.popup'),
  changeProfile: document.querySelector('.popup__container'),
  buttonOpenProfile: document.querySelector('.profile__edit'),
  buttonClose: document.querySelector('.popup__close-icon'),
  nameInput: document.querySelector('.popup__input-text_type_name'),
  jobInput: document.querySelector('.popup__input-text_type_job'),
  popupCard: document.querySelector('.popup_add_card'),
  changeCard: document.querySelector('.popup__container_add_card'),
  buttonOpenCard: document.querySelector('.profile__button'),
  placeInput: document.querySelector('.popup__input-text_type_place'),
  imageInput: document.querySelector('.popup__input-text_type_image'),
  buttonCloseCard: document.querySelector('.popup__close-icon_add_card'),
  popupViewImage: document.querySelector('.popup_view-image'),
  buttonCloseImage: document.querySelector('.popup__close-icon_image'),
  captionImage: document.querySelector('.popup__caption'),
  popupImage: document.querySelector('.popup__image'),
  profileName: document.querySelector('.profile__name'),
  profileProfession: document.querySelector('.profile__profession'),
  popupAvatar: document.querySelector('.popup_avatar'),
  buttonOpenAvatar: document.querySelector('.profile__avatar-container'),
  profileAvatar: document.querySelector('.profile__avatar'),
  popupConfirm: document.querySelector('.popup_confirm')
};

export const formValidationOptions = {
  formProfileSelector: '.popup__container',
  formCardSelector: '.popup__container_add_card',
  formAvatarSelector: '.popup__container_avatar',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const cards = document.querySelector('.cards');