/**
 * Book details controller
 *
 * @param $anchorScroll
 * @param book
 * @constructor
 * @ngInject
 */
function BookDetailsCtrl($anchorScroll, Page, book) {
    Page.setTitle('-'+book.name);
    $anchorScroll();
    var vm = this;
    vm.book = book;
}

angular
    .module("bookShop")
    .controller("BookDetailsCtrl", BookDetailsCtrl);
