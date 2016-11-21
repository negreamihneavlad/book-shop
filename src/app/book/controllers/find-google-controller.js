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
    /**
     * Get the book list from google request
     */
    function submit() {
        vm.googleList = BooksGoogle.getListGoogle(vm.toFind);
    }

    /**
     * Add book to DB
     *
     * @param bookData
     */
    function addBook(bookData) {
        BooksGoogle.addBook(bookData);
    }

    /**
     * Add all books to DB
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
