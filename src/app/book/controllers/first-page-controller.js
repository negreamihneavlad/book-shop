/**
 *
 * @param getBookList
 * @constructor
 */
function FirstPageCtrl(bookList) {

    var vm = this;
    vm.bookList = bookList;
}
angular
    .module("bookShop")
    .controller("FirstPageCtrl", FirstPageCtrl);
