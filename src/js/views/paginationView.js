import icons from 'url:../../img/icons.svg'; // parcel-2
import View from './View';

class PaginationView extends View {
  // class fields
  _parentElement = document.querySelector('.pagination');


  addHandlerClick (handler) {
    this._parentElement.addEventListener('click', e => {
        const btn = e.target.closest('.btn--inline');
        if(!btn) return ;
        const gotoPage = +btn.dataset.goto;        
        handler(gotoPage)
    })
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    const curPage = this._data.page;

    // page 1 , have other pages
    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1} </span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${curPage - 1}"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
        `;
    }
    // other pages

    if (curPage < numPages) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1} </span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    // page 1 , no other pages
    return ''
  }
}

export default new PaginationView();
