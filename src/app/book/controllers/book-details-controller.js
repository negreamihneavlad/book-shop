/**
 *
 * @param getOneBook
 * @constructor
 */
function BookDetailsCtrl(getOneBook) {

    var vm = this;
	vm.book = getOneBook;
}
angular
    .module("bookShop")
    .controller("BookDetailsCtrl", BookDetailsCtrl);
