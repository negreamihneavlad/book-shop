function Book($http, $filter) {
    return {
        getList: getList,
        getOne: getOne,
        create: create,
        update: update,
        destroy: destroy,
        getSearchList: getSearchList
    };

    function getSearchList(toFind) {
        return $http.get("http://localhost:3000/search/" + toFind).then(function(response) {
            return response.data;
        });
    }

    function getList() {
        return $http.get("http://localhost:3000/books").then(function(response) {
            return response.data;
        });
    }

    function getOne(bookId) {
        return $http.get("http://localhost:3000/books/" + bookId).then(function(response) {
            var book = response.data;
            book.releaseDate = new Date(book.releaseDate);
            return book;
        });
    }

    function create(bookData) {
        bookData = _.assign({}, bookData, {
            releaseDate: $filter('date')(bookData.releaseDate, 'yyyy-MM-dd')
        });
        return $http.post("http://localhost:3000/books", bookData);
    }


    function update(bookId, bookData) {
        bookData.releaseDate = $filter('date')(bookData.releaseDate, 'yyyy-MM-dd');
        return $http.put("http://localhost:3000/books/" + bookId, bookData);
    }

    function destroy(bookId) {
        return $http.delete("http://localhost:3000/books/" + bookId);
    }


}
angular
    .module("bookShop")
    .factory("Book", Book);
