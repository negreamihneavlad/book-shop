/**
 *
 * @param getOneBook
 * @constructor
 */
function BookDetailsCtrl($anchorScroll, book) {

    $anchorScroll();

    var vm = this;
	vm.book = book;
}
angular
    .module("bookShop")
    .controller("BookDetailsCtrl", BookDetailsCtrl);
