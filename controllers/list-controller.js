(function() {

    angular
        .module("BookShop")
        .controller("ListCtrl", ListCtrl);

    function ListCtrl($timeout, Books,bookList) {
        var vm = this;

        vm.bookList = bookList;
        vm.removeBook = removeBook;
        vm.removed = removed;
        vm.showMessage = false;

        function removeBook(id) {
            Books.destroy(id)
                .success(function(response) {
                    console.log('deleted:', response);
                    angular.forEach(vm.bookList, function(book, index) {
                        if (book.id == id) {
                            vm.bookList.splice(index, 1);

                        }
                    })
                    vm.removed('Book removed');
                })
                .error(function() {
                    vm.removed('Book not removed');

                });

        }

        function removed(message) {
            vm.removeMessage = message;
            vm.showMessage = true;
            $timeout(function() {
                vm.showMessage = false;
            }, 3000);
        };
    };
}());
