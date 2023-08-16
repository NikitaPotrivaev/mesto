export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }
}