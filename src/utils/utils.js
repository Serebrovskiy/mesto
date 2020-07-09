import Smolensk from '../images/Smolensk.jpg';
import Cherepovets from '../images/Cherepovets.jpg';
import Baikal from '../images/Baikal.jpg';
import Karelia2 from '../images/Karelia2.jpg';
import Altai from '../images/Altai.jpg';
import Piter from '../images/Piter.jpg';

//исходный масив
export const initialCards = [
  {
    name: 'Смоленск',
    link: Smolensk
  },
  {
    name: 'Череповец',
    link: Cherepovets
  },
  {
    name: 'Байкал',
    link: Baikal
  },
  {
    name: 'Карелия',
    link: Karelia2
  },
  {
    name: 'Алтай',
    link: Altai
  },
  {
    name: 'Петербург',
    link: Piter
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
  profileName : document.querySelector('.profile__name'),
  profileProfession : document.querySelector('.profile__profession')
};

