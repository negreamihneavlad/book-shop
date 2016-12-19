/**
 * Manage books controller
 *
 * @param $stateParams
 * @param $state
 * @param $timeout
 * @param Book
 * @param bookList
 * @param length
 * @param searchedBooks
 * @constructor
 * @ngInject
 */
function ManageBooksCtrl($stateParams, $state, $timeout, Book, bookList, length, searchedBooks) {
    var vm = this;
    vm.bookList = bookList;
    vm.removeBook = removeBook;
    vm.removed = removed;
    vm.showMessage = false;
    vm.pagination = buildPagination();

    //////////////////////////////

    if (searchedBooks) {
        vm.bookList = searchedBooks;
    }
    /**
     * Remove book from DB
     *
     * @param id
     */
    function removeBook(id) {
        Book.destroy(id)
            .then(function (response) {
                _.remove(vm.bookList, {id: id});
                vm.removed('Book removed');
            })
            .catch(function () {
                vm.removed('Book not removed');
            });
    }

    /**
     * Set message for 3 seconds if removed
     *
     * @param message
     */
    function removed(message) {
        vm.removedMessage = message;
        vm.showMessage = true;
        $timeout(function () {
            vm.showMessage = false;
        }, 3000);
    }

    function buildPagination() {
        return {
            totalResults: length,
            currentPage: $stateParams.page ? $stateParams.page : 1,
            limitPerPage: 10,
            maxButtonNumber: 4,
            state: $state.current.name
        }
    }
}

angular
    .module("bookShop")
    .controller("ManageBooksCtrl", ManageBooksCtrl);
