(function() {

    angular
        .module("BookShop")
        .controller("AddEditCtrl", AddEditCtrl);

    function AddEditCtrl($filter, Books, book) {

        var vm = this;

        vm.book = book || {};

        vm.submit = submit;

        function createBook() {
            var bookData = {
                name: vm.book.name,
                author: vm.book.author,
                description: vm.book.description,
                category: vm.book.category,
                picture: vm.book.picture,
                releaseDate: $filter('date')(vm.book.releaseDate, 'yyyy-MM-dd'),
                price: vm.book.price

            }
            Books.create(bookData)
                .success(function(response) {
                    vm.createMessage = 'Book added successfully!';
                    console.log('created: ', response);
                })
                .error(function() {
                    vm.createMessage = 'Failed to add book!';
                });

        };

        function updateBook() {
            var bookData = {
                name: vm.book.name,
                author: vm.book.author,
                description: vm.book.description,
                category: vm.book.category,
                picture: vm.book.picture,
                releaseDate: $filter('date')(vm.book.releaseDate, 'yyyy-MM-dd'),
                price: vm.book.price
            }
            Books.update(vm.book.id, bookData)
                .success(function(response) {
                    vm.updateMessage = 'Book updated successfully!';
                    console.log('updated:', response);

                })
                .error(function() {
                    vm.updateMessage = 'Failed to update the book!';

                });
        }

        function submit() {
            if (vm.addBook.$valid) {
                if (book) {
                    updateBook();
                } else {
                    createBook();
                }
            };
        }
    };

}());
