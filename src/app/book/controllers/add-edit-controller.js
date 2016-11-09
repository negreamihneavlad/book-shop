(function() {

    angular
        .module("bookShop")
        .controller("AddEditCtrl", AddEditCtrl);

    function AddEditCtrl($filter, Books, getOneBook) {

        var vm = this;

        vm.book = getOneBook || {};

        vm.submit = submit;


        function createBook() {

            console.log(vm.book);
            Books.create(vm.book)
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

            Books.update(vm.book.id, vm.book)
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

}());
