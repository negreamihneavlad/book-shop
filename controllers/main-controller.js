(function() {

    angular
        .module("BookShop")
        .controller("MainController", MainController);

    function MainController(Books) {

        var vm = this;
        vm.message = "Book Shop";

    };
}());
