function SearchCtrl(getSearchedBooks) {

    var vm = this;
    vm.searchedBooks = getSearchedBooks;
}

angular
    .module("bookShop")
    .controller("SearchCtrl", SearchCtrl);
