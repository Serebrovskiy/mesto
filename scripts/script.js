// для изменения профиля
const popupProfile = document.querySelector('.popup')
const change = document.querySelector('.popup__container');
const buttonOpen = document.querySelector('.profile__edit');
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

// попап изменения профиля
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
<<<<<<< HEAD:scripts/script.js
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function changeElements (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup ();
}

buttonClose.addEventListener('click', closePopup);
change.addEventListener('submit', changeElements);
buttonOpen.addEventListener('click', openPopup);
=======
  toggleClassProfile();
}

function changeElements(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleClassProfile();
}

buttonOpen.addEventListener('click', openPopupProfile);
change.addEventListener('submit', changeElements);
buttonClose.addEventListener('click', toggleClassProfile);

// попап добавления карточек
function openPopupCard() {
  imageInput.value = '';
  placeInput.value = '';
  toggleClassCard();
}

function changeElementsCard(evt) {
  evt.preventDefault();
  addCard(placeInput.value, imageInput.value);
  toggleClassCard();
}

//открываем/закрываем попап изменения профиля
function toggleClassProfile() {
  popupProfile.classList.toggle('popup_opened');
}

//открываем/закрываем попап с карточками
function toggleClassCard() {
  popupCard.classList.toggle('popup_opened');
}

//открываем/закрываем попап просмотра картинок
function toggleClassImage() {
  popupViewImage.classList.toggle('popup_opened');
}

buttonOpenCard.addEventListener('click', openPopupCard);
changeCard.addEventListener('submit', changeElementsCard);
buttonCloseCard.addEventListener('click', toggleClassCard);

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

//добавляем исходные карточки
initialCards.forEach(elem => {
  addCard(elem.name, elem.link);
});

//добавление карточкy
function addCard(place, image) {
  const cardElements = cardsTemplate.cloneNode(true);
  cardElements.querySelector('.card__image').src = image;
  cardElements.querySelector('.card__title').textContent = place;
  cardElements.querySelector('.card__image').alt = place;

  //удаляем карточку
  cardElements.querySelector('.card__basket').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });

  //ставим лайк
  cardElements.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });

  //забираем данные о картинке
  cardElements.querySelector('.card__image').addEventListener('click', function (evt) {
    captionImage.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    popupImage.src = evt.target.parentElement.querySelector('.card__image').src;
    popupImage.alt = evt.target.parentElement.querySelector('.card__title').textContent;

    toggleClassImage();
  });

  cards.prepend(cardElements);
}

buttonCloseImage.addEventListener('click', toggleClassImage);






>>>>>>> develop:script.js
