/**
 * Find Google controller
 *
 * @param BooksGoogle
 * @param Page
 * @constructor
 * @ngInject
 */
function FindCtrl(BooksGoogle, Page) {
    Page.setTitle('Book Shop-Find on Google');
    var vm = this;
    vm.submit = submit;
    vm.addBook = addBook;
    vm.addAllBooks = addAllBooks;

    //////////////////////////////

    /**
     * Get the book list from google request
     */
    function submit() {
        BooksGoogle.getListGoogle(vm.toFind)
            .then(function (response) {
                vm.googleList = response;
            });
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
