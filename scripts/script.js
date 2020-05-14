const popup = document.querySelector('.popup')
const change = document.querySelector('.popup__container');
const buttonOpen = document.querySelector('.profile__edit');
const buttonClose = document.querySelector('.popup__close-icon');
const nameInput = document.querySelector('.popup__input-text_type_name');
const jobInput = document.querySelector('.popup__input-text_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__profession');


function openPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');

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
}

buttonOpen.addEventListener('click', openPopup);