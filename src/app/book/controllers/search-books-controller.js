/**
 * Search controller
 *
 * @param searchedBooks
 * @param Page
 * @constructor
 * @ngInject
 */
function SearchCtrl(Page, searchedBooks) {
    Page.setTitle('Book Shop-Search Books');
    var vm = this;
    vm.bookList = searchedBooks;
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
