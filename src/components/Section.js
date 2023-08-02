export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._containerSelector.append(element);
  }

  addItem(item) {
    this._containerSelector.prepend(item);
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }
}