/**
 * Find Google controller
 *
 * @param $timeout
 * @param BooksGoogle
 * @constructor
 * @ngInject
 */
function FindCtrl($timeout, BooksGoogle) {
  var vm = this;
  vm.submit = submit;
  vm.addBook = addBook;
  vm.addAllBooks = addAllBooks;
  vm.addBookMessage = addBookMessage;
  vm.showMessage = false;
  
  //////////////////////////////
  
  /**
   * Get the book list from google request
   */
  function submit() {
    BooksGoogle.getListGoogle(vm.toFind)
      .then(function (response) {
        vm.googleList = response;
      });
  }
  
  /**
   * Add book to DB
   *
   * @param bookData
   */
  function addBook(bookData) {
    BooksGoogle.addBook(bookData)
      .then(function (response) {
        console.log(response);
        _.remove(vm.googleList, {isbn: response.data.isbn});
        vm.addBookMessage('Book added successfully');
      })
      .catch(function () {
        vm.addBookMessage('Book not added');
      });
  }
  
  /**
   * Add all books to DB
   *
   * @param googleList
   */
  function addAllBooks(googleList) {
    BooksGoogle.addAllBooks(googleList);
  }
  
  function addBookMessage(message) {
    vm.addMessage = message;
    vm.showMessage = true;
    $timeout(function () {
      vm.showMessage = false;
    }, 3000);
  }
}

angular
  .module("bookShop")
  .controller("FindCtrl", FindCtrl);
