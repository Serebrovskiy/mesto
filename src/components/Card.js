export default class Card {
  constructor(element, cardSelector, { handleCardClick, handleCardRemoveClick, addCardLike, deleteCardLike }) {
    this._element = element;
    this._cardSelector = cardSelector;
    this._name = element.name;
    this._img = element.link;
    this._likes = element.likes;
    this._id = element._id;
    this._owner = element.owner;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoveClick = handleCardRemoveClick;
    this._addCardLike = addCardLike;
    this._deleteCardLike = deleteCardLike;
    this._handleCardLike = this._handleCardLike.bind(this);
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    this._ownerId = 'ac421b3446835ec856268783';

    //если id пользователя не совпадает с id хозяином картинки, тогда удаляем кнопку корзины
    if (this._ownerId !== this._owner._id) {
      cardElement.querySelector('.card__basket').remove();
    }
    return cardElement;
  }

  //возвращаем карточку
  getCard() {
    this._element = this._getTemplateCard();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardBasket = this._element.querySelector('.card__basket');
    this._cardLike = this._element.querySelector('.card__like');
    this._cardCounterLikes = this._element.querySelector('.card__number-likes');

    this._setEventListeners();
    this._initialLikes();

    this._cardImage.src = this._img;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  //вешаем слушатели
  _setEventListeners() {
    //слушатель на картинку
    this._cardImage.addEventListener('click', this._handleCardClick);

    //слушатель на карточку с корзинкой
    if (this._cardBasket) {
      this._cardBasket.addEventListener('click', () => {
        this._handleCardRemoveClick(this._id, this);
      });
    }

    //слушатель на лайк
    this._cardLike.addEventListener('click', this._handleCardLike);
  }

  cardDelete() {
    this._element.remove();
    this._element = null;
    this._removeEventListeners();
  }

  addLike(likes) {
    this._cardLike.classList.add('card__like_active');
    this._cardCounterLikes.textContent = likes.length;
  }

  deleteLike(likes) {
    this._cardLike.classList.remove('card__like_active');
    this._cardCounterLikes.textContent = likes.length;
  }

  //если лайка нет - ставим, если уже есть - убираем
  _handleCardLike() {
    if (! this._cardLike.classList.contains('card__like_active')) {
      this._addCardLike(this._id);
    }
    else {
      this._deleteCardLike(this._id);
    }
  }

  //отрисовываем поставленные нами лайки и количество лайков у карточек
  _initialLikes() {
    this._cardCounterLikes.textContent = this._likes.length;

    if (this._likes.some(elem => elem._id === this._ownerId)) {
      this._cardLike.classList.add('card__like_active');
    }
  }

  _removeEventListeners() {
    this._cardImage.removeEventListener('click', this._handleCardClick);
    this._cardLike.removeEventListener('click', this._handleCardLike);
    this._cardBasket.removeEventListener('click', this._handleCardRemoveClick);
  }
}
