(function() {

    angular
        .module("bookShop")
        .controller("SearchCtrl", SearchCtrl);

    function SearchCtrl(getSearchedBooks) {

        var vm = this;
        vm.searchedBooks = getSearchedBooks;
    }
}());
