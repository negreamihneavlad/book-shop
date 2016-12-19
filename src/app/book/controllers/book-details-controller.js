/**
 * Book details controller
 *
 * @param $anchorScroll
 * @param book
 * @constructor
 * @ngInject
 */
function BookDetailsCtrl($anchorScroll, book) {
    $anchorScroll();
    var vm = this;
    vm.book = book;
}

angular
    .module("bookShop")
    .controller("BookDetailsCtrl", BookDetailsCtrl);
