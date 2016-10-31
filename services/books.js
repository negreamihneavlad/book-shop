(function() {

    angular
        .module("BookShop")
        .factory("Books", Books);

    function Books($http) {
        return {
            getList: getList,
            getOne: getOne,
            create: create,
            update: update,
            destroy: destroy
        }
        
        function getList() {
            return $http.get("http://localhost:3000/books").then(function(response) {
                var book = response.data;
                book.releaseDate = new Date(book.releaseDate);
                return book;
            });
        }

        function getOne(bookId) {
            return $http.get("http://localhost:3000/books/" + bookId).then(function(response) {
                var book = response.data;
                book.releaseDate = new Date(book.releaseDate);
                return book;
            })

        }

        function create(bookData) {
            return $http.post("http://localhost:3000/books", bookData);

        }


        function update(bookId, bookData) {
            return $http.put("http://localhost:3000/books/" + bookId, bookData);

        }

        function destroy(bookId) {
            return $http.delete("http://localhost:3000/books/" + bookId);

        }

       
    }
}());
