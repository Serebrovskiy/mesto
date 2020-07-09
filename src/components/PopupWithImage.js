import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(cardName, cardImage) {
    super.open();

    this._selector.querySelector('.popup__caption').textContent = cardName;
    this._selector.querySelector('.popup__image').src = cardImage;
    this._selector.querySelector('.popup__image').alt = cardName;
  }
}