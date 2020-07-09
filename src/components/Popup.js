export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('mousedown', this._handleMouseClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('mousedown', this._handleMouseClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрываем попап нажатием на escape
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //закрываем попап нажатием overlay
  _handleMouseClose = (evt) => {
    this.elementGrid = this._selector.querySelector('.popup__grid');

    if (evt.target === this.elementGrid || evt.target === this._selector) {
      this.close();
    }
  }

  setEventListeners() {
    this.buttonClose = this._selector.querySelector('.popup__close-icon');
    this.buttonClose.addEventListener('click', () => {
      this.close();
    });
  }

}