export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}