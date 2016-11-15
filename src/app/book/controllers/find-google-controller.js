/**
 *
 * @param BooksGoogle
 * @constructor
 */
function FindCtrl(BooksGoogle) {

    var vm = this;

    vm.submit = submit;
    vm.addBook = addBook;
    vm.addAllBooks = addAllBooks;

    function submit() {
        vm.googleList = BooksGoogle.getListGoogle(vm.toFind);
    }

    /**
     *
     * @param bookData
     */
    function addBook(bookData) {
        BooksGoogle.addBook(bookData);
    }

    /**
     *
     * @param googleList
     */
    function addAllBooks(googleList) {
        BooksGoogle.addAllBooks(googleList);
    }
}
angular
    .module("bookShop")
    .controller("FindCtrl", FindCtrl);
