let popup = document.querySelector('.popup')
let change = document.querySelector('.popup__container');
let buttonOpen = document.querySelector('.profile__edit');
let buttonClose = document.querySelector('.popup__close-icon');


function openPopup () {
  // nameInput.value = profileName.textContent;
  popup.classList.add('popup_opened');
}

buttonOpen.addEventListener('click', openPopup);

function closePopup () {
  popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', closePopup);

function changeElements (evt) {
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__input-text_type_name');
  let JobInput = document.querySelector('.popup__input-text_type_job');
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__profession');
  profileName.textContent = nameInput.value;
  profileJob.textContent = JobInput.value;
  closePopup ();
}

change.addEventListener('submit', changeElements);

