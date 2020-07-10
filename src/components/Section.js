export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererAllItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addAppendItem(element) {
    this._containerSelector.append(element);
  }
  addPrependItem(element) {
    this._containerSelector.prepend(element);
  }
}