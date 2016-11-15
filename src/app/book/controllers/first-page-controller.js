/**
 *
 * @param getBookList
 * @constructor
 */
function FirstPageCtrl(getBookList) {

    var vm = this;
    vm.bookList = getBookList;
}
angular
    .module("bookShop")
    .controller("FirstPageCtrl", FirstPageCtrl);
