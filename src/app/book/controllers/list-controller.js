(function() {

    angular
        .module("bookShop")
        .controller("ListCtrl", ListCtrl);

    function ListCtrl($timeout, Books, getBookList) {
        var vm = this;

        vm.bookList = getBookList;
        vm.removeBook = removeBook;
        vm.removed = removed;
        vm.showMessage = false;

        function removeBook(id) {
            console.log(vm.bookList);
            Books.destroy(id)
                .then(function(response) {
                    console.log('deleted:', response);
                    _.remove(vm.bookList, {id:id});
                 
                    vm.removed('Book removed');
                })
                .catch(function() {
                    vm.removed('Book not removed');

                });

        }

        function removed(message) {
            vm.removedMessage = message;
            vm.showMessage = true;
            $timeout(function() {
                vm.showMessage = false;
            }, 3000);
        }
    }
}());
