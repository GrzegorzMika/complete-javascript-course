import View from './View.js';
import { RESULTS_PER_PAGE } from '../config';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';


  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
    const currentPage = this._data.page;
    if (currentPage === 1 && numPages > 1) {
      return `
      <button class='btn--inline pagination__btn--next' data-goto='${currentPage + 1}'>
        <span>Page ${currentPage + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>`;
    }
    if (currentPage === numPages && numPages > 1) {
      return `
      <button class='btn--inline pagination__btn--prev' data-goto='${currentPage - 1}' >
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`;
    }
    if (currentPage < numPages) {
      return `
      <button class='btn--inline pagination__btn--prev' data-goto='${currentPage - 1}'>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-left'></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button class='btn--inline pagination__btn--next' data-goto='${currentPage + 1}'>
        <span>Page ${currentPage + 1}</span>
        <svg class='search__icon'>
          <use href='${icons}#icon-arrow-right'></use>
        </svg>
      </button>`;
    }
    return '';
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function(event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
}

export default new PaginationView();