/**
 *
 * @param getSearchedBooks
 * @constructor
 */
function SearchCtrl(searchedBooks) {

    var vm = this;
    vm.searchedBooks = searchedBooks;
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
