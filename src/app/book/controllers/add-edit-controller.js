/**
 *
 * @param $filter
 * @param Book
 * @param book
 * @constructor
 */
function AddEditCtrl($filter, $anchorScroll, Book, book) {

    var vm = this;

    $anchorScroll();

    vm.book = book || {};
    vm.submit = submit;
    /**
     * Creating a new book
     */
    function createBook() {
        console.log(vm.book);
        Book.create(vm.book)
            .then(function (response) {
                console.log(vm.book);
                vm.createdMessage = 'Book added successfully!';
                console.log('created: ', response);
            })
            .catch(function () {
                vm.createdMessage = 'Failed to add book!';
            });
    }

    /**
     * Updates details of a book
     */
    function updateBook() {
        Book.update(vm.book.id, vm.book)
            .then(function (response) {
                vm.updateMessage = 'Book updated successfully!';
                console.log('updated:', response);
            })
            .catch(function () {
                vm.updateMessage = 'Failed to update the book!';
            });
    }

    /**
     * Check if update or create
     */
    function submit() {
        if (vm.addBook.$valid) {
            if (book) {
                updateBook();
            } else {
                createBook();
            }
        }
    }
}
angular
    .module("bookShop")
    .controller("AddEditCtrl", AddEditCtrl);
