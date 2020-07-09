import { formConfig } from '../utils/utils.js';

export default class Card {
  constructor(element, cardSelector, { handleCardClick }) {
    this._element = element;
    this._cardSelector = cardSelector;
    this._name = element.name;
    this._img = element.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  //возвращаем карточку
  getCard() {
    this._element = this._getTemplateCard();
    const cardImage = this._element.querySelector('.card__image');
    const cardTitle = this._element.querySelector('.card__title');
    const cardBasket = this._element.querySelector('.card__basket');
    const cardLike = this._element.querySelector('.card__like');

    this._setEventListeners(cardImage, cardBasket, cardLike);

    cardImage.src = this._img;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    return this._element;
  }

  //вешаем слушатели
  _setEventListeners(cardImage, cardBasket, cardLike) {
    cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    cardBasket.addEventListener('click', () => {
      this._cardDelete(cardBasket);
    });

    cardLike.addEventListener('click', () => {
      this._cardLike(cardLike);
    });
  }

  //открываем попап с картинкой
  _cardImage() {
    formConfig.captionImage.textContent = this._element.closest('.card').textContent;
    formConfig.popupImage.src = this._img;
    formConfig.popupImage.alt = this._name;
    formConfig.popupViewImage.classList.toggle('popup_opened');
  }

  _cardDelete(cardBasket) {
    cardBasket.closest('.card').remove();
    this._removeEventListeners(cardBasket);
  }

  _cardLike(cardLike) {
    cardLike.classList.toggle('card__like_active');
  }

  //удаляем слушатель карточки
  _removeEventListeners(cardBasket) {
    cardBasket.removeEventListener('click', this._cardDelete);
  }
}
