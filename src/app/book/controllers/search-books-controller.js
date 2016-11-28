/**
 * Search controller
 *
 * @param searchedBooks
 * @constructor
 * @ngInject
 */
function SearchCtrl(searchedBooks) {

    var vm = this;
    vm.bookList = searchedBooks;
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
