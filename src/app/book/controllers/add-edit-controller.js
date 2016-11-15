function AddEditCtrl($filter, Book, getOneBook) {

    var vm = this;

    vm.book = getOneBook || {};
    vm.submit = submit;

    function createBook() {
        console.log(vm.book);
        Book.create(vm.book)
            .then(function(response) {
                console.log(vm.book);
                vm.createdMessage = 'Book added successfully!';
                console.log('created: ', response);
            })
            .catch(function() {
                vm.createdMessage = 'Failed to add book!';
            });
    }

    function updateBook() {
        Book.update(vm.book.id, vm.book)
            .then(function(response) {
                vm.updateMessage = 'Book updated successfully!';
                console.log('updated:', response);
            })
            .catch(function() {
                vm.updateMessage = 'Failed to update the book!';
            });
    }

    function submit() {
        if (vm.addBook.$valid) {
            if (getOneBook) {
                updateBook();
            } else {
                createBook();
            }
        }
    }
}
angular
    .module("bookShop")
    .controller("AddEditCtrl", AddEditCtrl);
