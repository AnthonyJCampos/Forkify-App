import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    // check if no data was provided
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    // This clears the spinner element by clearing all elements in the
    // container
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  } // end render

  update(data) {
    /** This Approach is not very performent  */

    this._data = data;
    const newMarkup = this._generateMarkup();
    // this will create a virtual dom that we can use to compare to our
    // current dom
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // this selects all elements in the virtual dom
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // select all current elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, index) => {
      const curEl = curElements[index];
      // use isEqualNode to check if two nodes are the same

      // Updates Changed TEXT
      // use nodeValue to check if child node is a text value
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates Changes Attributes

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
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
