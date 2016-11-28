/**
 * Book list controller
 *
 * @param bookList
 * @constructor
 * @ngInject
 */
function BookListCtrl(bookList) {

    var vm = this;
    vm.bookList = bookList;
}

angular
    .module("bookShop")
    .controller("BookListCtrl", BookListCtrl);
