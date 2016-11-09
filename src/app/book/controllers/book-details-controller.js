(function() {

    angular
        .module("bookShop")
        .controller("BookDetailsCtrl", BookDetailsCtrl);

    function BookDetailsCtrl(getOneBook) {

        var vm = this;

        vm.book=getOneBook;

        
        

    }
}());