/**
 * Book list controller.
 *
 * @param $state
 * @param $stateParams
 * @param bookList
 * @param categories
 * @param publishers
 * @param authors
 * @param length
 * @constructor
 * @ngInject
 */
function BookListCtrl($state, $stateParams, bookList, categories, publishers, authors, length) {
  var vm = this;
  vm.pagination = buildPagination();
  vm.bookList = bookList;
  vm.categories = categories;
  vm.publishers = publishers;
  vm.authors = authors;
  
  //////////////////////////
  
  function buildPagination() {
    return {
      totalResults: length,
      currentPage: $stateParams.page ? $stateParams.page : 1,
      limitPerPage: 10,
      maxButtonNumber: 4,
      state: $state.current.name
    }
  }
}

angular
  .module("bookShop")
  .controller("BookListCtrl", BookListCtrl);
