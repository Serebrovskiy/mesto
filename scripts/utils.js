
//исходный масив
export const initialCards = [
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

export const formConfig = {
  popupList: Array.from(document.querySelectorAll('.popup')),
  popupProfile: document.querySelector('.popup'),
  changeProfile: document.querySelector('.popup__container'),
  buttonOpenProfile: document.querySelector('.profile__edit'),
  buttonClose: document.querySelector('.popup__close-icon'),
  nameInput: document.querySelector('.popup__input-text_type_name'),
  jobInput: document.querySelector('.popup__input-text_type_job'),
  profileName: document.querySelector('.profile__name'),
  profileJob: document.querySelector('.profile__profession'),
  popupCard: document.querySelector('.popup_add_card'),
  changeCard: document.querySelector('.popup__container_add_card'),
  buttonOpenCard: document.querySelector('.profile__button'),
  placeInput: document.querySelector('.popup__input-text_type_place'),
  imageInput: document.querySelector('.popup__input-text_type_image'),
  buttonCloseCard: document.querySelector('.popup__close-icon_add_card'),
  popupViewImage: document.querySelector('.popup_view-image'),
  buttonCloseImage: document.querySelector('.popup__close-icon_image'),
  captionImage: document.querySelector('.popup__caption'),
  popupImage: document.querySelector('.popup__image')
};
