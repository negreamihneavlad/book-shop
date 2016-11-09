(function() {

    angular
        .module("bookShop")
        .controller("FirstPageCtrl", FirstPageCtrl);

    function FirstPageCtrl(getBookList) {

        var vm = this;
        vm.bookList = getBookList;



    }
}());
