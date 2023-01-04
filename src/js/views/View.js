import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    this._data = data;
    // This clears the spinner element by clearing all elements in the
    // container
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    this._parentElement.innerHTML = '';
  } // end clear

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    // this clears the innerHTML of the parent element
    // So that we only display the spinner within
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // end renderSpinner

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // end renderError

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // end renderError
}
