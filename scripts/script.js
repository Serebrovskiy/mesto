// для изменения профиля
const popupProfile = document.querySelector('.popup')
const change = document.querySelector('.popup__container');
const buttonOpenProfile = document.querySelector('.profile__edit');
const buttonClose = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__input-text_type_name');
const jobInput = document.querySelector('.popup__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

// для попапа добавления карточек
const popupCard = document.querySelector('.popup_add_card');
const buttonOpenCard = document.querySelector('.profile__button');
const placeInput = document.querySelector('.popup__input-text_type_place');
const imageInput = document.querySelector('.popup__input-text_type_image');
const changeCard = document.querySelector('.popup__container_add_card');
const buttonCloseCard = document.querySelector('.popup__close-icon_add_card');
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#card').content;

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

// попап изменения профиля
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup(popupProfile);
}

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

function changeElementsCard(evt) {
  evt.preventDefault();
  addCard(placeInput.value, imageInput.value);
  togglePopup(popupCard);
}

//открываем/закрываем попап
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//добавляем карточку в разметку
function pasteCard(elem) {
  cards.prepend(elem);
}

//добавление карточкy
function addCard(place, image) {
  const cardElement = cardsTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  cardElementImage.src = image;
  cardElementImage.alt = place;
  cardElement.querySelector('.card__title').textContent = place;

  //удаляем карточку
  function cardDelete(evt) {
    evt.target.closest('.card').remove();
  };

  //ставим лайк
  function cardLike(evt) {
    evt.target.classList.toggle('card__like_active');
  };

  //забираем данные о картинке
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    captionImage.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.parentElement.querySelector('.card__title').textContent;
    togglePopup(popupViewImage);
  });

  cardElement.querySelector('.card__basket').addEventListener('click', cardDelete);
  cardElement.querySelector('.card__like').addEventListener('click', cardLike);
  pasteCard(cardElement);
}

//добавляем исходные карточки
function primaryLoadingCards() {
  initialCards.forEach(elem => {
    addCard(elem.name, elem.link);
  });
}

buttonOpenProfile.addEventListener('click', openPopupProfile);
change.addEventListener('submit', changeElements);
buttonClose.addEventListener('click', () => togglePopup(popupProfile));
buttonOpenCard.addEventListener('click', openPopupCard);
changeCard.addEventListener('submit', changeElementsCard);
buttonCloseCard.addEventListener('click', () => togglePopup(popupCard));
buttonCloseImage.addEventListener('click', () => togglePopup(popupViewImage));

primaryLoadingCards();
