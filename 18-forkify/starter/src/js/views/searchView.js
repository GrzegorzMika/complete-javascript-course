class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handlerFunction) {
    this.#parentElement.addEventListener('submit', function(event) {
      event.preventDefault();
      handlerFunction();
    });
  }
}

export default new SearchView();