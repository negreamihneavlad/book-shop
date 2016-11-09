(function() {

    angular
        .module("bookShop")
        .controller("MainController", MainController);

    function MainController(Books) {

        var vm = this;
        vm.message = "Book Shop";

    }
}());
