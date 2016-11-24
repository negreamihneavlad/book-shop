/**
 *
 * @param $http
 * @param $filter
 * @param BOOKS_API_URLS
 * @returns {{getList: getList, getOne: getOne, create: create, update: update, destroy: destroy, getSearchList: getSearchList}}
 * @constructor
 */
function Book($http, $filter, BOOKS_API_URLS) {
    return {
        getList: getList,
        getOne: getOne,
        create: create,
        update: update,
        destroy: destroy,
        getSearchList: getSearchList,
        getSearchListFilters: getSearchListFilters
    };
    /**
     * Request for searched book
     *
     * @param toFind
     * @returns {*}
     */
    function getSearchList(toFind) {
        return $http.get(URLTo.api(BOOKS_API_URLS.search, [toFind]))
            .then(function (response) {
                return response.data;
            });
    }

    /**
     *
     * @param category
     * @param author
     * @param publisher
     * @returns {*}
     */
    function getSearchListFilters(category, author, publisher) {
        return $http.get(URLTo.api(BOOKS_API_URLS.searchFilters + '?category=' + category + '&author=' + author + '&publisher=' + publisher))
            .then(function (response) {
                return response.data;
            });
    }

    /**
     * Request to get books
     *
     * @returns {*}
     */
    function getList() {
        return $http.get(URLTo.api(BOOKS_API_URLS.books)).then(function (response) {
            return response.data;
        });
    }

    /**
     * Request to get one book
     *
     * @param bookId
     * @returns {*}
     */
    function getOne(bookId) {
        return $http.get(URLTo.api(BOOKS_API_URLS.oneBook, [bookId])).then(function (response) {
            var book = response.data;
            book.releaseDate = new Date(book.releaseDate);
            return book;
        });
    }

    /**
     * Request to create book
     *
     * @param bookData
     * @returns {*}
     */
    function create(bookData) {
        bookData = _.assign({}, bookData, {
            releaseDate: $filter('date')(bookData.releaseDate, 'yyyy-MM-dd')
        });
        return $http.post(URLTo.api(BOOKS_API_URLS.books), bookData);
    }

    /**
     * Request to edit book
     *
     * @param bookId
     * @param bookData
     * @returns {*}
     */
    function update(bookId, bookData) {
        bookData.releaseDate = $filter('date')(bookData.releaseDate, 'yyyy-MM-dd');
        return $http.put(URLTo.api(BOOKS_API_URLS.oneBook, [bookId]), bookData);
    }

    /**
     * Request to delete book
     *
     * @param bookId
     * @returns {boolean|*}
     */
    function destroy(bookId) {
        return $http.delete(URLTo.api(BOOKS_API_URLS.oneBook, [bookId]));
    }


}
angular
    .module("bookShop")
    .factory("Book", Book);
