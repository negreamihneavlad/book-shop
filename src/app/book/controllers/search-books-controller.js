/**
 * Search controller
 *
 * @param searchedBooks
 * @param Page
 * @param categories
 * @param publishers
 * @param authors
 * @param length
 * @param $state
 * @param $stateParams
 * @constructor
 * @ngInject
 */
function SearchCtrl($state, $stateParams, Page, searchedBooks, categories, publishers, authors, length) {
    Page.setTitle('-Search Books');
    var vm = this;
    vm.pagination = buildPagination();
    vm.bookList = searchedBooks;
    vm.categories = categories;
    vm.publishers = publishers;
    vm.authors = authors;

    //////////////////////////

    function buildPagination(){
        return {
            totalResults : length,
            currentPage: $stateParams.page ? $stateParams.page : 1,
            limitPerPage: 10,
            maxButtonNumber: 4,
            state: $state.current.name
        }
    }
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
