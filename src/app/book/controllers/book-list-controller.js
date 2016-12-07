/**
 * Book list controller
 *
 * @param bookList
 * @param Page
 * @constructor
 * @ngInject
 */
function BookListCtrl(Page, bookList) {
    Page.setTitle('Book Shop');
    var vm = this;
    vm.currentPage = 1;
    vm.pageSize = 10;
    vm.bookList = bookList;
}

angular
    .module("bookShop")
    .controller("BookListCtrl", BookListCtrl);
