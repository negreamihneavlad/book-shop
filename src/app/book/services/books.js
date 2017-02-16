/**
 * Books service
 *
 * @param $http
 * @param $filter
 * @param BOOKS_API_URLS
 * @returns {{getList: getList, getOne: getOne, create: create, update: update, destroy: destroy, getSearchList: getSearchList}}
 * @constructor
 * @ngInject
 */
function Book($http, $filter, BOOKS_API_URLS) {
  return {
    getList: getList,
    getLength: getLength,
    getOne: getOne,
    create: create,
    update: update,
    destroy: destroy,
    getSearchList: getSearchList
  };
  
  //////////////////////////////
  
  /**
   * Request for searched book
   *
   * @param filters
   * @returns {*}
   */
  function getSearchList(filters) {
    return $http.get(URLTo.api(BOOKS_API_URLS.search), {
      params: filters
    })
      .then(function (response) {
        return response.data;
      });
  }
  
  /**
   * Request to get books
   *
   * @param filters
   * @returns {*}
   */
  function getList(filters) {
    return $http.get(URLTo.api(BOOKS_API_URLS.books), {
      params: filters
    }).then(function (response) {
      return response.data;
    });
  }
  
  /**
   * Request to get the number of books
   *
   * @param filters
   * @returns {*}
   */
  function getLength(filters) {
    return $http.get(URLTo.api(BOOKS_API_URLS.length), {
      params: filters
    })
      .then(function (response) {
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
