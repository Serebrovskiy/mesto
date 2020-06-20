export default class Card {
  constructor(element, cardSelector) {
    this._element = element;
    this._cardSelector = cardSelector;
    this._name = element.name;
    this._img = element.link;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //возвращаем карточку
  getCard() {
    this._element = this._getTemplateCard();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._img;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  //вешаем слушатели
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._cardImage();
    });

    this._element.querySelector('.card__basket').addEventListener('click', () => {
      this._cardDelete();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._cardLike();
    });

  }

  //открываем попап с картинкой
  _cardImage() {
    document.querySelector('.popup__caption').textContent = this._element.closest('.card').textContent;
    document.querySelector('.popup__image').src = this._img;
    document.querySelector('.popup__image').alt = this._name;
    document.querySelector('.popup_view-image').classList.toggle('popup_opened');         //togglePopup(popupViewImage);
  }

  _cardDelete() {
    this._element.querySelector('.card__basket').closest('.card').remove();
    // this._element.querySelector('.card__basket').removeEventListener('click', cardDelete);
  }


  _cardLike() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }
}
