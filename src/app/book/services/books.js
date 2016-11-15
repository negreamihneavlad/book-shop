/**
 *
 * @param $http
 * @param $filter
 * @returns {{getList: getList, getOne: getOne, create: create, update: update, destroy: destroy, getSearchList: getSearchList}}
 * @constructor
 */
function Book($http, $filter) {
    return {
        getList: getList,
        getOne: getOne,
        create: create,
        update: update,
        destroy: destroy,
        getSearchList: getSearchList
    };
    /**
     *
     * @param toFind
     * @returns {*}
     */
    function getSearchList(toFind) {
        return $http.get("http://localhost:3000/search/" + toFind).then(function(response) {
            return response.data;
        });
    }

    /**
     *
     * @returns {*}
     */
    function getList() {
        return $http.get("http://localhost:3000/books").then(function(response) {
            return response.data;
        });
    }

    /**
     *
     * @param bookId
     * @returns {*}
     */
    function getOne(bookId) {
        return $http.get("http://localhost:3000/books/" + bookId).then(function(response) {
            var book = response.data;
            book.releaseDate = new Date(book.releaseDate);
            return book;
        });
    }

    /**
     *
     * @param bookData
     * @returns {*}
     */
    function create(bookData) {
        bookData = _.assign({}, bookData, {
            releaseDate: $filter('date')(bookData.releaseDate, 'yyyy-MM-dd')
        });
        return $http.post("http://localhost:3000/books", bookData);
    }

    /**
     *
     * @param bookId
     * @param bookData
     * @returns {*}
     */
    function update(bookId, bookData) {
        bookData.releaseDate = $filter('date')(bookData.releaseDate, 'yyyy-MM-dd');
        return $http.put("http://localhost:3000/books/" + bookId, bookData);
    }

    /**
     *
     * @param bookId
     * @returns {boolean|*}
     */
    function destroy(bookId) {
        return $http.delete("http://localhost:3000/books/" + bookId);
    }


}
angular
    .module("bookShop")
    .factory("Book", Book);
