(function() {

    angular
        .module("BookShop")
        .controller("FindCtrl", FindCtrl);

    function FindCtrl(BooksGoogle) {

        var vm = this;

        vm.submit = submit;
        vm.addBook = addBook;
        vm.addAllBooks = addAllBooks;

        function submit() {
            vm.googleList = BooksGoogle.getListGoogle(vm.toFind);
        }

        function addBook(bookData) {
            BooksGoogle.addBook(bookData);

        }

        function addAllBooks(googleList) {
            BooksGoogle.addAllBooks(googleList);
        }


    };
}());
