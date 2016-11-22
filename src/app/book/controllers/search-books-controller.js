/**
 *
 * @param getSearchedBooks
 * @constructor
 */
function SearchCtrl(searchedBooks) {

    var vm = this;
    vm.bookList = searchedBooks;
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
