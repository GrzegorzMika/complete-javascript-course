import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _parentElement;
  _errorMessage;
  _message;

  render(data, render=true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    if (!render) return this._generateMarkup()
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currentEl = currentElements[i];
      if(!newEl.isEqualNode(currentEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        currentEl.textContent = newEl.textContent;
      }

      if(!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(attr => currentEl.setAttribute(attr.name, attr.value))
      }
    });
  }

  renderSpinner() {
    const spinner = `
    <div class='spinner'>
      <svg>
        <use href='${icons}#icon-loader'></use>
      </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class='error'>
        <div>
          <svg>
            <use href='${icons}#icon-alert-triangle'></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class='message'>
        <div>
          <svg>
            <use href='${icons}#icon-smile'></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    throw new Error('Not implemented');
  }
}