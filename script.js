const popup = document.querySelector('.popup')
const change = document.querySelector('.popup__container');
const buttonOpen = document.querySelector('.profile__edit');
const buttonClose = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__input-text_type_name');
const jobInput = document.querySelector('.popup__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');

// попап добавления картинок
const popupCard = document.querySelector('.popup_add_card');
const buttonOpenCard = document.querySelector('.profile__button');
const placeInput = document.querySelector('.popup__input-text_type_place');
const imageInput = document.querySelector('.popup__input-text_type_image');
const changeCard = document.querySelector('.popup__container_add_card');
const buttonCloseCard = document.querySelector('.popup__close-icon_add_card');

//работа с DOM
const cardPlace = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');


// попап изменения профиля
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.toggle('popup_opened');

  function closePopup() {
    popup.classList.remove('popup_opened');
  }

  buttonClose.addEventListener('click', closePopup);

  function changeElements(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
  }

  change.addEventListener('submit', changeElements);
}
buttonOpen.addEventListener('click', openPopup);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// попап добавления карточек
function openPopupCard() {
  imageInput.value = '';
  placeInput.value = '';
 toggleClassCard();
}

function changeElementsCard(evt) {
  evt.preventDefault();

  addCards2(placeInput.value, imageInput.value);
  initialCards.push({ name: placeInput.value, link: imageInput.value });  //добавляем объект в массив

  closePopupCard();
}

function closePopupCard() {
  toggleClassCard();
}

function toggleClassCard(){
  popupCard.classList.toggle('popup_opened');
}

buttonOpenCard.addEventListener('click', openPopupCard);
changeCard.addEventListener('submit', changeElementsCard);
buttonCloseCard.addEventListener('click', closePopupCard);


function addCards2(place, image) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.element__image').src = image;
  cardElement.querySelector('.element__title').textContent = place;
  cardElement.querySelector('.element__image').alt = place;

  elements.prepend(cardElement);
  console.log(initialCards);
}

initialCards.forEach(elem => {
  addCards2(elem.name, elem.link);
});



















// initialCards.forEach(function (item){
//   const element = document.querySelector('.element');
//   cardElement.querySelector('.element__image').src = item.link;
//   cardElement.querySelector('.element__title').textContent = item.name;
//   element.prepend(cardElement);
// });

// initialCards.forEach(function (item){
//   console.log(item.name + '.');
//   card.textContent = item.name;
// });

